//** This is the back-end for the project 'example-restapi-client' **//
//** This server handles requests from client for non-persistent data stored locally (no external DB) **//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

/*
// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Customer = require('./app/models/customer.model.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to MongoDB.");    

    Customer.remove({}, function(err) { 

       if(err){
          console.log(err);
          process.exit();
       }
       
       console.log('Customer collection removed');
       // -> initial new data
       initial();
    });

}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});
*/

// Setup CORS
const cors = require('cors');
const hostUrl = process.env.CLIENT || 'http://localhost:4200';
const corsOptions = {
  origin: hostUrl,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Add routes
require('./app/routes/customer.routes.js')(app);

// Set server ports/host
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080; // listen on default Heroku port
// Create a Server
const server = app.listen(port, function () {
  // Server has started!
  console.log("App listening at http://", host, ':', port);
});

function initial(){
    /*
    let customers = [
      {
        firstname: "Joe",
        lastname: "Thomas",
        age: 36
      },
      {
        firstname: "Peter",
        lastname: "Smith",
        age: 18
      },
      {
        firstname: "Lauren",
        lastname: "Taylor",
        age: 31
      },
      {
        firstname: "Mary",
        lastname: "Taylor",
        age: 24
      },
      {
        firstname: "David",
        lastname: "Moore",
        age: 25
      },
      {
        firstname: "Holly",
        lastname: "Davies",
        age: 27
      },
      {
        firstname: "Michael",
        lastname: "Brown",
        age: 45
      }
    ]
   
    // Init data -> save to MongoDB
    for (let i = 0; i < customers.length; i++) { 
        const customer = new Customer(customers[i]);
        customer.save();
    }
    */

    console.log(">>> Done - Initial Data!");
}