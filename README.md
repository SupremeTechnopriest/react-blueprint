# React Blueprint

[![Travis](https://img.shields.io/travis/SupremeTechnopriest/react-blueprint.svg)](https://travis-ci.org/SupremeTechnopriest/react-blueprint)
[![node](https://img.shields.io/node/v/react-blueprint.svg)](https://www.npmjs.org/package/react-blueprint)
[![npm](https://img.shields.io/npm/v/react-blueprint.svg)](https://www.npmjs.org/package/react-blueprint)
[![Dependency Status](https://www.versioneye.com/user/projects/568ea160691e2d002b000055/badge.svg?style=flat)](https://www.versioneye.com/user/projects/568ea160691e2d002b000055)
[![npm](https://img.shields.io/npm/dm/react-blueprint.svg)](https://www.npmjs.org/package/react-blueprint)
[![npm](https://img.shields.io/npm/dt/react-blueprint.svg)](https://www.npmjs.org/package/react-blueprint)
[![npm](https://img.shields.io/npm/l/react-blueprint.svg)](https://www.npmjs.org/package/react-blueprint)

React Blueprint is a react-native insipred web app generator and tool set. 

It uses the [best libraries](https://github.com/rackt) for React development without being too opinionated.  We make no assumptions on how your app should look, but instead provide a strong architecture to build upon.

### Included Libraries

- [**react**](https://facebook.github.io/react/)
- [**react-router**](https://github.com/rackt/react-router)
- [**react-redux**](https://github.com/rackt/react-redux)
- [**redux**](https://github.com/rackt/react-router)
- [**redux-thunk**](https://github.com/gaearon/redux-thunkre)
- [**react-router-redux**](https://github.com/rackt/react-router-redux)
- [**reselect**](https://github.com/rackt/reselect)
- [**radium**](http://stack.formidable.com/radium/)
- [**babel**](https://babeljs.io/)
- [**webpack**](https://webpack.github.io/)
- [**eslint**](http://eslint.org/)
- [**sockjs-client**](https://github.com/sockjs/sockjs-client)
- [**superagent**](https://visionmedia.github.io/superagent/)
- [**core-decorators**](https://github.com/jayphelps/core-decorators.js)
- [**lodash**](https://lodash.com/)


# Quick Start


## Installation

1. Install the command line interface - `npm i -g react-blueprint-cli` 
2. Generate your project - `react-blueprint init [app-name]`
3. Start your app - `cd [app-name] && npm start`

The dev server will be running on `localhost:3001` by default.

## Removing Docs

Upon creation of your project, you will notice that these docs are rendered in your application.  They have been included to provided some examples of usage.  All the docs are located in `src/components/Docs`.  To remove the docs, open the projects main index at `src/index.js`.

1. Remove the import of `DocRoutes` on line `24`
2. Change reference to `DocRoutes` to `Routes` on line `42`

When complete your new index should look as follows: 

```javascript
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import {
	Router,
	browserHistory as history
} from 'react-router';

import { App } from 'containers';
import { DevTools, Routes } from 'components';

import Store from 'stores/Store';
import { getHydratedState } from 'utils/localStorage';
import rootReducer from 'reducers';

const store = Store.store(rootReducer, getHydratedState());
const dest = document.getElementById('app-container');

Store.middleware.syncHistoryToStore(store, state => state.route);

// Enable Debugger
if (__DEVELOPMENT__) {
  window.React = React;
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
	// Dev Render
	render(
		<Provider store={store}>
			<div>
				<Router history={history}>{Routes}</Router>
				<DevTools />
			</div>
		</Provider>,
		dest
	);
} else {
	// Production Render
	render(
		<Provider store={store}>
			<Router history={history}>{Routes}</Router>
		</Provider>,
		dest
	);
}

```

At this point you can safely remove the Docs directory from `src/components` and your app will be rendering the blank App Container located at `src/containers/App/App.js`.


## Examples

You can find example usage in the previously mentioned `Docs` component. It has been structured to simulate the applcation structure (don't structure your components like this).

The main container component `Docs` resides at `src/components/Docs/containers/Docs.js`.

# Generator

## Commands

### Generator Commands

#### Init

`react-blueprint init [app-name]` - generates a React Blueprint project

### NPM Commands

`npm start` - Start the development server

`npm run clean` - Cleans the build directory

`npm run build` - Build the source files

`npm run lint` - Lint the source files

`npm test` - Run the test suite

## File Structure

### Static Directory

The static directory contains all your static assets.  Images, fonts, stylesheets, and the `index.html`.

### Config Directory

The config directory contains your development and production config files.  They are provided to your application via `WebpackProvidePlugin`.

### Source(src) Directory

The source directory contains all your application views and logic.

- **actions** - Redux actions
- **components** - Reusable components
- **containers** - Container components (components that act as route handlers)
- **reducers** - Redux store reducers
- **selectors** - Redux store selectors
- **stores** - There is only one store in a Redux app.  This is kept in a directory to keep things uniform. 
- **utils** - Various utilities including a websocket dispatcher, superagent request factory, custom decorators, LocalStorage middleware, style abstractions/variables and application copy centrailization.

*Diagram of the tree structure:*

```bash
.
├── LICENSE
├── README.md
├── config
│   ├── dev-config.js
│   └── prod-config.js
├── package.json
├── src
│   ├── actions
│   │   ├── UIActions.js
│   │   └── index.js
│   ├── components
│   │   ├── DevTools
│   │   │   └── DevTools.js
│   │   ├── Routes
│   │   │   └── Routes.js
│   │   └── index.js
│   ├── containers
│   │   ├── App
│   │   │   └── App.js
│   │   └── index.js
│   ├── index.js
│   ├── reducers
│   │   ├── UIReducer.js
│   │   └── index.js
│   ├── selectors
│   │   ├── RouteSelectors.js
│   │   ├── UISelectors.js
│   │   └── index.js
│   ├── stores
│   │   └── store.js
│   └── utils
│       ├── api.js
│       ├── copy.js
│       ├── decorators.js
│       ├── index.js
│       ├── localStorage.js
│       ├── style.js
│       └── websocket.js
├── static
│   ├── fonts
│   │   ├── clearsans
│   │   ├── clearsans_bold
│   │   ├── clearsans_bold_italic
│   │   ├── clearsans_italic
│   │   ├── clearsans_light
│   │   ├── clearsans_medium
│   │   ├── clearsans_medium_italic
│   │   ├── clearsans_thin
│   │   └── fonts.css
│   └── index.html
├── webpack
│   ├── dev.config.js
│   ├── prod.config.js
│   ├── webpack-dev-server.js
│   └── webpack-isomorphic-tools.js
└── webpack-assets.json
```

## DevTools

React Blueprint is equipped with Redux DevTools increase visibility into and control of your applications state.  All Redux actions are logged in the console using [redux-logger](https://www.npmjs.com/package/redux-logger).

In addition to the logger, we have provided Redux DevTools in the form of 
a panel overlay.  See usage below:

### Keybindings

- `H` Toggle the visibilty of the DevTools panel
- `Q` Change the DevTools panel position

# Components

React Blueprint components can be used independently of the project generator.  If you generate a project using the React Blueprint CLI then the component library will be installed automatically.  Otherwise install React Blueprint...

```bash
npm i react-blueprint --save
```

and import in your project

```javascript
import { View, ScrollView, Dimensions } from 'react-blueprint';
```


## View

A flexbox component.

### Examples

```javascript
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
```

```javascript
<View column height="200px">
	<View column auto>
    	<View style={{ color: "green"}} height="20px">Green</View>
		<View style={{ color: "red"}} height="20px">Red</View>
	</View>
	<View style={{ color: "green" }}>Hello test view </View>
</View>
```

### Props

All props are optional.

#### Bool `row`

- sets the flexDirection to row

#### Bool `column`

- sets the flexDirection to column

#### Bool `auto`

- sets the flex to '0 0 auto'

#### String | Number `width`

 - _width_ can be either a number `width={2}`, this acts as `flex-grow` or a string
with a unit (for example _%_ or _px_) 

> it must be a valid css unit.

#### String | Number `height`

- sets the height of the component

> it must be a valid css unit

#### String `className`

- className to apply to the component

#### Object `style`

 - Will be merged the flex style. This allows you to override the style.


## ScrollView

A scrolling view component with rendering optimizations. Based on [react-infinite](https://github.com/seatgeek/react-infinite/) with some additions and optimizations. 

### Examples

#### Elements of Equal Height
- To use ScrollView with a list of elements you want to make scrollable, provide them to ScrollView as children.

```xml
<ScrollView containerHeight={200} elementHeight={40}>
    <div className="one"/>
    <div className="two"/>
    <div className="three"/>
</ScrollView>
```

#### Optimizations Disabled

- A simple ScrollView with no optimizations.

```xml
<ScrollView containerHeight={200} optimizeRendering={false}>
    <div className="one"/>
    <div className="two"/>
    <div className="three"/>
</ScrollView>
```

#### Elements of Varying Heights

- If not all of the children have the same height, you must provide an array of integers to the `elementHeight` prop instead.

```xml
<ScrollView containerHeight={200} elementHeight={[111, 252, 143]}>
    <div className="111-px"/>
    <div className="252-px"/>
    <div className="143-px"/>
</ScrollView>
```

#### Using the Window to Scroll (`useWindowAsScrollContainer` mode)

- To use the entire window as a scroll container instead of just a single `div` (thus using `window.scrollY` instead of a DOM element's `scrollTop`), add the `useWindowAsScrollContainer` prop.


```xml
<ScrollView containerHeight={200} elementHeight={[111, 252, 143]}
          useWindowAsScrollContainer>
    <div className="111-px"/>
    <div className="252-px"/>
    <div className="143-px"/>
</ScrollView>
```

#### As A Chat or Message Box (`displayBottomUpwards` mode)

- ScrollView now supports being used as a chat box, i.e. appended elements appear at the bottom when added, and the loading of the next page occurs when the user scrolls to the top of the container. To do so, simply add the `displayBottomUpwards` prop. 


```xml
<ScrollView containerHeight={200} elementHeight={[111, 252, 143]}
          displayBottomUpwards>
    // insert messages for subsequent pages at this point
    <div className="third-latest-chat"/>
    <div className="second-latest-chat"/>
    <div className="latest-chat-message"/>
</ScrollView>
```

#### Note on Smooth Scrolling

- A wrapper `div` is applied that disables pointer events on the children for a default of 150 milliseconds after the last user scroll action for browsers with inertial scrolling. To configure this, set `timeScrollStateLastsForAfterUserScrolls`.

### Static Methods

#### Function `Infinite.containerHeightScaleFactor(Number number)`

- This function allows a value to be specified for `preloadBatchSize` and `preloadAdditionalHeight` that is a relative to the container height. Please see the documentation for those two props for further information on how to use it.

### Instance Methods

#### Function `scrollTo(Number top)`

- This function will set the scrollTop of the `ScrollView`. Useful if you want to programatically set scroll position.

### Props

#### React Node | [React Node] `children`

 - The children of the `<ScrollView>` element are the components you want to render. This gives you as much flexibility as you need in the presentation of those components. Each child can be a different component if you desire. If you wish to render a set of children not all of which have the same height, you must map each component in the children array to an number representing its height and pass it in as the `elementHeight` prop.

### Bool `optimizeRendering`

- Defaults to `true`. Setting `optimizeRendering={false}` will keep your children rendered in the dom. The `elementHeight` prop can also be ignored. 

> :warning: This is only intended to be used for simple applications where the scroll content is relatively small.  You will experience limitations in this mode.

#### Bool `useWindowAsScrollContainer`

- Defaults to `false`. This option allows the window to be used as the scroll container, instead of an arbitrary `div`, when it is set to `true`. This means that scroll position is detected by `window.scrollY` instead of the `scrollTop` of the `div` that ScrollView creates. Using this option is a way of achieving smoother scrolling on mobile before the problem is solved for container `div`s.

#### Bool `displayBottomUpwards`

- Defaults to `false`. This allows ScrollView to be used as a chatbox. This means that the scroll is stuck to the bottom by default, and the user scrolls up to the top of the container to load the next page. The `children` are displayed in the same order.


#### (Required) Number | [Number] `elementHeight`

- If each child element has the same height, you can pass a number representing that height as the `elementHeight` prop. If the children do not all have the same height, you can pass an array which is a map the children to numbers representing their heights to the `elementHeight` prop.

#### Number `containerHeight`

- The height of the scrolling container in pixels. This is a **required** prop if `useWindowAsScrollContainer` is not set to `true`.

#### Number | Object `preloadBatchSize`

- Defaults to `this.props.containerHeight * 0.5`. Imagine the total height of the scrollable divs. Now divide this equally into blocks `preloadBatchSize` pixels high. Every time the container's scrollTop enters each of these blocks the set of elements rendered in full are those contained within the block and elements that are within `preloadAdditionalHeight` above and below it.

- When working with the window as the scroll container, it is sometimes useful to specify a scale factor relative to the container height as the batch size, so your code does not need to know anything about the `window`. To do this, use `Infinite.containerHeightScaleFactor`. So, for example, if you want the preloaded batch size to be twice the container height, write `preloadBatchSize={Infinite.containerHeightScaleFactor(2)}`.

#### Number | Object `preloadAdditionalHeight`

- Defaults to `this.props.containerHeight`. The total height of the area in which elements are rendered in full is height of the current scroll block (see `preloadBatchSize`) as well as `preloadAdditionalHeight` above and below it.

- When working with the window as the scroll container, it is sometimes useful to specify this relative to the container height. If you want the preloaded additional height to be twice the container height, write `preloadAdditionalHeight={Infinite.containerHeightScaleFactor(2)}`. Please see `preloadBatchSize` for more details.

#### Function `handleScroll(DOMNode node)`

- Defaults to `function(){}`. A function that is called when the container is scrolled, i.e. when the `onScroll` event of the infinite scrolling container is fired. The only argument passed to it is the native DOM [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) of the scrolling container.

#### Number `infiniteLoadBeginEdgeOffset`

- Defaults to `undefined`, which means that infinite loading is disabled. To disable infinite loading, do not provide this property or set it to undefined.

**Regular Mode**

- When the user reaches this number of pixels from the bottom, the infinite load sequence will be triggered by showing the infinite load spinner delegate and calling the function `onInfiniteLoad`.

**`displayBottomUpwards` mode**

- When the user reaches this number of pixels from the top of the container, the infinite load sequence will be triggered by showing the infinite loading spinner delegate at the top of the container and calling `onInfiniteLoad`.

#### Function `onInfiniteLoad()`
- Defaults to `function(){}`. This function is called when the scroll exceeds `infiniteLoadBeginEdgeOffset`. Before this function is called, **the infinite loading spinner is automatically turned on**. 

You can set up infinite scrolling with this function like this:

1. Fetch a new page of records from the appropriate API
2. When the AJAX call returns, send the new list of elements (with the items that were just fetched) back as the children of ScrollView.
3. Set ScrollView's `isInfiniteLoading` prop to `false` to hide the loading spinner display

`onInfiniteLoad` relies heavily on passing props as a means of communication in the style of idiomatic React.

#### React Node `loadingSpinnerDelegate`

- Defaults to `<div/>`. The element that is provided is used to render the loading view when ScrollView's `isInfiniteLoading` property is set to `true`. A React Node is anything that satisfies `React.PropTypes.node`.

#### Bool `isInfiniteLoading`

- Defaults to `false`. This property determines whether the infinite spinner is showing.

#### Number `timeScrollStateLastsForAfterUserScrolls`

- Defaults to `150` (in milliseconds). On Apple and some other devices, scroll is inertial. This means that the window continues to scroll for several hundred milliseconds after an `onScroll` event is fired. To prevent janky behavior, we do not want `pointer-events` to reactivate before the window has finished moving. Setting this parameter causes the `Infinite` component to think that the user is still scrolling for the specified number of milliseconds after the last `onScroll` event is received.


#### String `className`

- Allows a CSS class to be set on the scrollable container.


# Utilities

## Dimensions

`Dimensions` is a utiltiy that will get the width and height (including margin and borders) of a given element.  You will need to ensure that your DOM is rendered before you can get the dimensions of a react element. However, `Dimensions` also supports `window` and `document` and their dimensions can be accessed immediately.  It can also be invoked as a decorator.
 
### Usage as Method

`Dimensions([ window || document || element ]);`

returns 

```javascript
{
	width: [number],
	height: [number]
}
```

#### Window or Document

```javascript

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

```

#### React DOM Component

React now exposes the DOM element of their DOM components (`div`, `span`, `p`, `a`, etc) through this refs. 

```javascript

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

```

#### Custom React Component

If you want to measure a custom component you will have to use `ReactDOM.findDOMNode(this.refs.yourRef)`

```javascript

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

```

### Usage as Decorator

You can decorate your custom classes with `Dimensions` and it will add a `width` and a `height` prop to your component. It also attaches a `getDimensions()` method which will return the components `width` and `height`.  Anytime the window is resized the new dimensions will be computed and made available via props.

```javascript

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

```


