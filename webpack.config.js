module.exports = {
	entry:  __dirname + "/resources/assets/app/main.js",
	output: {
		path: __dirname + "/public/app/",
		filename: "bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	}
}