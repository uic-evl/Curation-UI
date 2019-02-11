const _ = require('lodash');
const User = require('../models/User');
const Document = require('../models/Document');
const Figure = require('../models/Figure');

const STATE_REVIEW = "To Review";
const TYPE_FIGURE = "Figure";
const TYPE_SUBFIGURE = "Subfigure";

exports.insertFromPipe = function(req, res, next) {
  const input = req.body.document;
  var it = insertFromPipe(input);
  it.next();

  function *insertFromPipe(input) {
    try {
      let createdDoc = yield saveDocument(input);
      // throw new Error('whoopsie!');

      let figures = input.figures;
      for (let figure of figures) {
        let createdFigure = yield saveFigure(figure, createdDoc._id);

        let subfigures = figure.subfigures;
        for (let subfigure of subfigures) {
          let createdSubfigure = yield saveSubfigure(subfigure, createdDoc._id, createdFigure._id);
          console.log(createdSubfigure);
        }
      };

      res.send({error: null});
    } catch (err) {
      console.log("catching whoopsie here");
      console.log(err);
      res.status(500).send(err);
    }
  }

  function saveDocument(input) {
    const doc = new Document({
      name: input.name,
      pubmedId: input.pubmedId,
      entityId: input.entityId,
    });
    doc.save((err, createdDoc) => {
      console.log(err)
      it.next(createdDoc);
    })
  }

  function saveFigure(figure, savedDocId) {
    const newFigure = new Figure({
      name: figure.name,
      type: TYPE_FIGURE,
      state: STATE_REVIEW,
      docId: savedDocId,
      uri: figure.uri,
      caption: figure.caption
    });
    newFigure.save((err, createdFigure) => {
      console.log(err)
      it.next(createdFigure);
    })
  }

  function saveSubfigure(subfigure, savedDocId, savedFigureId) {
    const newSubfigure = new Figure({
      name: subfigure.name,
      type: TYPE_SUBFIGURE,
      state: STATE_REVIEW,
      docId: savedDocId,
      figureId: savedFigureId,
      uri: subfigure.uri,
    });

    newSubfigure.save((err, createdSubfigure) => {
      console.log(err)
      it.next(createdSubfigure);
    })
  }
}

exports.sendPipeTask = function(req, res, next) {
  const documentId = req.body.documentId;
  const organization = req.body.organization;
  const groupname = req.body.groupname;

  User.find({ 'organization': organization, 'groups': group })
      .sort({ 'numberTasks': 'ascending' })
      .limit(1)
      .exec((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        console.log(users);
        assignedUser = users[0];
        const task = createLabelingTask(assignedUser._id, assignedUser.username, documentId);
        task.save((err, savedTask) => {
          if (err1) {
            console.log(err1);
            res.status(500).send(err1);
          }
          assignedUser.numberTasks = assignedUser.numberTasks + 1;
          assignedUser.save((err2, savedUser) => {
            if (err2) {
              console.log(err2);
              res.status(500).send(err2);
            }
            res.send(task);
          });
        });
      });
}

function createLabelingTask(userId, username, documentId) {
  return new Task({
    username: username,
    assignedTo: [username],
    userId: userId,
    status: 'Assigned',
    creationDate: Date.now(),
    startDate: null,
    endDate: null,
    type: 'Label',
    url: '/label/' + documentId,
  });
}
