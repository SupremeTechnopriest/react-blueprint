/**
 * App.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import radium, { Style } from 'radium';
import { View } from 'react-blueprint';
import { colors } from 'utils/style';
import { app } from 'utils/copy';

@radium
@connect()
export default class App extends Component {

	static propTypes = {};

	static defaultProps = {};

	state = {};

	render() {
		return (
			<View>
				<Style rules={rules} />
				<View>
					<h1>{app.title}</h1>
					{this.props.children}
				</View>
			</View>
		);
	}

};

const rules = {
  html: {
    background: colors.grey100
  },
  body: {
    margin: 0
  }
};
