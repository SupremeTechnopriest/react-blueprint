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

module.exports = function(root, name) {

	console.log(chalk.yellow('Setting up new React Blueprint app ' + chalk.cyan(name) + ' in ' + chalk.cyan(root)));

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

			console.log(chalk.yellow('Installing dependencies...'));

			var proc = spawn('npm', [ 'install' ], {
				cwd: root,
				stdio: 'inherit'
			});
			proc.on('close', function(code) {
				if (code !== 0) {
					console.error('`npm install` failed');
					return;
				}
				console.log(chalk.green('React Blueprint app ') + chalk.cyan(name) + chalk.green(' created in ') + chalk.cyan(root));
			});
		}

	});

}
