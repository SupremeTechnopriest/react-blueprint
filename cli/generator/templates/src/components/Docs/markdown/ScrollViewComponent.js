const markdown = `

## ScrollView

A scrolling view component with rendering optimizations. Based on [react-infinite](https://github.com/seatgeek/react-infinite/) with some additions and optimizations. 

### Examples

#### Elements of Equal Height
- To use ScrollView with a list of elements you want to make scrollable, provide them to ScrollView as children.

\`\`\`
<ScrollView containerHeight={200} elementHeight={40}>
    <div className="one"/>
    <div className="two"/>
    <div className="three"/>
</ScrollView>
\`\`\`

#### Optimizations Disabled

- A simple ScrollView with no optimizations.

\`\`\`
<ScrollView containerHeight={200} optimizeRendering={false}>
    <div className="one"/>
    <div className="two"/>
    <div className="three"/>
</ScrollView>
\`\`\`

#### Elements of Varying Heights

- If not all of the children have the same height, you must provide an array of integers to the \`elementHeight\` prop instead.

\`\`\`
<ScrollView containerHeight={200} elementHeight={[111, 252, 143]}>
    <div className="111-px"/>
    <div className="252-px"/>
    <div className="143-px"/>
</ScrollView>
\`\`\`

#### Using the Window to Scroll (\`useWindowAsScrollContainer\` mode)

- To use the entire window as a scroll container instead of just a single \`div\` (thus using \`window.scrollY\` instead of a DOM element's \`scrollTop\`), add the \`useWindowAsScrollContainer\` prop.


\`\`\`
<ScrollView containerHeight={200} elementHeight={[111, 252, 143]}
          useWindowAsScrollContainer>
    <div className="111-px"/>
    <div className="252-px"/>
    <div className="143-px"/>
</ScrollView>
\`\`\`

#### As A Chat or Message Box (\`displayBottomUpwards\` mode)

- ScrollView now supports being used as a chat box, i.e. appended elements appear at the bottom when added, and the loading of the next page occurs when the user scrolls to the top of the container. To do so, simply add the \`displayBottomUpwards\` prop. 


\`\`\`
<ScrollView containerHeight={200} elementHeight={[111, 252, 143]}
          displayBottomUpwards>
    // insert messages for subsequent pages at this point
    <div className="third-latest-chat"/>
    <div className="second-latest-chat"/>
    <div className="latest-chat-message"/>
</ScrollView>
\`\`\`

#### Note on Smooth Scrolling

- A wrapper \`div\` is applied that disables pointer events on the children for a default of 150 milliseconds after the last user scroll action for browsers with inertial scrolling. To configure this, set \`timeScrollStateLastsForAfterUserScrolls\`.

### Static Methods

#### Function \`Infinite.containerHeightScaleFactor(Number number)\`

- This function allows a value to be specified for \`preloadBatchSize\` and \`preloadAdditionalHeight\` that is a relative to the container height. Please see the documentation for those two props for further information on how to use it.

### Instance Methods

#### Function \`scrollTo(Number top)\`

- This function will set the scrollTop of the \`ScrollView\`. Useful if you want to programatically set scroll position.

### Props

#### React Node | [React Node] \`children\`

 - The children of the \`<ScrollView>\` element are the components you want to render. This gives you as much flexibility as you need in the presentation of those components. Each child can be a different component if you desire. If you wish to render a set of children not all of which have the same height, you must map each component in the children array to an number representing its height and pass it in as the \`elementHeight\` prop.

### Bool \`optimizeRendering\`

- Defaults to \`true\`. Setting \`optimizeRendering={false}\` will keep your children rendered in the dom. The \`elementHeight\` prop can also be ignored. 

> This is only intended to be used for simple applications where the scroll content is relatively small.  You will experience limitations in this mode.

#### Bool \`useWindowAsScrollContainer\`

- Defaults to \`false\`. This option allows the window to be used as the scroll container, instead of an arbitrary \`div\`, when it is set to \`true\`. This means that scroll position is detected by \`window.scrollY\` instead of the \`scrollTop\` of the \`div\` that ScrollView creates. Using this option is a way of achieving smoother scrolling on mobile before the problem is solved for container \`div\`s.

#### Bool \`displayBottomUpwards\`

- Defaults to \`false\`. This allows ScrollView to be used as a chatbox. This means that the scroll is stuck to the bottom by default, and the user scrolls up to the top of the container to load the next page. The \`children\` are displayed in the same order.


#### (Required) Number | [Number] \`elementHeight\`

- If each child element has the same height, you can pass a number representing that height as the \`elementHeight\` prop. If the children do not all have the same height, you can pass an array which is a map the children to numbers representing their heights to the \`elementHeight\` prop.

#### Number \`containerHeight\`

- The height of the scrolling container in pixels. This is a **required** prop if \`useWindowAsScrollContainer\` is not set to \`true\`.

#### Number | Object \`preloadBatchSize\`

- Defaults to \`this.props.containerHeight * 0.5\`. Imagine the total height of the scrollable divs. Now divide this equally into blocks \`preloadBatchSize\` pixels high. Every time the container's scrollTop enters each of these blocks the set of elements rendered in full are those contained within the block and elements that are within \`preloadAdditionalHeight\` above and below it.

- When working with the window as the scroll container, it is sometimes useful to specify a scale factor relative to the container height as the batch size, so your code does not need to know anything about the \`window\`. To do this, use \`Infinite.containerHeightScaleFactor\`. So, for example, if you want the preloaded batch size to be twice the container height, write \`preloadBatchSize={Infinite.containerHeightScaleFactor(2)}\`.

#### Number | Object \`preloadAdditionalHeight\`

- Defaults to \`this.props.containerHeight\`. The total height of the area in which elements are rendered in full is height of the current scroll block (see \`preloadBatchSize\`) as well as \`preloadAdditionalHeight\` above and below it.

- When working with the window as the scroll container, it is sometimes useful to specify this relative to the container height. If you want the preloaded additional height to be twice the container height, write \`preloadAdditionalHeight={Infinite.containerHeightScaleFactor(2)}\`. Please see \`preloadBatchSize\` for more details.

#### Function \`handleScroll(DOMNode node)\`

- Defaults to \`function(){}\`. A function that is called when the container is scrolled, i.e. when the \`onScroll\` event of the infinite scrolling container is fired. The only argument passed to it is the native DOM [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) of the scrolling container.

#### Number \`infiniteLoadBeginEdgeOffset\`

- Defaults to \`undefined\`, which means that infinite loading is disabled. To disable infinite loading, do not provide this property or set it to undefined.

**Regular Mode**

- When the user reaches this number of pixels from the bottom, the infinite load sequence will be triggered by showing the infinite load spinner delegate and calling the function \`onInfiniteLoad\`.

**\`displayBottomUpwards\` mode**

- When the user reaches this number of pixels from the top of the container, the infinite load sequence will be triggered by showing the infinite loading spinner delegate at the top of the container and calling \`onInfiniteLoad\`.

#### Function \`onInfiniteLoad()\`
- Defaults to \`function(){}\`. This function is called when the scroll exceeds \`infiniteLoadBeginEdgeOffset\`. Before this function is called, **the infinite loading spinner is automatically turned on**. 

You can set up infinite scrolling with this function like this:

1. Fetch a new page of records from the appropriate API
2. When the AJAX call returns, send the new list of elements (with the items that were just fetched) back as the children of ScrollView.
3. Set ScrollView's \`isInfiniteLoading\` prop to \`false\` to hide the loading spinner display

\`onInfiniteLoad\` relies heavily on passing props as a means of communication in the style of idiomatic React.

#### React Node \`loadingSpinnerDelegate\`

- Defaults to \`<div/>\`. The element that is provided is used to render the loading view when ScrollView's \`isInfiniteLoading\` property is set to \`true\`. A React Node is anything that satisfies \`React.PropTypes.node\`.

#### Bool \`isInfiniteLoading\`

- Defaults to \`false\`. This property determines whether the infinite spinner is showing.

#### Number \`timeScrollStateLastsForAfterUserScrolls\`

- Defaults to \`150\` (in milliseconds). On Apple and some other devices, scroll is inertial. This means that the window continues to scroll for several hundred milliseconds after an \`onScroll\` event is fired. To prevent janky behavior, we do not want \`pointer-events\` to reactivate before the window has finished moving. Setting this parameter causes the \`Infinite\` component to think that the user is still scrolling for the specified number of milliseconds after the last \`onScroll\` event is received.


#### String \`className\`

- Allows a CSS class to be set on the scrollable container.


`;

export default markdown;