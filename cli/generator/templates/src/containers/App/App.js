/**
 * App.js
 * 
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium, { Style } from 'radium';
import { View } from 'react-blueprint';
import { colors, type } from 'utils/style';
import { app as copy } from 'utils/copy';

@Radium
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
					<h1>{copy.title}</h1>
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
    margin: 0,
    fontFamily: type.regular
  }
};
