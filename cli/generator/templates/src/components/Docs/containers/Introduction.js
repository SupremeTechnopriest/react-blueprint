/**
 * Introduction.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-blueprint';
import radium from 'radium';
import Markdown from 'react-remarkable';

import { Introduction as source } from '../markdown';

import { colors } from 'utils/style';

@radium
@Dimensions
export default class Introduction extends Component {

	render() {
		return (
			<View column style={styles.container}>
				<h1 style={styles.border}>Quick Start</h1>
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
		paddingBottom: 20,
		marginBottom: 20,
		borderBottom: `1px solid ${colors.grey400}`
	}
};
