module.exports = function(app) {
    const comments = require('../controllers/comment.controller.js');

    // Initialize default data into MongoDB
    app.get('/api/conn', comments.initial );
    
    // Create a new Comment
    app.post('/api/comments', comments.create );
 
    // Retrieve all Comment
    app.get('/api/comments', comments.findAll );
 
    // Retrieve a single Comment by Id
    app.get('/api/comments/:commentId', comments.findOne );
 
    // Update a Comment with Id
    app.put('/api/comments', comments.update );
 
    // Delete a Comment with Id
    app.delete('/api/comments/:commentId', comments.delete );
}