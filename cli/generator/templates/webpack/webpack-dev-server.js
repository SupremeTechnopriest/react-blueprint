var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('./dev.config');

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.use(express.static(path.join(__dirname ,'../static')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.listen(3001, 'localhost', err => {
    if (err)
        console.log(err);
    else
        console.log('Development server Listening at http://localhost:3001')
});
