import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Motion, spring } from 'react-motion'; 

@Radium
export default class OffCanvas extends Component {

	static propTypes = {
		leftSidebar: PropTypes.any,
		leftWidth: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		partialWidth: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		rightSidebar: PropTypes.any,
		rightWidth: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		expandedWidth: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		leftOpen: PropTypes.bool,
		rightOpen: PropTypes.bool,
		partial: PropTypes.bool,
		leftType: PropTypes.oneOf(['push', 'squeeze', 'overlay']),
		rightType: PropTypes.oneOf(['push', 'squeeze', 'overlay']),
		border: PropTypes.bool,
		leftStyle: PropTypes.object,
		rightStyle: PropTypes.object,
		style: PropTypes.object,
	};

	static defaultProps = {
		leftSidebar: null,
		rightSidebar: null,
		leftOpen: false,
		rightOpen: false,
		leftType: 'push',
		rightType: 'squeeze',
		partial: true
	};

	state = {};

	constructor(props) {
		super(props);
		this.state.openRight = props.rightOpen;
		this.state.openLeft = props.leftOpen;
		this.state.expanded = false;
	}

	render() {

		let {leftWidth, rightWidth, expandedWidth, partial, style, leftStyle, rightStyle } = this.props;
		let {openLeft, openRight, expanded } = this.state;

		let sidebarStyles = width => [ styles.sidebar, { width }, leftStyle];
		let mainStyles = (paddingLeft, paddingRight) => [ styles.content, { paddingLeft, paddingRight }, style];
		let auxbarStyles = width => [ styles.auxbar, { width }, rightStyle ];

		return (
			<div style={styles.container}>
				
				<Motion style={{ width: spring(this._calculateLeft('width')) }}>
					{({ width }) => {
						return (
							<div style={sidebarStyles(width)}>
								{this.props.leftSidebar}
							</div>
						);
					}}
				</Motion>
				
				<Motion 
					style={{ 
						paddingLeft: spring(this._calculateLeft('padding')),
						paddingRight: spring(this._calculateRight('padding'))
					}}>
					{({ paddingLeft, paddingRight }) => {
						return (
							<div style={mainStyles(paddingLeft, paddingRight)}>
								{this.props.children}
							</div>
						);
					}}

				</Motion>

				<Motion style={{ width: spring(this._calculateRight('width')) }}>
					{({ width }) => {
						return (
							<div style={auxbarStyles(width)}>
								{this.props.rightSidebar}
							</div>
						)
					}}
				</Motion>

			</div>
		);

	}

	toggleLeft() {
		this.setState({ openLeft: !this.state.openLeft });
	}

	toggleRight() {

		if(this.state.openRight) {
			this.setState({
				openRight: false,
				expanded: false
			});
		} else {
			this.setState({
				openRight: true,
			});
		}
	}

	toggleExpandRight() {
		if (this.state.openRight) {
			this.setState({
				expanded: !this.state.expanded
			});
		} else {
			this.setState({
				openRight: true,
				expanded: true
			});
		}
	}

	closeLeft() {
		this.setState({ openLeft: false });
	}

	closeRight() {
		this.setState({ openRight: false });
	}

	_calculateRight(type) {
		if(this.state.openRight) {
			switch(this.props.rightType) {
				case 'squeeze':
					if(this.state.expanded) return this.props.expandedWidth;
					return this.props.rightWidth;
				case 'overlay':
					if(this.state.expanded) {
						return type === 'padding' ? 0 : this.props.expandedWidth;
					}
					return type === 'padding' ? 0 : this.props.rightWidth;
			}
		} else {
			return 0;
		}
	}

	_calculateLeft(type) {
		if(this.state.openLeft) {
			switch(this.props.leftType) {
				case 'squeeze':
					return this.props.leftWidth;
				case 'overlay':
					return type === 'padding' ? 0 : this.props.leftWidth;
			}
		} else {
			if(this.props.partial) return this.props.partialWidth;
			return 0;
		}
	}

}

const styles = {
	container: { height: '100%' },
	sidebar: {
		width: 0,
		height: '100%',
		position: 'fixed',
		marginLeft: 0,
		float: 'left',
		zIndex: 1,
		overflow: 'hidden'
	},
	auxbar: {
		width: 0,
		height: '100%',
		position: 'fixed',
		right: 0,
		float: 'left',
		zIndex: 1,
		overflow: 'hidden'
	},
	content: {
		width: '100%',
		height: '100%',
		float: 'left',
		paddingLeft: 0,
		zIndex: 0,
		overflowX: 'hidden',
		position: 'relative'
	}
};