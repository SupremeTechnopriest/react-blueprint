var spawn = require('child_process').spawn,
	fs = require('fs'),
	path = require('path'),
	chalk = require('chalk'),
	TerminalAdapter = require('yeoman-environment/lib/adapter.js'),
	yeoman = require('yeoman-environment');

function CreateSuppressingTerminalAdapter() {

	this.log = new TerminalAdapter();
	this.log.create = function() {};
	return this.log;

}

function init(root, name) {

	console.log(chalk.blue('Setting up new React Blueprint app in ' + root));

	var env = yeoman.createEnv(
		undefined,
		undefined,
		new CreateSuppressingTerminalAdapter()
	);

	env.register(
		require.resolve(path.join(__dirname, '..', 'generator')),
		'blueprint:app'
	);

	var generator = env.create('blueprint:app', {
		args: [name]
	});

	generator.destinationRoot(root);
	generator.run(function(err) {
		if (!err) {
			var proc = spawn('npm', [ 'install' ], {
				cwd: root,
				stdio: 'inherit'
			});
			proc.on('close', function(code) {
				if (code !== 0) {
					console.error('`npm install` failed');
					return;
				}
			});
		}

	});

}

module.exports = {
	init: init
}
