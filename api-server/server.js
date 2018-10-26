//** This is the back-end for the project 'example-restapi-client' **//
//** This server handles requests from client for data stored in mLab **//

// Imports
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load(); // For loading local .env files
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Setup CORS
const cors = require('cors');
const hostUrl = process.env.CLIENT || 'http://localhost:4200';
const corsOptions = {
  origin: hostUrl,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Connecting to the database -> initialize new data
// **Note - You must whitelist your back-end's IP address in Mongo Atlas. There are 2 ways to do this for Heroku:
// **(1) Install the Heroku addon Fixie Socks (https://elements.heroku.com/addons/fixie-socks)
// **(2) Set 0.0.0.0 as IP (will allow any connection to access db)
const dbConfig = require('./app/config/mongodb.config.js');
dbConfig.connectToDB( function( err ) {
  const comments = require('./app/controllers/comment.controller.js');
  // Perform actions on the collection object
  comments.initial();
  // Add routes
  require('./app/routes/comment.routes.js')(app);
});

// Set server ports/host
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080; // listen on default Heroku port
// Create a Server
const server = app.listen(port, function () {
  // Server has started!
  console.log("App listening at http://", host, ':', port);
});