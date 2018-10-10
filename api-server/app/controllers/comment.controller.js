const dbConfig = require('../config/mongodb.config.js');
const mongojs = require('mongojs');
const db = mongojs(dbConfig.url, ['comments']); // Database 'collection' we want documents from

//** Functions for MongoDB **//
const Comment = require('../models/comment.model.js');

// Overwrite w/ default data
exports.initial = () => {
    // Delete all data in db
    db.comments.remove( {data: null}, function(err, data) {
        // Return error if something fucks up
        if(err) {
            console.log(err);
        } else {
            // Otherwise return content from db query
            console.log('All DB data removed! ' + JSON.stringify(data) );

            // Initialize new data
            const comments = require('./initial.comments.js');
            console.log(comments);
            
            // Save to MongoDB.
            // This will overwrite current database w/ default values above
            // each time this server is spun up.
            for (let i = 0; i < comments.length; i++) { 
                const comment = comments[i];

                db.comments.save(comment, function(err, res) {
                    // Something went wrong, return error
                    if(err) {
                        console.log(err);
                    } else {
                        // Success! Return json data we sent
                        console.log('Success. New profile saved: '+JSON.stringify(res));

                        if (i === comments.length-1) {
                            console.log(">>> Done - Initial Data!");
                            return null;
                        };
                    }
                });
            }
        }
    });
}

// POST a Comment
exports.create = (req, res) => {
    // Data passed from client-side form
    const comment = new Comment(req.body);
    // Validate there is json data
    // If empty properties, send error response
    if (!comment) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    // Otherwise OK, so save data
    } else {
        db.comments.save(comment, function(err, comment) {
            // Something went wrong, return error
            if(err) {
                res.send(err);
            }
            // Success! Return json data we sent
            console.log('Success. New comment added: '+JSON.stringify(comment));
            res.json(comment);
        });
    }
};
// FETCH all Comments
exports.findAll = (req, res) => {
    // Return all documents in 'tasks' collection from db.tasks
    db.comments.find(function(err, data) {
        // Send back error if something fucks up
        if(err) {
            res.send(err);
        }
        // Otherwise send back content from db query
        res.json(data);
    });
};

// FIND a Comment
exports.findOne = (req, res) => {
    // Return one element using a document's id
    db.comments.findOne( {_id: mongojs.ObjectId(req.params.commentId)}, function(err, comment) {
        // Return error if something fucks up
        if(err) {
            console.log('Error retrieving comment');
            return res.status(404).json({
                msg: "Error retrieving comment: " + err
            });
        } else if (comment === null) {
            console.log('Error retrieving comment');
            return res.status(404).json({
                msg: "Error retrieving comment!"
            });
        }
        // Otherwise return content from db query
        res.json(comment);
    });
};
// UPDATE a Comment
exports.update = (req, res) => {
    // Data passed from client-side form
    const comment = new Comment(req.body);
    
    // Validate there is json data
    // If empty properties, send error response
    if (!comment) {
        res.status(400).json({
            error: "Invalid Data Submission"
        });
    // Otherwise OK, so save data
    } else {
        db.comments.update( {_id: mongojs.ObjectId(req.body._id)}, comment, function(err, comment) {
            // Something went wrong, return error
            if(err) {
                return res.status(500).json({
                    msg: "Error updating comment with id " + req.body._id
                });
            }
            // Success! Return json data we sent
            console.log('Success. New profile saved: ' + JSON.stringify(comment));
            res.json(comment);
        });
    }
};
// DELETE a Comment
exports.delete = (req, res) => {
    // Validate there is json data
    // If empty properties, send error response
    if(req.params.commentId === null) {
        res.status(400);
        res.json({
            "error": "No id specified"
        });
    // Otherwise OK, so remove data
    } else {
        // Remove one element using a document's id
        db.comments.remove( {_id: mongojs.ObjectId(req.params.commentId)}, function(err, comment) {
            // Return error if something fucks up
            if(err) {
                res.send(err);
            }
            // Otherwise return content from db query
            console.log('Profile '+req.params.commentId+' removed!');
            res.json(comment);
        });
    }
};