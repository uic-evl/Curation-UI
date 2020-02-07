const { ObjectID } = require('mongodb');
const Figure = require('../models/Figure');

const STATE_REVIEWED = "Reviewed";
const STATE_SKIPPED = "Skipped";
const STATE_TO_REVIEW = "To Review";

exports.fetchFigures = function(req, res, next) {
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
