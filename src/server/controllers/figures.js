/*eslint-disable*/
const { ObjectID } = require("mongodb");
const Figure = require("../models/Figure");
const Task = require("../models/Task");

const STATE_REVIEWED = "Reviewed";
const STATE_SKIPPED = "Skipped";
const STATE_TO_REVIEW = "To Review";

exports.fetchFigures = function (req, res, next) {
  const { state } = req.params;

  Figure.find({ state: state }, (error, figures) => {
    if (error) {
      res.send({
        error,
        message: "Could not retrieve images",
      });
    }

    res.send({
      figures,
      error: null,
      message: "Retrieved images",
    });
  });
};

exports.searchSubfigures = async function (req, res) {
  // /searchFigures/?state=XX&modalities=mod1,mod2&observations=obs
  let { pageSize, pageNumber } = req.query;
  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);

  if (isNaN(pageSize) || isNaN(pageNumber)) {
    res.send({
      message: "pageSize and pageNumber should be positive integer values",
      error: "pageSize and pageNumber should be positive integer values",
    });
  }

  const skips = pageSize * (pageNumber - 1);
  const { state, modalities, observations, additional, username } = req.query;

  const filter = { type: "Subfigure" };
  if (state !== undefined) {
    filter["state"] = state;
  }
  if (username !== undefined) {
    filter["username"] = username;
  }
  if (observations !== undefined) {
    filter["observations"] = { $regex: new RegExp(observations, "i") };
  }
  if (modalities !== undefined) {
    let mods = modalities.split(",");
    mods = mods.map((modality) => new ObjectID(modality));
    filter["modalities._id"] = { $in: mods };
  }
  if (additional !== undefined) {
    const additionalObs = additional.split(",");
    if (additionalObs.length > 0) {
      if (additionalObs.includes("isCompound")) {
        filter["isCompound"] = true;
      }
      if (additionalObs.includes("isOvercropped")) {
        filter["isOvercropped"] = true;
      }
      if (additionalObs.includes("needsCropping")) {
        filter["needsCropping"] = true;
      }
      if (additionalObs.includes("closeUp")) {
        filter["closeUp"] = true;
      }
      if (additionalObs.includes("isOverfragmented")) {
        filter["isOverfragmented"] = true;
      }
      if (additionalObs.includes("flag")) {
        filter["flag"] = true;
      }
    }
  }

  const totalSubfigures = await Figure.count(filter);
  const subfigures = await Figure.find(filter).skip(skips).limit(pageSize);
  res.send({
    subfigures: subfigures,
    total: totalSubfigures,
    message: `Retrieved ${subfigures.length} subfigures`,
    error: null,
  });
};

exports.flag = async function (req, res) {
  const id = req.params.id;
  const flag = req.body.flag;

  const figure = await Figure.findById(id);
  figure["flag"] = flag;

  try {
    const savedFigure = await figure.save();
    res.send({
      figure: savedFigure,
      error: null,
    });
  } catch (error) {
    res.send({
      error,
    });
  }
};

exports.getTaskUrl = async function (req, res) {
  const id = req.params.id;
  const figure = await Figure.findById(id);
  const task = await Task.findOne({ documentId: ObjectID(figure.docId) });

  taskLabelingUrl = `${task["url"]}/${task._id}`;
  res.send({
    url: taskLabelingUrl,
  });
};

exports.updateModalities = async function (req, res) {
  const { subfigures } = req.body;
  console.log(subfigures);

  for (const el of subfigures) {
    const modalities = el.modalities.map((m) => ({
      _id: typeof m === "string" ? ObjectID(m) : ObjectID(m._id),
    }));
    console.log(modalities);
    subfigure = await Figure.findById(ObjectID(el._id));
    subfigure.modalities = modalities;
    await subfigure.save();
  }

  res.send({ message: "success" });
};

exports.countReviewed = async function (req, res) {
  try {
    const counts = await Figure.aggregate([
      {
        $match: {
          type: "Subfigure",
          state: "Reviewed",
        },
      },
      {
        $unwind: {
          path: "$modalities",
        },
      },
      {
        $group: {
          _id: {
            modality: "$modalities._id",
            state: "$state",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "modalities",
          localField: "_id.modality",
          foreignField: "_id",
          as: "modality",
        },
      },
      {
        $unwind: {
          path: "$modality",
        },
      },
    ]);
    res.send({ counts, error: null });
  } catch (error) {
    console.log("error here");
    console.log(error);
    res.send({ counts: null, error });
  }
};
