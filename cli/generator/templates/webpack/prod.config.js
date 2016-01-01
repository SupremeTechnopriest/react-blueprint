require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CopyPlugin = require('copy-webpack-plugin');
var strip = require('strip-loader');

var assetsPath = path.join(__dirname, '../build');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		'main': [
			'./src/index.js'
		]
	},
	output: {
		path: assetsPath,
		filename: 'script.js',
		publicPath: '/'
	},
  	module: {
		loaders: [
		  	{ test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
		  	{ test: /\.json$/, loader: 'json-loader' },
		  	{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
		  	{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
		  	{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
		  	{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
		  	{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
		 	{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
		]
  },
	progress: true,
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules'
		],
		extensions: ['', '.json', '.js']
	},
	plugins: [

		new webpack.DefinePlugin({
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false,
		}),

		new webpack.ProvidePlugin({
			Config: path.resolve(__dirname, '../config/prod-config.js')
		}),

		new CopyPlugin([{
			from: './static'
		}]),

		// set global vars
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('production')
			}
		}),

		// optimizations
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),

		webpackIsomorphicToolsPlugin

	]
};
