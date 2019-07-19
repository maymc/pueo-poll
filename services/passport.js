const passport = require('passport');
const keys = require('../config/keys.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

// Get access to User model class
const User = mongoose.model('users');

// define a function and pass it to serializeUser. Call serializeUser with the user to generate the identifying piece of info/cookie
// Turn the user argument (user model instance) into a user id to put into the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);    // user.id is the id assigned to the record by mongo
});

//deserilaize, take user id and turn it back into an actual user model
// Take the id (as an argument) and turn it back int the user model instance
// Search over all users in db, then find particular user and call done with that user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

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
  },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);

      //Query - Search through all the records in the User collection and find the record with this specific googleId
      //Asynchronous action, query returns a promise, chain on a .then() which will execute if something was found
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile id, don't need to create and save a new record

          // Call 'done()' to tell passport that we have finished creating the user and that it should resume with the auth process. 'done()' is a function and is part of the callback.
          // First arg = error object, communicates to passport if something went wrong
          // Second arg = user record, tells passport everything went fine, here is the existing user
          done(null, existingUser);
        } else {
          // we don't have this user record with this ID, make a new record
          // Create a new model instance of the User, one record that might exist in the db. Call function 'save()' to save the record to our db
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));    // this 'user' is the same as the new User model isntance but it is from the db.
        }
      });
    }
  )
);