const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your input!');
  })

  //Create a new survey and send out a mass email
  //Verify that the user is logged in and has enough credits to create a survey before creating a survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    try {

      await mailer.send();
      await survey.save();    //save the survey after it is sent
      req.user.credits -= 1;  //subtract a credit after sending the survey
      const user = await req.user.save();   //save the user with new credit amount

      res.send(user);   //to automatically update the page header with new amt of credits
    } catch (err) {
      res.status(422).send(err);
    }
  });
};