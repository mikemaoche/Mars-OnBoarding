module.exports = {
    mode: 'production',
    context: __dirname,
    entry: "./Customers.jsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    watch: true,
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            }
        }]
    }
}