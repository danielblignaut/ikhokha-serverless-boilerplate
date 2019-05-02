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
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					{loader: 'style-loader'}, 
					{loader: 'typings-for-css-modules-loader', options: {namedExport: true}},
				],
			},
			{
				test: /\.module\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'typings-for-css-modules-loader', options: {modules: true, camelCase: true, namedExport: true}},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: 'file-loader',
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: false }),
		new webpack.WatchIgnorePlugin([
			/css\.d\.ts$/
		])
	],
	resolve: {
		extensions: [
			'.graphql',
			'.js',
			'.ts',
			'.webpack.js', 
			'.web.js', 
			'.mjs', 
			'.json',
			'.jsx',
			'.tsx',
		],
		modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
	},
}