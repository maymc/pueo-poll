//Express Application

// NodeJS only has access to common JS modules, need to use 'require' to access them
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');

// In a single nodeJS proj, there may be several diff express applications, this represents a running express app. Most projects will use a single application.
const app = express();

/* Tell passport library how to make use of GoogleStrategy in the application
    - Creates a new instance of GoogleStrategy. We will pass in a configuration that tells this GoogleStrategy how to authenticate users in this application
    - passport.use is like a generic register, i want you to be aware that there is a new strategy available, use it, and understand users can use this to authenticate themselves in this application
*/

// There 3 options to add to this object
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);
    console.log("profile: ", profile);
  })
);

// App object - used to setup configurations that will listen for incoming requests that is being routed to the express side from the node side. Then it is routed to different route handlers. Handlers are associated/registered to app object.

// Route handlers - associate with a given route

/* When user comes to this route, we want to kick them into oauth flow which is managed by passport. Have passport try to authernticate the user coming in on this route and use strategy google. Passport has an internal identifier that knows it is 'google'
- options Object, scope specifies what access we want to have inside this user's profile. Google internally has a scope list of what we can request for.
*/
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

/* Instructs express to tell node (the runtime) to listen to PORT
    - Whenever Heroku runs our application, Heroku has ability to inject environment variables. Environemnet vairables are variables that are set in underlying runtime that node is running on top of. Heroku's opportunity to pass us runtime configurations that Heroku only wants to tell us only after it has deployed the application
    - If running in production then can use 'process.env.PORT'
    - If running in development, it might not be defined so add a boolean variable
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);