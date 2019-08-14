// Express Application

// NodeJS only has access to common JS modules, use 'require' to access them
const express = require('express');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');    // enable use of cookies
const passport = require('passport');   // tell passport to make use of cookies
const bodyParser = require('body-parser'); //body parsing middleware (middleware is wired up to express by the app.use call)
const mongoose = require('mongoose');
require('./models/User.js');    // require in the User model instance
require('./services/passport.js');

// Instruct mongoose to connect to copy of mongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

/* In a single nodeJS proj, there may be several diff express applications, this represents a running express app. Most projects will use a single application */
const app = express();

//middleware will parse the body and then assign it to req.body property of the incoming request object
app.use(bodyParser.json());

app.use(
  cookieSession({
    /* Configuration object properties
        - maxAge: how long the cookie will last before expiring (days*hrs*minutes*secs*miliseconds)
        - keys: encrypts the cookie, we can specify multiple keys in the array and it will just pick a random key for additional security
    */
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// Instruct passport to make use of cookies for auth
app.use(passport.initialize());
app.use(passport.session());

/* When we require the authRoutes file, it returns a function
  - Then we call the function immediately with the app object. 
  - Immediately invokes/calls the function we just required in.
*/
require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

//make sure express behaves currently when in the production environment
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets like main.js or main.css
  //If any get request for some route that we don't understand the route, then look into the client/build directory and see if there is some file in the directory that matches up with what the request is looking for and if so, respond with that file
  app.use(express.static('client/build'));

  //Express will serve up the index.html file if it doesn't recognize the route
  //if someone makes a request that we don't understand then serve up index.html
  //This is 2nd option because of order of operations, the "catch all" option
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/* Instructs express to tell node (the runtime) to listen to PORT
    - Whenever Heroku runs our application, Heroku has ability to inject environment variables. Environemnet vairables are variables that are set in underlying runtime that node is running on top of. Heroku's opportunity to pass us runtime configurations that Heroku only wants to tell us only after it has deployed the application
    - If running in production then can use 'process.env.PORT'
    - If running in development, it might not be defined so add a boolean variable
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);