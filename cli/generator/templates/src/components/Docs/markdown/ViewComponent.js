const markdown = `

## View

A flexbox component.

### Examples

\`\`\`javascript
<View row>
	<View auto row>
    	<View column width="100px">
    		<View className="red">Left</View>
    	</View>
		<View column width="100px">
			<View className="red">Left</View>
		</View>
	</View>
	<View row className="green">Hello test view</View>
</View>
\`\`\`

\`\`\`javascript
<View column height="200px">
	<View column auto>
    	<View style={{ color: "green"}} height="20px">Green</View>
		<View style={{ color: "red"}} height="20px">Red</View>
	</View>
	<View style={{ color: "green" }}>Hello test view </View>
</View>
\`\`\`

### Props

All props are optional.

#### Bool \`row\`

- sets the flexDirection to row

#### Bool \`column\`

- sets the flexDirection to column

#### Bool \`auto\`

- sets the flex to '0 0 auto'

#### String | Number \`width\`

 - _width_ can be either a number \`width={2}\`, this acts as \`flex-grow\` or a string
with a unit (for example _%_ or _px_) 

> it must be a valid css unit.

#### String | Number \`height\`

- sets the height of the component

> it must be a valid css unit

#### String \`className\`

- className to apply to the component

#### Object \`style\`

 - Will be merged the flex style. This allows you to override the style.


`;

export default markdown;