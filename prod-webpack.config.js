const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')({
    bundles: {
        'GeoTour': path.join(__dirname, "js", "app"),
        'GeoTour-embedded': path.join(__dirname, "js", "embedded"),
        'GeoTour-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geostory-embedded': path.join(__dirname, "js", "geostoryEmbedded"),
        "dashboard-embedded": path.join(__dirname, "js", "dashboardEmbedded")
    },
    themeEntries: {"themes/default": path.join(__dirname, "themes", "geo-theme", "theme.less")},
    paths,
    plugins: [extractThemesPlugin, ModuleFederationPlugin],
    prod: true,
    publicPath: undefined,
    cssPrefix: '.GeoTour',
    prodPlugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['GeoTour'],
            publicPath: 'dist/',
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['GeoTour-embedded'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['GeoTour-api'],
            publicPath: 'dist/',
            inject: 'body',
            hash: true,
            filename: 'api.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'geostory-embedded-template.html'),
            chunks: ['geostory-embedded'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dashboard-embedded-template.html'),
            chunks: ['dashboard-embedded'],
            publicPath: 'dist/',
            inject: 'body',
            hash: true,
            filename: 'dashboard-embedded.html'
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
