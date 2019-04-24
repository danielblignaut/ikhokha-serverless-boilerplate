import * as CircularDependencyPlugin from 'circular-dependency-plugin'
import * as path from 'path'
import * as slsw from 'serverless-webpack'
import * as webpack from 'webpack'


module.exports = {
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	devtool: 'source-map',
	target: 'node',
	entry: slsw.lib.entries,
	output: {
		filename: '[name].js',
		libraryTarget: 'commonjs',
		path: path.resolve(__dirname, '.webpack'),
	},
	module: {
		rules: [
			{
				exclude: [/node_modules/],
				test: /\.ts$/,
				use: [
					{ loader: 'imports-loader', options: { graphql: true } },
					{ loader: 'babel-loader' },
					{ loader: 'eslint-loader'}
				],
			},
			{
				exclude: /node_modules/,
				test: /\.graphql$/,
				use: [
					{
						loader: 'raw-loader',
					},
				]
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			}
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: false }),
	],
	resolve: {
		extensions: [
			'.graphql',
			'.js',
			'.ts',
			'.webpack.js', 
			'.web.js', 
			'.mjs', 
			'.json'
		]
	},
}