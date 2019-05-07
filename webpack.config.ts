import * as path from 'path'
import * as webpack from 'webpack'
// eslint-disable-next-line
const slsw = require('serverless-webpack')
const srcPath = (subdir: string): string => {
	return path.join(__dirname, subdir)
}

module.exports = {
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	devtool: 'source-map',
	target: 'node',
	entry: slsw.lib.entries,
	output: {
		filename: '[name].js',
		libraryTarget: 'commonjs',
		path: path.resolve(__dirname, '.webpack')
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
				]
			},
			{
				exclude: /node_modules/,
				test: /\.graphql$/,
				use: [
					{
						loader: 'raw-loader',
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					{loader: 'style-loader'}, 
					{loader: 'typings-for-css-modules-loader', options: {namedExport: true}}
				]
			},
			{
				test: /\.module\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'typings-for-css-modules-loader', options: {modules: true, camelCase: true, namedExport: true}}
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: 'file-loader'
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
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
			'.tsx'
		],
		modules: [
			'node_modules', 
		],
		alias: {
			'@ikhokha/src': srcPath('src'),
			'@ikhokha/test': srcPath('test'),
			'@ikhokha/lib': srcPath('lib'),
			'@ikhokha/cli-tools': srcPath('cli-tools'),
			'@ikhokha/generated': srcPath('generated')
		}
	}
}


