const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');

const path = require('path');
const compiler = webpack(webpackConfig);

const app = express();
const port = 3050;


app.use(webpackMiddleware(compiler));

app.use(express.static(path.resolve(__dirname, '../../dist')));

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

  //resolved = path.resolve(__dirname, '../../dist/index.html');
  //console.log(resolved);
  //res.sendFile(resolved);
});

app.listen(port, () => {
  console.log('Starting curation-ui backend on port ' + port);
});