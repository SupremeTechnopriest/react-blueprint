const markdown = `

\`Dimensions\` is a utiltiy that will get the width and height (including margin) of a given element.  You will need to ensure that your DOM is rendered before you can get the dimensions of a react element. However, \`Dimensions\` also supports \`window\` and \`document\` and their dimensions can be accessed immediately.  It can also be invoked as a decorator.
 
### Usage as Method

\`Dimensions([ window || document || element ]);\`

returns 

\`\`\`javascript
{
	width: [number],
	height: [number]
}
\`\`\`

#### Window or Document

\`\`\`javascript

/**
 * Window / Document example
 */

import React, { Component } from 'react';
import { Dimensions } from 'react-blueprint';

export default class WindowExample extends Component {

	componentWillMount() {
		this.setState({ 
			windowDimensions: Dimensions(window),
			documentDimensions: Dimensions(document)
		});
	}

	render() {
		return (
			<View 
				width={this.state.windowDimensions.width}
				height={this.state.windowDimensions.height}>

				<p>width: {this.state.documentDimensions.width}</p>
				<p>height: {this.state.documentDimensions.height}</p>

			</View>
		);
	}
}

\`\`\`

#### React DOM Component

React now exposes the DOM element of their DOM components (\`div\`, \`span\`, \`p\`, \`a\`, etc) through this refs. 

\`\`\`javascript

/**
 * React DOM Component Example
 */

import React, { Component } from 'react';
import { Dimensions } from 'react-blueprint';

export default class ReactDOMComponent extends Component {

	componentDidMount() {
		let dimensions = Dimensions(this.refs.container);
		this.setState({ dimensions	});
	}

	render() {
		return (
			<div ref='container'>
				<p>width: {this.state.dimensions.width}</p>
				<p>height: {this.state.dimensions.height}</p>
			</div>
		);
	}
}

\`\`\`

#### Custom React Component

If you want to measure a custom component you will have to use \`ReactDOM.findDOMNode(this.refs.yourRef)\`

\`\`\`javascript

/**
 * Custom Component Example
 */

import React, { Component } from 'react';
import { findDOMNode as $ } from 'react-dom';
import { Dimensions } from 'react-blueprint';

export default class CustomComponentExample extends Component {

	componentDidMount() {
		let dimensions = Dimensions($(this.refs.container));
		this.setState({ dimensions	});
	}

	render() {
		return (
			<View ref='container'>
				<p>width: {this.state.dimensions.width}</p>
				<p>height: {this.state.dimensions.height}</p>
			</View>
		);
	}
}

\`\`\`

### Usage as Decorator

You can decorate your custom classes with \`Dimensions\` and it will add a \`width\` and a \`height\` prop to your component. It also attaches a \`getDimensions()\` method which will return the components \`width\` and \`height\`.  Anytime the window is resized the new dimensions will be computed and made available via props.

\`\`\`javascript

/**
 * Decorated Component Example
 */

import React, { Component } from 'react';
import { findDOMNode as $ } from 'react-dom';
import { Dimensions } from 'react-blueprint';

@Dimensions
export default class DecoratorExample extends Component {

	render() {
		return (
			<View>
				<p>width: {this.props.width}</p>
				<p>height: {this.props.height}</p>
			</View>
		);
	}
}

class App extends Component {
	render() {
		return <DecoratorExample ref="decoratorExample" />
	},
	
	getChildDimensions() {
		return this.refs.decoratorExample.getDimensions();
	}
	
}

\`\`\`

`;

export default markdown;