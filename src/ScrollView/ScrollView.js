import React, { Component, PropTypes } from 'react';
import Infinite from 'react-infinite';
import radium from 'radium';

@radium
export default class ScrollView extends Component {

	static propTypes = {};

	static defaultProps = {};

	state = {};

	render() {
		return <Infinite {...this.props}>{this.props.children}</Infinite>;
	}

}

const styles = {};
