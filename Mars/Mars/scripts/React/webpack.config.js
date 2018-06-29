module.exports = {
    mode: 'production',
    context: __dirname,
    entry: { 
        customers: "./Customers.jsx",
        produtcs: "./Products.jsx"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
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