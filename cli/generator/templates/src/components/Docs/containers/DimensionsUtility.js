/**
 * DimensionsUtility.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-blueprint';
import Radium from 'radium';
import Markdown from 'react-remarkable';

import { DimensionsDemo } from '../components';
import { DimensionsUtility as source } from '../markdown';

import { colors } from 'utils/style';

@Radium
@Dimensions
export default class DimensionsUtility extends Component {

	render() {
		return (
			<View column style={styles.container}>
				<h1 style={styles.border}>Utilities</h1>
				<View style={styles.title}>
					<h2>Dimensions</h2>
				</View>
				<DimensionsDemo 
					windowDimensions={this.props.windowDimensions}
					documentDimensions={this.props.documentDimensions} />
				<Markdown>{source}</Markdown>
			</View>
		);
	}

};

const styles = {
	container: {
		flexBasis: 0, 
		padding: 20,
		borderBottom: `1px solid ${colors.grey400}`
	},
	border: {
		padding: '20px 0',
		marginBottom: 20,
		borderBottom: `1px solid ${colors.grey400}`
	}
};
