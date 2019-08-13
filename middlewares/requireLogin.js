module.exports = (req, res, next) => {
  //next is called when all middleware is complete, similar to 'done'; moves on to next middleware

  //Check if the user is logged in before allowing them to add credits
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  //if user is logged in, then allow them to continue to request handler
  next();
};