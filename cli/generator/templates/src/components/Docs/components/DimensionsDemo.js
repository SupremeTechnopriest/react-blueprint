import React, { Component } from 'react';
import Radium from 'radium';
import { View, Dimensions } from 'react-blueprint';
import { colors } from 'utils/style';

@Radium
@Dimensions
export default class DimensionsDemo extends Component {
	render() {
		return (
			<View row style={styles.row}>
				<View column style={{ borderRight: `1px solid ${colors.lightGreen500}` }}>
					<View style={styles.alignCenter}>Window</View>
					<View>
						<View style={[styles.alignLeft, { borderRight: `1px solid ${colors.lightGreen600}` }]} width={1}>
							{`width: ${this.props.windowDimensions.width}px`}
						</View>
						<View style={styles.alignLeft} width={1}>
							{`height: ${this.props.windowDimensions.height}px`}
						</View>
					</View>
				</View>

				<View column style={{ borderRight: `1px solid ${colors.lightGreen500}` }}>
					<View style={styles.alignCenter}>Document</View>
					<View>
						<View style={[styles.alignLeft, { borderRight: `1px solid ${colors.lightGreen600}` }]} width={1}>
							{`width: ${this.props.documentDimensions.width}px`}
						</View>
						<View style={styles.alignLeft} width={1}>
							{`height: ${this.props.documentDimensions.height}px`}
						</View>
					</View>
				</View>

				<View column>
					<View style={styles.alignCenter}>This Element</View>
					<View>
						<View style={[styles.alignLeft, { borderRight: `1px solid ${colors.lightGreen600}` }]} width={1}>
							{`width: ${this.props.width}px`}
						</View>
						<View style={styles.alignLeft} width={1}>
							{`height: ${this.props.height}px`}
						</View>
					</View>
				</View>
				
			</View>
		);
	}
}

const styles = {
	row: {
		backgroundColor: colors.lightGreen700,
		color: colors.lightGreen50
	},
	alignLeft: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 10
	},
	alignCenter: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.lightGreen600
	}
};
