const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');  //not installed, this is an integrated module in NODEJS, has helpers that help parse URLs in the application

const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');


module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your input!');
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log("webhook: ", req.body);

    //create a parser object to pull out the surveyID and choice. Path-parser helps parse out patterns
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)  //iterate over req.body
      .map(({ email, url }) => {

        //if there is a match, return match object found. If will return an object or null
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      //takes an array, goes through it, and removes anything 'undefined'
      .compact()
      //go through list of events and look at email and survey id property for any duplicates. Compares both email and survey id.
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }).exec();  //execute to send to database
      })
      .value()

    res.send({});
  });

  //Create a new survey and send out a mass email
  //Verify that the user is logged in and has enough credits to create a survey before creating a survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // console.log("\nreq.body:\n", req.body);

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