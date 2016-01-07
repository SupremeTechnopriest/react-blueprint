'use strict';

var path = require('path');
var yeoman = require('yeoman-generator').Base;

module.exports = yeoman.extend({

	constructor: function() {
		yeoman.apply(this, arguments);
		this.option('name', { type: String, required: true });
	},

	configuring: function() {

		let name = this.args[0];

		this.fs.copy(
			this.templatePath('.*'),
			this.destinationPath('')
		);

		this.fs.copy(
			this.templatePath('LICENSE'),
			this.destinationPath('LICENSE')
		);

		this.fs.copy(
			this.templatePath('config'),
			this.destinationPath('config')
		);

		this.fs.copy(
			this.templatePath('static'),
			this.destinationPath('static')
		);

		this.fs.copy(
			this.templatePath('webpack'),
			this.destinationPath('webpack')
		);

		this.fs.copyTpl(
			this.templatePath('*.*'),
			this.destinationPath(''),
			{ name: name }
		);

		this.fs.copyTpl(
			this.templatePath('src'),
			this.destinationPath('src'),
			{ name: name }
		);

	},

	writing: function() {
		if (this.options.upgrade) {
			// never upgrade index.*.js files
			return;
		}
	}

});
