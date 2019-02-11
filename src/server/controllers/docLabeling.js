const Document = require('../models/Document');
const Figure = require('../models/Figure');

const TYPE_FIGURE = "Figure";

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
