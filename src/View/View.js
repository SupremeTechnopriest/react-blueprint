import React, { Component, PropTypes } from 'react';
import radium from 'radium';

@radium
export default class View extends Component {

	static propTypes = {};

	static defaultProps = {};

	state = {};

	render() {
		return (
			<div><h1>View</h1></div>
		)
	}

}

const styles = {

};
