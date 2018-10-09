module.exports = function(app) {
 
    const customers = require('../controllers/customer.controller.js');

    // Initialize default data into MongoDB
    app.get('/api/conn', customers.initial);
    
    // Create a new Customer
    app.post('/api/comments', customers.create);
 
    // Retrieve all Customer
    app.get('/api/comments', customers.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/comments/:commentId', customers.findOne);
 
    // Update a Customer with Id
    app.put('/api/comments', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/comments/:commentId', customers.delete);
}