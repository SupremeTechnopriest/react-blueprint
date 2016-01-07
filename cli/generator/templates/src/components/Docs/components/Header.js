/**
 * App.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { View } from 'react-blueprint';
import radium from 'radium';

import { colors, type } from 'utils/style';

@radium
export default class App extends Component {

	static propTypes = {
		version: PropTypes.string.isRequired
	};

	static defaultProps = {
		version: 'beta'
	};

	render() {
		return (
			<View row auto width={1} height='50' style={styles.container}>
				<View column width="225" style={styles.title}>
					<h1>React Blueprint</h1>
				</View>
				<View column style={styles.version}>
					<p>v{this.props.version}</p>
				</View>
				<View column style={styles.links}>
					<a style={styles.anchor} target='_blank' href="https://github.com/supremetechnopriest/react-blueprint">GitHub</a>
				</View>
			</View>
		);
	}

};

const styles = {
	container: {
		backgroundColor: colors.grey800,
		padding: '0 20px'
	},
	title: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		fontFamily: type.thin,
		fontSize: 16,
		color: colors.cyan500
	},
	version: {
		fontFamily: type.italic,
		color: colors.grey50
	},
	links: {
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	anchor: {
		textDecoration: 'none',
		color: colors.grey50,

		':hover': {
			color: colors.cyan500
		}
	}
};
