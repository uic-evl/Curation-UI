const Document = require("../models/Document");
const Figure = require("../models/Figure");

const TYPE_FIGURE = "Figure";
const STATE_REVIEWED = "Reviewed";
const STATE_TO_REVIEW = "To Review";
const STATE_SKIPPED = "Skipped";
const SUCCESS_MESSAGE = "Subfigure updated successfully!";

exports.fetchDocumentContent = function (req, res, next) {
  const documentId = req.params.id;
  const it = fetchContent(documentId);
  it.next();

  function* fetchContent(documentId) {
    const doc = yield findDocById(documentId);
    const figures = yield findDocFigures(documentId);

    for (const figure of figures) {
      figure.subfigures = yield findSubfigures(figure._id);
    }

    res.send({
      document: doc,
      figures,
    });
  }

  function findDocById(id) {
    Document.findById(id, (err, doc) => {
      it.next(doc);
    });
  }

  function findDocFigures(id) {
    Figure.find({ docId: id, type: TYPE_FIGURE })
      .sort({ name: "ascending" })
      .exec((err, figures) => {
        it.next(figures);
      });
  }

  function findSubfigures(figureId) {
    Figure.find({ figureId })
      .sort({ name: "ascending" })
      .exec((err, subfigures) => {
        it.next(subfigures);
      });
  }
};

exports.updateSubfigure = function (req, res, next) {
  const { id } = req.body;
  const { values } = req.body;

  Figure.findById(id, (err, subfigure) => {
    if (err) res.send({ error: "Figure not found" });

    // check if it is due to skipping
    if (values.state && values.state == STATE_SKIPPED) {
      subfigure.state = STATE_SKIPPED;
    } else {
      subfigure.modalities = values.modalities;
      subfigure.needsCropping = values.needsCropping;
      subfigure.isCompound = values.isCompound;
      subfigure.observations = values.observations;
      subfigure.isOvercropped = values.isOvercropped;
      subfigure.isMissingSubfigures = values.isMissingSubfigures;
      subfigure.numberSubpanes = values.numberSubpanes;
      subfigure.closeUp = values.closeUp;
      subfigure.isOverfragmented = values.isOverfragmented;
      subfigure.state = STATE_REVIEWED;
      subfigure.composition = values.composition;
    }

    subfigure.save((err2, savedSubfigure) => {
      console.log(savedSubfigure);
      if (err2) res.send({ error: "Error updating the figure" });
      // now check if all the subfigures have been reviewed
      Figure.find(
        { figureId: savedSubfigure.figureId, state: STATE_TO_REVIEW },
        (err3, subfigures) => {
          if (err3) res.send({ error: "Error retrieving the subimages" });
          if (subfigures.length == 0) {
            // update the figure state to Reviewed
            Figure.findById(savedSubfigure.figureId, (err4, figure) => {
              if (err4) res.send({ error: "Error retrieving the main figure" });
              if (figure.state == STATE_TO_REVIEW) {
                figure.state = STATE_REVIEWED;
                figure.save((err5, savedFigure) => {
                  res.send({
                    savedSubfigure,
                    figure: savedFigure,
                  });
                });
              } else {
                res.send({
                  savedSubfigure,
                  figure: null,
                });
              }
            });
          } else {
            res.send({
              savedSubfigure,
              figure: null,
            });
          }
        }
      );
    });
  });
};

exports.updateAllSubfigures = function (req, res, next) {
  const { figureId } = req.body;
  const { values } = req.body;
  const { subfigureId } = req.body;

  console.log(figureId);
  console.log(values);

  Figure.updateMany(
    {
      figureId,
      type: "Subfigure",
    },
    {
      $set: {
        modalities: values.modalities,
        state: STATE_REVIEWED,
      },
    },
    (err, modInfo) => {
      if (err) res.send({ error: "Error updating the images" });
      // Now update the main Figure
      Figure.findById(figureId, (err2, figure) => {
        if (err2) res.send({ error: "Error retrieving the main figure" });
        figure.state = STATE_REVIEWED;
        figure.save((err3, savedFigure) => {
          if (err3) res.send({ error: "Error update the main figure" });
          // retrieve all the updated subfigures
          Figure.find({ figureId: savedFigure._id }, (err4, subfigures) => {
            if (err4) res.send({ error: "Error retrieving subfigures" });
            res.send({
              figure: savedFigure,
              subfigures,
              selectedSubfigureId: subfigureId,
            });
          });
        });
      });
    }
  );
};

exports.markFigureMissingPanels = function (req, res, next) {
  const { id } = req.body;
  const { isMissingPanels } = req.body;

  Figure.findById(id, (err, figure) => {
    if (err) res.send({ error: "Error retrieving the figure" });

    figure.isMissingPanels = isMissingPanels;
    figure.save((err2, savedFigure) => {
      if (err2) res.send({ error: "Error saving the figure" });
      res.send({
        selectedFigure: savedFigure,
        message: "Figure updated",
      });
    });
  });
};
