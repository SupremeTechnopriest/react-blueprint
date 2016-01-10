import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export const RenderInBody = (ComposedComponent, options = {}) => {

	return class extends Component {

		child = null;

		componentDidMount() {
			this.child = document.createElement('div');
			document.body.appendChild(this.child);
			this._renderLayer();
		}

		componentDidUpdate() {
			this._renderLayer();
		}

		componentWillUnmount() {
			ReactDOM.unmountComponentAtNode(this.child);
			document.body.removeChild(this.child);
		}

		_renderLayer() {
			ReactDOM.render(<ComposedComponent />, this.child);
		}

		render() {
			// Render a placeholder
			return React.DOM.div();
		}

	}

}

export default RenderInBody;