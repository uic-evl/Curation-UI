require('./config/config');

const express = require('express');
const path = require('path');
const _ = require('lodash');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const { ObjectID } = require('mongodb');

const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

const { mongoose } = require('./db/mongoose');
const { TrainingImage } = require('./models/TrainingImage');
const { Modality } = require('./models/Modality');
const bodyParser = require('body-parser');

const app = express();
const port = 3050;

app.use(webpackMiddleware(compiler));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/api/modalities', (req, res) => {
  Modality.find().then(modalities => {
    res.send(modalities);
  }, e => {
    res.status(404).send(e);
  })
});

app.get('/api/training/:previous', (req, res) => {
  const previous = req.params.previous;
  const response = {
    image: null,
    existsPrevious: false,
  }

  if (previous == undefined || previous == null || previous == 0) {
    TrainingImage.find({state: 'to review'}).limit(2).then(images => {
      if (images) {
        response.existsPrevious = images.length === 2;
        response.image = images[0];
      } else {
        console.log("no images to label");
      }
      res.send(response);
    }, e => {
      res.status(404).send(e);
    })
  } else {
    TrainingImage.find({ $or: [{state: 'reviewed'}, {state: 'skipped'}]}).sort({last_update: -1}).then(images => {
      if (previous - 1 < images.length){
        response.existsPrevious = previous < images.length;
        response.image = images[previous - 1];
        res.send(response);
      }
      else
        res.send(null);
    }, e => {
      res.status(404).send(e);
    })
  }
});

app.patch('/api/training/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['modality1', 'modality2', 'modality3', 'modality4', 'observations']);
  body.is_compound = req.body.isCompound;
  body.shared_modality = req.body.sharedModality;
  body.needs_cropping = req.body.needsCropping;
  body.other_modality1 = req.body.newModality1;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  body.last_update = Date.now();
  if (body.modality1 === '') {
    body.state = 'skipped';
  } else {
    body.state = "reviewed";    
  }
  
  TrainingImage.findByIdAndUpdate(id, {$set: body}, {new: true}, (err, image) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(image);
  });
})

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