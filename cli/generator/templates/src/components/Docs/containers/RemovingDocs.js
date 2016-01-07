/**
 * RemovingDocs.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-blueprint';
import radium from 'radium';
import Markdown from 'react-remarkable';

import { RemovingDocs as source } from '../markdown';

import { colors } from 'utils/style';

@radium
@Dimensions
export default class RemovingDocs extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Markdown>{source}</Markdown>
			</View>
		);
	}

};

const styles = {
	container: {
		padding: 20,
		borderBottom: `1px solid ${colors.grey400}`
	}
};
