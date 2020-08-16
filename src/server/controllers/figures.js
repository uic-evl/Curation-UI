const { ObjectID } = require('mongodb');
const Figure = require('../models/Figure');

const STATE_REVIEWED = "Reviewed";
const STATE_SKIPPED = "Skipped";
const STATE_TO_REVIEW = "To Review";

exports.fetchFigures = function (req, res, next) {
    const { state } = req.params;

    Figure.find({ 'state': state },
        (error, figures) => {
            if (error) {
                res.send({
                    error,
                    message: 'Could not retrieve images',
                });
            }

            res.send({
                figures,
                error: null,
                message: 'Retrieved images',
            })
        }
    );
}

exports.searchSubfigures = async function (req, res) {
    // /searchFigures/?state=XX&modalities=mod1,mod2&observations=obs
    let { pageSize, pageNumber } = req.query;
    pageSize = parseInt(pageSize);
    pageNumber = parseInt(pageNumber);

    if (isNaN(pageSize) || isNaN(pageNumber)) {
        res.send({
            message: 'pageSize and pageNumber should be positive integer values',
            error: 'pageSize and pageNumber should be positive integer values',
        })
    }

    const skips = pageSize * (pageNumber - 1)
    const { state, modalities, observations } = req.query;

    const filter = { type: 'Subfigure' };
    if (state !== undefined) {
        filter['state'] = state;
    }
    if (observations !== undefined) {
        filter['observations'] = { $regex: new RegExp(observations, "i") };
    }
    if (modalities !== undefined) {
        let mods = modalities.split(',');
        mods = mods.map(modality => new ObjectID(modality));
        filter['modalities._id'] = { $in: mods };
    }

    const totalSubfigures = await Figure.count(filter);
    const subfigures = await Figure.find(filter).skip(skips).limit(pageSize);
    res.send({
        subfigures: subfigures,
        total: totalSubfigures,
        message: `Retrieved ${subfigures.length} subfigures`,
        error: null,
    });
}