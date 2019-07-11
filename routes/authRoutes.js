const passport = require('passport');

// Exporting a function from this file and assume we will call this function with our express app object. Add app as argument to the function.
module.exports = (app) => {
  // App object - an express object used to setup configurations that will listen for incoming requests that is being routed to the express side from the node side. Then it is routed to different route handlers. Handlers are associated/registered to app object.

  // Route handlers - associate with a given route

  /* When user comes to this route, we want to kick them into OAuth flow which is managed by passport. Have passport try to authernticate the user coming in on this route and use strategy google. Passport has an internal identifier that knows it is 'google'
  - Options object, scope specifies what access we want to have inside this user's profile. Google internally has a scope list of what we can request for.
  */
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));

}
