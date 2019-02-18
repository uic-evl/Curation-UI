require('./config/config');

const express = require('express');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const https = require("https");
const fs = require("fs");

// Webpack configuration
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

const router = require('./router');
const { mongoose } = require('./db/mongoose');

// SSL Certificate
var privateKey = fs.readFileSync(process.env.PK, 'utf8');
var certificate = fs.readFileSync(process.env.CRT, 'utf8');
var ca = fs.readFileSync(process.env.CA).toString();
var credentials = {key: privateKey, cert: certificate, ca:ca};

// Server Setup
const app = express();
const port = process.env.PORT || 3050;

// App Setup
app.use(webpackMiddleware(compiler));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../../dist')));
router(app);

app.get('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
  console.log('Starting curation-ui backend on port ' + port);
})

/*
app.listen(port, () => {
  console.log('Starting curation-ui backend on port ' + port);
});
*/
