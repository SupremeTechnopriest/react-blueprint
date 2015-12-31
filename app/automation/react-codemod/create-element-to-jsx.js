module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const ReactUtils = require('./utils/ReactUtils')(j);

  const convertExpressionToJSXAttributes = (expression) => {
    const isReactSpread = expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      expression.callee.object.name === 'React' &&
      expression.callee.property.name === '__spread';

    const isObjectAssign = expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      expression.callee.object.name === 'Object' &&
      expression.callee.property.name === 'assign';

    if (expression.type === 'Identifier') {
      return [j.jsxSpreadAttribute(expression)];
    } else if (isReactSpread || isObjectAssign) {
      const jsxAttributes = [];

      expression.arguments.forEach((expression) =>
        jsxAttributes.push(...convertExpressionToJSXAttributes(expression))
      );

      return jsxAttributes;
    } else if (expression.type === 'ObjectExpression') {
      const attributes = expression.properties.map((property) => {
        if (property.type === 'SpreadProperty') {
          return j.jsxSpreadAttribute(property.argument);
        }  else if (property.type === 'Property') {
          const propertyValueType = property.value.type;

          let value;
          if (propertyValueType === 'Literal' && typeof property.value.value === 'string') {
            value = j.literal(property.value.value);
          } else {
            value = j.jsxExpressionContainer(property.value);
          }

          let propertyKeyName;
          if (property.key.type === 'Literal') {
            propertyKeyName = property.key.value;
          } else {
            propertyKeyName = property.key.name;
          }

          return j.jsxAttribute(
            j.jsxIdentifier(propertyKeyName),
            value
          );
        }
      });

      return attributes;
    } else if (expression.type === 'Literal' && expression.value === null) {
      return [];
    } else {
      throw new Error(`Unexpected attribute of type "${expression.type}"`);
    }
  };

  const convertNodeToJSX = (node) => {
    const args = node.value.arguments;

    const elementType = args[0].type;
    const elementName = elementType === 'Literal' ? args[0].value : args[0].name;
    const props = args[1];

    const attributes = convertExpressionToJSXAttributes(props);

    const children = node.value.arguments.slice(2).map((child, index) => {
      if (child.type === 'Literal' && typeof child.value === 'string') {
        return j.jsxText(child.value);
      } else if (child.type === 'CallExpression' &&
        child.callee.object &&
        child.callee.object.name === 'React' &&
        child.callee.property.name === 'createElement') {
        return convertNodeToJSX(node.get('arguments', index + 2));
      } else {
        return j.jsxExpressionContainer(child);
      }
    });

    const openingElement = j.jsxOpeningElement(j.jsxIdentifier(elementName), attributes);

    if (children.length) {
      return j.jsxElement(
        openingElement,
        j.jsxClosingElement(j.jsxIdentifier(elementName)),
        children
      );
    } else {
      openingElement.selfClosing = true;
      return j.jsxElement(openingElement);
    }
  };

  if (ReactUtils.hasReact(root)) {
    const mutations = root
      .find(j.CallExpression, {
        callee: {
          object: {
            name: 'React',
          },
          property: {
            name: 'createElement',
          },
        },
      })
      .replaceWith(convertNodeToJSX)
      .size();

    if (mutations) {
      return root.toSource();
    }
  }

  return null;
};
