const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js');


module.exports = app => {

  //Not invoking requireLogin immediately, only when route /api/stripe is called. Don't want it to be invoked when the page loads
  app.post('/api/stripe', requireLogin, async (req, res) => {

    console.log("\nStripe req.body:\n", req.body);

    //Bill the customer for $5
    const charge = await stripe.charges.create({
      amount: 500,   //500 cents as $5
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    console.log("\nCharge:\n", charge);

    //After applying charge to user's credit card, add 5 credits and send user model back to client - respond to request with updated user model
    req.user.credits += 5;
    const user = await req.user.save();    //have to save the user, actually takes the model and persists it to the database. Need to make sure it goes to the database. Saving a model is a asynchronous request
    //using 'user mode' that got returned from the save request to make sure we're using the most up-to-date user model

    res.send(user);   //respond to the request with the data
  });
};