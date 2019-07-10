//Express Application

// NodeJS only has access to common JS modules, need to use 'require' to access them
const express = require('express');   //Get access to 'express' library

// In a single nodeJS proj, there may be several diff express applications, this represents a running express app
// Most projects will use a single application
const app = express();


// App object - used to setup configurations that will listen for incoming requests that is being routed to the express side from the node side. Then it is routed to different route handlers. Handlers are associated/registered to app object.


// Route handlers - associate with a given route
// app - This represents underlying express server. Express App to register this route handler with
// get - tells express to watch for incoming HTTP requests with this specifc method. Methods indicate what the request is trying to accomplish (GET, POST, PUT, DELETE< PATCH) MEthods are associated with some intent
// '/' - route portion of the express handler
// req - request - object representing the incoming request, JS object
// res - response - object representing the outgoing response
// res.send - immediately send some JSON back to whoever made the request

app.get('/', (req, res) => {
  res.send({ bye: 'buddyyyy' });
});


// Instructs express to tell node (the runtime) to listen to PORT
// Whenever Heroku runs our application, Heroku has ability to inject environment variables. Environemnet vairables are variables that are set in underlying runtime that node is running on top of. Heroku's opportunity to pass us runtime configurations that Heroku only wants to tell us only after it has deployed the application
// If running in production then can use 'process.env.PORT'
// If running in development, it might not be defined so add a boolean variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);