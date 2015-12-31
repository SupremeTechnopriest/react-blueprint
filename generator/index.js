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

		this.fs.copyTpl(
			this.templatePath('.*'),
			this.destinationPath(''),
			{ name: name }
		);

		this.fs.copyTpl(
			this.templatePath('*/**/**/**'),
			this.destinationPath(''),
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
