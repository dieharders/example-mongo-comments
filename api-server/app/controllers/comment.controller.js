//** Functions for MongoDB **//

// Import comment construction model
const Comment = require('../models/comment.model.js');
// Get database connection
const dbConfig = require('../config/mongodb.config.js');
const database = dbConfig.getConn();
// Database 'collection' we want documents from
const collection = database.db("comments").collection("comments");

// Overwrite all documents in collection w/ default data
exports.initial = () => {
    // Delete all data in db (by passing empty {} in the filter parameter)
    collection.deleteMany( {}, function(err, data) {
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

                collection.insertOne(comment, function(err, res) {
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
    // Lookup array of emoji avatars
    let emojis = ['😄', '😀', '🤣', '😂', '😉', '🤢', '😎', '😋', '🤩', '🤐', '😴', '😱', '😭', '🤑', '🤔', '😡', '😺', '👽', '👻'];

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
        // Assign random name
        let firstNames = ['Joe', 'Sarah', 'Sasha', 'Checkov', 'Charlie', 'Ouchey', 'Hamilton', 'Foster'];
        let lastNames = ['Nurbs', 'Patsy', 'Dolas', 'Checkpoin', 'Jackpot', 'Janeyway', 'Dallas', 'Curtsey'];
        let randNumX = Math.floor(Math.random() * (firstNames.length-1) );
        let randNumY = Math.floor(Math.random() * (lastNames.length-1) );
        comment.name = firstNames[randNumX] + ' ' + lastNames[randNumY];
        // Assign random emoji avatar to comment
        let randNum = Math.floor(Math.random() * (emojis.length-1) ); // get random emoji
        comment.avatar = emojis[randNum]; // assign emoji to comment
        // Set properties
        comment.timestamp = Date.now();
        // Save
        collection.insertOne(comment, function(err, comment) {
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
    // Return all documents in collection (by passing an empty {} in query parameter)
    // **Must convert the returned data to array, otherwise a circular JSON error occurs,
    // b/c the returned data is actually a cursor not the document itself.
    collection.find({}).toArray(function(err, data) {
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
    collection.findOne( {"_id" : req.params.commentId}, function(err, comment) {
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
// UPDATE a Comment (increment the 'likes')
exports.update = (req, res) => {
    // Data passed from client-side form
    const comment = new Comment(req.body);
    console.log('current likes ' + comment.likes);
    // Increment 'likes'
    comment.likes += 1;
    
    // Validate there is json data
    // If empty properties, send error response
    if (!comment) {
        res.status(400).json({
            error: "Invalid Data Submission"
        });
    // Otherwise OK, so save data
    } else {
        collection.updateOne( {"_id" : req.body._id}, { $set : {"likes":comment.likes} }, function(err, result) {
            // Something went wrong, return error
            if(err) {
                return res.status(500).json({
                    msg: "Error updating comment with id " + req.body._id
                });
            }
            // Success! Return updated object
            console.log('Success. New profile saved: ' + JSON.stringify(this.comment));
            res.json(this.comment);
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
        collection.deleteOne( {"_id" : req.params.commentId}, function(err, comment) {
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