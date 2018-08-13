const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/app.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react']
				}
			}
		},{//css文件处理
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		},{//scss文件处理
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		},{//图片的配置
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'resource/[name].[ext]'
				}
			}]
		},{//字体图标的配置								
			test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'resource/[name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		//处理html文件
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		//提取css文件
		new ExtractTextPlugin('index.css'),
		//提取公共模块
		new webpack.optimize.SplitChunksPlugin({	
			cacheGroups: {
				//打包第三方类库
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: Infinity
				}
			}
		})
	],
	devServer: {
		contentBase: './dist',
		port: 8086
	}
}