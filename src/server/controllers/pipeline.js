const _ = require('lodash');
const User = require('../models/User');
const Task = require('../models/Task');
const Document = require('../models/Document');
const Figure = require('../models/Figure');

const STATE_REVIEW = "To Review";
const TYPE_FIGURE = "Figure";
const TYPE_SUBFIGURE = "Subfigure";
const TASK_TYPE = 'Label';

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
  const documentName = req.body.documentName;
  const organization = req.body.organization;
  const groupname = req.body.groupname;

  User.find({ 'organization': organization, 'groups': groupname })
      .sort({ 'numberTasks': 'ascending' })
      .limit(1)
      .exec((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        assignedUser = users[0];
        const task = createLabelingTask(assignedUser._id, assignedUser.username,
                                        documentId, documentName);
        task.save((err1, savedTask) => {
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

function createLabelingTask(userId, username, documentId, docName) {
  return new Task({
    username: username,
    description: docName,
    assignedTo: [username],
    userId: userId,
    status: 'Assigned',
    creationDate: Date.now(),
    startDate: null,
    endDate: null,
    type: TASK_TYPE,
    url: '/label/' + documentId,
  });
}
