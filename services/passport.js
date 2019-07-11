const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');

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