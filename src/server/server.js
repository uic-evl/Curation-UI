require('./config/config');

const express = require('express');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');

// Webpack configuration
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

const router = require('./router');
const { mongoose } = require('./db/mongoose');

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

app.listen(port, () => {
  console.log('Starting curation-ui backend on port ' + port);
});
