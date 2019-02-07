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
      throw new Error('whoopsie!');

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
      res.status(400).send(err);
    }
  }

  function saveDocument(input) {
    const doc = new Document({
      name: input.name,
      pubmedId: input.pubmedId,
      entityId: input.entityId,
    });
    doc.save((err, createdDoc) => {
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
    });
    newFigure.save((err, createdFigure) => {
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
      it.next(createdSubfigure);
    })
  }
}

exports.sendPipeTask = function(req, res, next) {

}
