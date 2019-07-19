const passport = require('passport');
const keys = require('../config/keys.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

// Get access to User model class
const User = mongoose.model('users');

/* serializeUser function: 'user' argument (user model instance) - generate the identifyling piece of info (user id) for the cookie */
passport.serializeUser((user, done) => {
  done(null, user.id);    // user.id is the id assigned to the record by mongo
});

/* deserializeUser function: Turn 'user.id' back into an actual User model
  - 'id' (argument)
  - findById: search over all users in DB and find particular user with this id and call 'done)()' with that user */
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

/* Tell passport library how to make use of GoogleStrategy in the application
    - Creates a new instance of GoogleStrategy. We will pass in a configuration that tells this GoogleStrategy how to authenticate users in this application
    - passport.use is like a generic register, i want you to be aware that there is a new strategy available, use it, and understand users can use this to authenticate themselves in this application
    - There 3 options to add to this object
*/
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);

      /* findOne: Search through all User collection records and find the record with this specific googleId
          - Asynchronous action: query returns a promise, chain on a '.then()' which will execute if something was found */
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        // If record with given profile id exists, don't create and save a new record
        if (existingUser) {
          /* 'done()' function (part of callback): tells passport that we finished creating the user and it should resume the auth process
            - First arg: error object, communicates to passport if something went wrong
            - Second arg = user record, tells passport everything went fine, here is the existing user
          */
          done(null, existingUser);
        }
        // If record with profile id does NOT exist, make a new record
        else {
          /* Create a new model instance of the User, one record that might exist in the db. 
              - 'save()' function: saves the record to the DB
          */
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));    // this 'user' is the same as the new User model isntance but it is from the db.
        }
      });
    }
  )
);