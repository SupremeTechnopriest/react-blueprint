var program = require('commander'),
	fs = require('fs'),
	prompt = require('prompt'),
	path = require('path'),
	chalk = require('chalk'),
	semver = require('semver'),
	cli = require('./cli');

var REACT_BLUEPRINT_PACKAGE_JSON_PATH = function() {
	return path.resolve(
		__dirname,
		'..',
		'package.json'
	);
};

function checkNodeVersion() {
	var packageJson = require(REACT_BLUEPRINT_PACKAGE_JSON_PATH());
	if (!packageJson.engines || !packageJson.engines.node) {
		return;
	}
	if (!semver.satisfies(process.version, packageJson.engines.node)) {
		console.error(chalk.red(
				'You are currently running Node %s but React Blueprint requires %s. ' +
				'Please use a supported version of Node.\n'
			),
			process.version,
			packageJson.engines.node);
	}
}

function validatePackageName(name) {
	if (!name.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
		console.error(
			'"%s" is not a valid name for a project. Please use a valid identifier ' +
			'name (alphanumeric).',
			name
		);
		process.exit(1);
	}

	if (name === 'React') {
		console.error(
			'"%s" is not a valid name for a project. Please do not use the ' +
			'reserved word "React".',
			name
		);
		process.exit(1);
	}
}

(function() {

	checkNodeVersion();

	var packageJson = require(REACT_BLUEPRINT_PACKAGE_JSON_PATH());

	program
		.version(packageJson.version)
		.option('-v, --version', 'display current version');

	program
		.command('init [name]')
		.description('creates a new project')
		.action(init);

	program.parse(process.argv);

})();

function init(name, options) {

	validatePackageName(name);

	if (fs.existsSync(name)) {
		createAfterConfirmation(name);
	} else {
		createProject(name);
	}

}

function createAfterConfirmation(name) {

	prompt.start();

	var property = {
		name: 'yesno',
		message: 'Directory ' + name + ' already exists. Continue?',
		validator: /y[es]*|n[o]?/,
		warning: 'Must respond yes or no',
		default: 'no'
	};

	prompt.get(property, function(err, result) {
		if (result.yesno[0] === 'y') {
			createProject(name);
		} else {
			console.log('Project initialization canceled');
			process.exit();
		}
	});
}

function createProject(name, options) {
	var root = path.resolve(name);

	// Create directiory
	if (!fs.existsSync(root)) {
		fs.mkdirSync(root);
	}

	cli.init(root, name);

}
