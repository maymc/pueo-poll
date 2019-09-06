//  Middleware to verify if the user has enough credits to create a survey

module.exports = (req, res, next) => {
  //next is called when all middleware is complete, similar to 'done'; moves on to next middleware

  //Check if the user is logged in before allowing them to add credits
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  //if user is logged in, then allow them to continue to request handler
  next();
};