module.exports = {

    entry: {
        'app': './src/main.ts',
        'vendor': './src/vendor.ts',
        'polyfills': './src/polyfills.ts',
    },

    output: {
        // Here we can specify the output
        path: "/dist/",
        filename: "[name].bundle.js"
    },

    resolve: {
    //    extensions: // mention the extensions webpack should take care of
    },

    module: {
        rules: [
            // tell webpack HOW to react when a file is included in your application
        ]
    },

    plugins: [
		// finetune the behaviour of specific plugins
    ]
}; 

