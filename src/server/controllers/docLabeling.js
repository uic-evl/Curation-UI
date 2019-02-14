const Document = require('../models/Document');
const Figure = require('../models/Figure');

const TYPE_FIGURE = "Figure";
const STATE_REVIEWED = "Reviewed";
const STATE_TO_REVIEW = "To Review";
const STATE_SKIPPED = "Skipped";
const SUCCESS_MESSAGE = 'Subfigure updated successfully!';

exports.fetchDocumentContent = function(req, res, next) {
  const documentId = req.params.id;
  var it = fetchContent(documentId);
  it.next();

  function * fetchContent(documentId) {
    let doc = yield findDocById(documentId);
    let figures = yield findDocFigures(documentId);

    for (let figure of figures) {
      figure.subfigures = yield findSubfigures(figure._id);
    }

    res.send({
      "document": doc,
      "figures": figures,
    });
  }

  function findDocById(id) {
    Document.findById(id, (err, doc) => {
      it.next(doc);
    });
  }

  function findDocFigures(id) {
    Figure.find({ 'docId': id, 'type': TYPE_FIGURE })
      .sort({ 'name': 'ascending' })
      .exec((err, figures) => {
        it.next(figures);
      });
  }

  function findSubfigures(figureId) {
    Figure.find({ 'figureId': figureId })
      .sort({ 'name': 'ascending' })
      .exec((err, subfigures) => {
        it.next(subfigures);
      })
  }
}

exports.updateSubfigure = function(req, res, next) {
  const id = req.body.id;
  const values = req.body.values;

  Figure.findById(id, (err, subfigure) => {
    if (err) res.send({error: 'Figure not found'});

    // check if it is due to skipping
    if (values.state && values.state == STATE_SKIPPED) {
      subfigure.state = STATE_SKIPPED;
    } else {
      subfigure.modality1 = values.modality1;
      subfigure.modality2 = values.modality2;
      subfigure.modality3 = values.modality3;
      subfigure.modality4 = values.modality4;
      subfigure.needsCropping = values.needsCropping;
      subfigure.isCompound = values.isCompound;
      subfigure.observations = values.observations;
      subfigure.state = STATE_REVIEWED;
    }

    subfigure.save((err2, savedSubfigure) => {
      console.log(savedSubfigure);
      if (err2) res.send({error: 'Error updating the figure'});
      // now check if all the subfigures have been reviewed
      Figure.find({ 'figureId': savedSubfigure.figureId, 'state': STATE_TO_REVIEW },
        (err3, subfigures) => {
          if (err3) res.send({error: 'Error retrieving the subimages' });
          if (subfigures.length == 0) {
            // update the figure state to Reviewed
            Figure.findById(savedSubfigure.figureId, (err4, figure) => {
              if (err4) res.send({error: 'Error retrieving the main figure' });
              if (figure.state == STATE_TO_REVIEW) {
                figure.state = STATE_REVIEWED;
                figure.save((err5, savedFigure) => {
                  res.send({
                    'savedSubfigure': savedSubfigure,
                    'figure': savedFigure
                  });
                });
              } else {
                res.send({
                  'savedSubfigure': savedSubfigure,
                  'figure': null
                });
              }
            });
          } else {
            res.send({
              'savedSubfigure': savedSubfigure,
              'figure': null
            });
          };
        });
    })

  })
}
