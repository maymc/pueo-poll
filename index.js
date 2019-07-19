//Express Application

// NodeJS only has access to common JS modules, need to use 'require' to access them
const express = require('express');
const keys = require('./config/keys.js');

const mongoose = require('mongoose');
require('./models/User.js');
require('./services/passport.js');

// Instruct mongoose to connect to copy of mongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// In a single nodeJS proj, there may be several diff express applications, this represents a running express app. Most projects will use a single application.
const app = express();

/* When we require the authRoutes file, it returns a function
  - Then we call the function immediately with the app object. 
  - Immediately invokes/calls the function we just required in.
*/
require('./routes/authRoutes.js')(app);

/* Instructs express to tell node (the runtime) to listen to PORT
    - Whenever Heroku runs our application, Heroku has ability to inject environment variables. Environemnet vairables are variables that are set in underlying runtime that node is running on top of. Heroku's opportunity to pass us runtime configurations that Heroku only wants to tell us only after it has deployed the application
    - If running in production then can use 'process.env.PORT'
    - If running in development, it might not be defined so add a boolean variable
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);