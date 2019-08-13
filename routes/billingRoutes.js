const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);



module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    console.log("\nStripe req.body:\n", req.body);

    //Bill the customer for $5
    const charge = await stripe.charges.create({
      amount: 500,   //500 cents
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    console.log("\nCharge:\n", charge);
  });
};