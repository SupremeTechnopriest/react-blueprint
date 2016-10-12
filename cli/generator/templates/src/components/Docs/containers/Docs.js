/**
 * Docs.js
 */

import packageJson from '../../../../node_modules/react-blueprint/package.json';

import React, { Component, PropTypes } from 'react';
import { findDOMNode as $ } from 'react-dom';
import { connect } from 'react-redux';
import radium, { Style } from 'radium';

import { View, ScrollView, Dimensions } from 'react-blueprint';

import { authenticated$ } from 'selectors/UISelectors';
import { path$ } from 'selectors/RouteSelectors';

import { updateAuthenticated } from 'actions/UIActions';

import { colors, type } from 'utils/style';
import { app } from 'utils/copy';
import { Header, Sidebar, Badges } from '../components';
import { 
	Introduction,
	Installation,
	RemovingDocs,
	Examples,
	Commands,
	FileStructure,
	DevTools,
	ViewComponent,
	ScrollViewComponent,
	DimensionsUtility
} from '../containers';

@radium
@connect(authenticated$)
@connect(path$)
export default class Docs extends Component {

	static propTypes = {};

	static defaultProps = {};

	state = {
		elementHeights: 500,
		activeIndex: 0
	};

	elements = [
		Introduction,
		Installation,
		RemovingDocs,
		Examples,
		Commands,
		FileStructure,
		DevTools,
		ViewComponent,
		ScrollViewComponent,
		DimensionsUtility
	];

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setDimensions();
		window.addEventListener('resize', this.setDimensions.bind(this));
	}

	componentDidMount() {
		if(this.refs['0']) setTimeout(this.setDimensions.bind(this), 10000);
	}

	componentWillUnmount() {
		window.removeEventListener('resize');
	}

	render() {

		let sidebarHeight = this.state.windowDimensions.height - this.state.headerDimensions.height,
			viewportHeight = sidebarHeight - this.state.badgeDimensions.height;

		let elements = this.elements.map((Item, i) => {
			return <Item key={i} ref={i} {...this.state} />
		});

		let elementHeights = this.getElementHeights();

		return (
			<View ref="view" column>
				<Style rules={rules} />
				<Header ref="header" version={packageJson.version} />
				<View>
					<Sidebar height={sidebarHeight} activeIndex={this.state.activeIndex} scrollTo={this.scrollTo.bind(this)} />
					<div style={{ overflow: 'hidden' }}>
						<View ref="badges" style={styles.badges}>
							<Badges />
						</View>
						<ScrollView 
							ref="scrollview"
							optimizeRendering={false}
							handleScroll={this.handleScroll.bind(this)}
							containerHeight={viewportHeight}>
							{elements}
						</ScrollView>
					</div>
				</View>
			</View>
		);
	}

	getElementHeights() {
		let elementHeights;
		if(typeof this.state.elementHeights === 'object') {
			elementHeights = [];
			for(var key in this.state.elementHeights) {
				elementHeights.push(this.state.elementHeights[key]);
			}
		} else {
			elementHeights = this.state.elementHeights;
		}
		return elementHeights;
	}

	getHeight(key) {
		return this.refs[key] ? this.refs[key].getDimensions().height : 
			( this.state.elementHeights[key] ? this.state.elementHeights[key] : 500 );
	}

	setDimensions() {

		let defaultDimensions = {
			width: 0,
			height: 50
		};

		let windowDimensions = Dimensions(window),
			documentDimensions = Dimensions(document),
			headerDimensions = this.refs.header ? Dimensions($(this.refs.header)) : defaultDimensions,
			badgeDimensions = this.refs.badges ? Dimensions($(this.refs.badges)) : { height: 47 },
			elementHeights = {};

			this.elements.forEach((element, i) => {
				return elementHeights[i] = this.getHeight(i);
			});

		this.setState({ windowDimensions, documentDimensions, headerDimensions, badgeDimensions, elementHeights });

	}

	scrollTo(activeIndex) {
		let elementHeights = this.getElementHeights(),
			top = 0;

		for(let i = 0; i < activeIndex; i++) {
			top += elementHeights[i];
		}

		this.setState({ activeIndex })
		this.refs.scrollview.scrollTo(top);
	}

	handleScroll(e) {;

		let elementHeights = this.getElementHeights(),
			height = 0, activeIndex = this.state.activeIndex;

		elementHeights.forEach((h, i) => {
			
			if(e.scrollTop > height && e.scrollTop < height + h) {
				activeIndex = i;
			}

			height += h;

		});

		if(this.state.activeIndex !== activeIndex) {
			this.setState({ activeIndex });
		}

	}

};

const rules = {
	html: {
	background: 
		colors.grey100
	},
	body: {
		margin: 0,
		fontFamily: type.regular
	},
	pre: {
		backgroundColor: colors.grey300,
		padding: '10px',
		overflowY: 'scroll',
		overflowX: 'hidden',
	},
	code: {
		backgroundColor: colors.grey300,
		borderRadius: '2px',
		color: colors.grey800,
		padding: '5px 5px',
		lineHeight: 2
	},
	blockquote: {
		borderLeft: `5px solid ${colors.amber500}`,
	    padding: '10px 0 10px 20px',
    	marginLeft: 0
	},
	a: {
		textDecoration: 'none',
		color: colors.cyan700,
	}
}

const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
};
