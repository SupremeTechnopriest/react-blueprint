/**
 * Sidebar.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { View } from 'react-blueprint';
import radium from 'radium';

import { colors, type } from 'utils/style';

@radium
export default class App extends Component {

	static propTypes = {
		links: PropTypes.array,
		height: PropTypes.number.isRequired
	};

	static defaultProps = {
		links: [{
			title: 'Quick Start',
			links: [
				'Introduction',
				'Installation',
				'Removing Docs',
				'Examples'
			]
		}, {
			title: 'Generator',
			links: [
				'Commands',
				'File Structure',
				'DevTools'
			]
		}, {
			title: 'Components',
			links: [
				'View',
				'ScrollView'
			]
		}, {
			title: 'Utilities',
			links: [
				'Dimensions'
			]
		}]
	};

	render() {

		let k = 0;

		let links = this.props.links.map((link, i) => {

			let returnArray = [];

			returnArray.push(<h4 style={styles.chapter}>{link.title}</h4>);
			returnArray.push(link.links.map((l, j) => {

				let linkStyle = [ styles.link ];

				if(k === this.props.activeIndex) {
					linkStyle.push(styles.active);
				}

				let anchor = <a key={`${i}-${j}`} onClick={this.onClick.bind(this, k)} style={linkStyle}>{l}</a>;
				
				k++;
				
				return anchor;

			}));

			returnArray.push(<div style={styles.borderBottom} />);

			return returnArray;

		});

		return (
			<View column auto width='200' height={this.props.height} style={styles.container}>
				{links}
			</View>
		);
	}

	onClick(index) {
		this.props.scrollTo(index);
	}

};

const styles = {
	container: {
		backgroundColor: colors.grey300,
		justifyContent: 'flex-start',
		padding: '0 20px'
	},
	chapter: {
		fontFamily: type.bold
	},
	link: {
		color: colors.grey800,
		textDecoration: 'none',
		marginLeft: 20,
		fontSize: 14,
		cursor: 'pointer',

		':hover': {
			color: colors.cyan600
		}
	},
	active: {
		color: colors.cyan600
	},
	title: {
		fontSize: 18,
	},
	borderBottom: {
		height: '1px',
		borderBottom: `1px solid ${colors.grey500}`,
		marginTop: 20,
	}
};
