const sendgrid = require('sendgrid');
const helper = sendgrid.mail;   //helper object to help create the mailer

const keys = require('../config/keys');

//helper.Mail is an object that a lot of configuration and spits of a mailer. We want to take the mailer class and add on additional customization. Our Mailer object has the base class functionality of helper.Mail
class Mailer extends helper.Mail {
  //content is a string, not destructuring anything on it so no curly braces around 'content'. 'subject and recipients' are objects that need to be destructured
  constructor({ subject, recipients }, content) {
    super();

    //Take the mailer and send it off to sendgrid, use the sendgrid object directly. Use the sendgrid function, pass in the API key that returns an object that we can use to communicate with the sendgrid API
    this.sendgridAPI = sendgrid(keys.sendGridKey);

    //Properties required by Sendgrid
    this.from_email = new helper.Email('no-reply@pueopoll.com');//who this email is sent from (us)
    this.body = new helper.Content('text/html', content);
    this.subject = subject;
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);   //helper function provided by helper.Mail class
    this.addClickTracking();    //helper function we define, enable click tracking from the emails
    this.addRecipients();   //helper function we define
  }

  //This is just to format the recipient emails
  formatAddresses(recipients) {
    //for every recipient, pull out the email property
    return recipients.map(({ email }) => {
      return newhelper.Email(email);  //format with email helper from sendgrid
    })
  }

  //This functionality is documentation from Sendgrid
  addClickTracking() {
    //Create two helper variables
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    //Use the two variables
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  //Take and process the recipients. Add the recipients to the mailer.
  addRecipients() {
    //Define the helper variables
    const personalize = new helper.Personalization();
    //iterate over list of recipients, for each recipient, make use of the personalized object declared
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);   //function define by Mail base class
  }

  async send() {
    //take the mailer and send it off to sendgrid
    //Make an API request, asynchronous code
    const request = this.sendgridAPI.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()   //defined by Mail base class
    });

    const response = this.sendgridAPI.API(request);  //This sends out the request to sendgrid
    return response;
  }
}

module.exports = Mailer;