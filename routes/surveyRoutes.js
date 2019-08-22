const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  //Create a new survey and send out a mass email
  //Verify that the user is logged in and has enough credits to create a survey before creating a survey
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    console.log("\nreq.body:\n", req.body);

    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      //recipients is an array of objects (subdoc)
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()

    });

    //Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();


  })
};