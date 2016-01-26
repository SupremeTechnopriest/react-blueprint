import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

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
		style: PropTypes.object
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

	state = {
		openRight: false,
		openLeft: false,
		expanded: false
	};

	constructor(props) {
		super(props);
		this.state.openRight = props.rightOpen;
		this.state.openLeft = props.leftOpen;
		this.state.expanded = false;
	}

	render() {
		let {leftWidth, rightWidth, expandedWidth, partial, style, leftStyle, rightStyle, leftType, rightType } = this.props;
		
		let {openLeft, openRight, expanded } = this.state;

		let leftPushStyles = [
			leftType === 'push' && styles.push,
			{ left: 0 }
		];

		let rightPushStyles = [
			rightType === 'push' && styles.push,
			{ right: 0 }
		];

		let containerStyles = marginLeft => [ styles.container, { marginLeft }],
			sidebarStyles = width => [ styles.sidebar, { width }, leftType === 'overlay' && styles.overlay, leftPushStyles , leftStyle],
			mainStyles = [ styles.content, style],
			auxbarStyles = width => [ styles.auxbar, { width }, rightType === 'overlay' && styles.overlay, rightPushStyles , rightStyle ];

		return (
			<div style={ containerStyles(this._calculatePush()) }>
				{/* Main (Left) Sidebar */}
				<div style={sidebarStyles(this._calculateLeft('width'))}>
					{this.props.leftSidebar}
				</div>

				{/* Content */}
				<div style={mainStyles}>
					{this.props.children}
				</div>

				{/* Aux (Right) Sidebar */}
				<div style={auxbarStyles(this._calculateRight('width'))}>
					{this.props.rightSidebar}
				</div>
			</div>
		);

	}

	toggleLeft() {
		let { leftType, rightType } = this.props;

		if ( leftType === 'push' && rightType === 'push' ) {
			this.setState({ openLeft: !this.state.openLeft, openRight: false });
		} else {
			this.setState({ openLeft: !this.state.openLeft });
		}

	}

	toggleRight() {
		let { leftType, rightType } = this.props;
		
		if ( leftType === 'push' && rightType === 'push' ){

			if(this.state.openRight) {
				this.setState({
					openRight: false,
					expanded: false
				});
			} else {
				this.setState({
					openRight: true,
					openLeft: false
				});
			}

		} else {

			if(this.state.openRight) {
				this.setState({
					openRight: false,
					expanded: false
				});
			} else {
				this.setState({
					openRight: true
				});
			}
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

	_calculatePush() {
		let { rightType, leftType } = this.props;

		let {openLeft, openRight, expanded } = this.state;
		
		if (openLeft && leftType === 'push') {
		
			return this.props.leftWidth
		
		} else if (openRight  && rightType === 'push') {
		
			if(this.state.expanded) {
				return this.props.expandedWidth * -1;
			}
			
			return this.props.rightWidth * -1
		}
			

	}

	_calculateRight(type) {
		if(this.state.openRight) {
			switch(this.props.rightType) {
				case 'squeeze':
					if(this.state.expanded) return this.props.expandedWidth;
					return this.props.rightWidth;
				case 'push':
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
				case 'push':
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
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		transition: 'margin 0.4s ease-out'
	},
	sidebar: {
		width: 0,
		height: '100%',
		position:'relative', 
		paddingLeft: 0,
		zIndex: 0,
		overflow: 'hidden',
		transition: 'width 0.4s ease-out'
	},
	auxbar: {
		width: 0,
		position:'relative', 
		height: '100%',
		right: 0,
		zIndex: 0,
		overflow: 'hidden',
		transition: 'width 0.4s ease-out'
	},
	overlay: {
		position: 'absolute',
		zIndex: 2,
	},
	push: {
		position: 'absolute'
	},
	content: {
		width: 'auto',
		height: '100%',
		paddingLeft: 0,
		zIndex: 1,
		flex: 1,
		position: 'relative',
		pointerEvents: 'none'
	}
};
