require('babel-polyfill');

// Webpack config for development
var config = require('../config/dev-config'),
	fs = require('fs'),
	path = require('path'),
	webpack = require('webpack'),
	WebpackIsomorphicTools = require('webpack-isomorphic-tools'),
	assetsPath = path.resolve(__dirname, '../static'),
	host = (config.host) || 'localhost',
	port = (config.port) || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
	devtool: 'eval',
	context: path.resolve(__dirname, '..'),
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		'./src/index.js'
	],
	output: {
		path: assetsPath,
		devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
		filename: 'script.js',
		publicPath: '/',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			include: [path.resolve(__dirname, "../src")],
			loaders: ['babel-loader', 'eslint-loader']
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/octet-stream"
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file"
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=image/svg+xml"
		}, {
			test: webpackIsomorphicToolsPlugin.regular_expression('images'),
			loader: 'url-loader?limit=10240'
		}]
	},
	progress: true,
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules'
		],
		fallback: path.join(__dirname, "..", "node_modules"),
		extensions: ['', '.json', '.js']
	},
	resolveLoader: { fallback: path.join(__dirname, "..", "node_modules") },
	plugins: [
		// hot reload
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.ProvidePlugin({
			Config: path.resolve(__dirname, '../config/dev-config.js')
		}),
		new webpack.DefinePlugin({
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
		}),
		webpackIsomorphicToolsPlugin.development()
	]
};
