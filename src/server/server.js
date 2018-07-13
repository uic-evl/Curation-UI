require('./config/config');

const express = require('express');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

const { mongoose } = require('./db/mongoose');
const { TrainingImage } = require('./models/TrainingImage');

const app = express();
const port = 3050;

app.use(webpackMiddleware(compiler));

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/test', (req, res) => {
  console.log('test');
  res.end();
});

app.get('/getTrainingData', (req, res) => {
  TrainingImage.find().then(images => {
    res.send(images);
  }, e => {
    res.status(404).send(e);
  })
});

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