module.exports = {
    runtimeCompiler: true,

    pwa: {
        name: 'Agileffy',
    },

    assetsDir: 'static',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://agileffy.info:443/',
                changeOrigin: true,
                ws: true,
                secure: true,
                pathRewrite: {
                    '^/api': '/api',
                },
            },
        },
    },
};
