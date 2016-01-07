import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Badges extends Component {
	render() {
		return (
			<div row style={styles.container}>
				<div style={styles.badge}>
					<a href="https://travis-ci.org/SupremeTechnopriest/react-blueprint">
						<img src="https://img.shields.io/travis/SupremeTechnopriest/react-blueprint.svg" alt="Travis" />
					</a>
				</div>
				<div style={styles.badge}>
					<a href="https://www.npmjs.org/package/react-blueprint">
						<img src="https://img.shields.io/node/v/react-blueprint.svg" alt="node" />
					</a>
				</div>
				<div style={styles.badge}>
					<a href="https://www.npmjs.org/package/react-blueprint">
						<img src="https://img.shields.io/npm/v/react-blueprint.svg" alt="npm" />
					</a>
				</div>
				<div style={styles.badge}>
					<a href='https://www.versioneye.com/user/projects/568ea160691e2d002b000055'>
						<img src='https://www.versioneye.com/user/projects/568ea160691e2d002b000055/badge.svg?style=flat' alt="Dependency Status" />
					</a>
				</div>
				<div style={styles.badge}>
					<a href="https://www.npmjs.org/package/react-blueprint">
						<img src="https://img.shields.io/npm/dm/react-blueprint.svg" alt="npm" />
					</a>
				</div>
				<div style={styles.badge}>
					<a href="https://www.npmjs.org/package/react-blueprint">
						<img src="https://img.shields.io/npm/dt/react-blueprint.svg" alt="npm" />
					</a>
				</div>
				<div style={styles.badge}>
					<a href="https://www.npmjs.org/package/react-blueprint">
						<img src="https://img.shields.io/npm/l/react-blueprint.svg" alt="npm" />
					</a>
				</div>
			</div>
		)
	}
}

const styles = {
	container: {
		paddingTop: 12,
		paddingLeft: 10
	},
	badge: {
		paddingBottom: 10,
		paddingLeft: 10,
		display: 'inline-block'
	}
}
