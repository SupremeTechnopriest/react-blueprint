/**
 * App.js
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import radium from 'radium';

import { authenticated$ } from 'selectors/UISelector';
import { updateAuthenticated } from 'actions/UIActions';
import { colors } from 'utils/style';
import { app } from 'utils/copy';
import RedBox from 'redbox-react';

@radium
@connect(authenticated$)
export default class App extends Component {

	displayName = 'App';

	static propTypes = {};

	static defaultProps = {};

	componentDidMount() {
		setTimeout(() => { this.props.dispatch(updateAuthenticated(true))}, 2000);
	}

	render() {
		return (
			<div style={styles.container}>
				<h1 style={styles.title}>{app.title}</h1>
				<h3 style={styles.subtitle}>{app.subtitle}</h3>
				<p>Hello {this.props.authenticated ? 'Authorized' : 'Unauthorized'}</p>
				<p>Press "H" to hide redux devtools</p>
				<p>Press "Q" to change devtools position</p>
			</div>
		);
	}

};

const styles = {
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		color: colors.blue500,
	},
	subtitle: {
		color: colors.amber800,
	}
};
