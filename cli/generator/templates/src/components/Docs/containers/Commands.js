/**
 * Commands.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-blueprint';
import radium from 'radium';
import Markdown from 'react-remarkable';

import { Commands as source } from '../markdown';

import { colors } from 'utils/style';

@radium
@Dimensions
export default class Commands extends Component {

	render() {
		return (
			<View column style={styles.container}>
				<h1 style={styles.border}>Generator</h1>
				<Markdown>{source}</Markdown>
			</View>
		);
	}

};

const styles = {
	container: {
		padding: 20,
		borderBottom: `1px solid ${colors.grey400}`
	},
	border: {
		padding: '20px 0',
		marginBottom: 20,
		borderBottom: `1px solid ${colors.grey400}`
	}
};
