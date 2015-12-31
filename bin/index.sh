var exec = require('child_process').exec;
var REACT_BLUEPRINT_CLI_PATH = function() {
	return path.resolve(
		__dirname,
		'..',
		'cli',
		'index.js'
	);
};

var cmd = 'node ' + REACT_BLUEPRINT_CLI_PATH() + ' ' + process.argv.join(' ');

exec(cmd, function(error, stdout, stderr) {
	if(error) {
		console.log(error);
		process.exit();
	}

	console.log(stdout, stderr);

});
