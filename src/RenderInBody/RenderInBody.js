import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class RenderInBody extends Component {
	
		componentDidMount() {``
			this.child = document.createElement('div');
			document.body.appendChild(this.child);
			this._renderLayer();
		}

		componentDidUpdate() {
			this._renderLayer();
		}

		componentWillUnmount() {
			React.unmountComponentAtNode(this.child);
			document.body.removeChild(this.child);
		}


		_renderLayer() {
			ReactDOM.render(this.props.children, this.child);
		}

		render() {
			// Render a placeholder
			return React.DOM.div();
		}
		

}

const decorateRenderInBody = (ComposedComponent, options = {}) => {

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

const _RenderInBody = (element, options = {}) => {
	switch(typeof element) {
		case 'object':
			return (<RenderInBody>{element.children}</RenderInBody>);
		case 'function':
			return decorateRenderInBody(element);
		default:
			return;
	}
}

export default _RenderInBody;