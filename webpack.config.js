var path = require('path');
//var babelRelayPlugin = require('./babelRelayPlugin');

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		filename: './bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					plugins: ['./babelRelayPlugin']
				}
			}
		]

	}
};