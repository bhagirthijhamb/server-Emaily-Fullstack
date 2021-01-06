const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // makes an instance of a survey in memory
    const survey = new Survey({
      title,
      subject,
      body,
      // when JS sees curly brackets after fat arrow, it gets confused if its function body or shortened object. We are defining a shortened object, so we wrap it with parenthesis to make it clear to JS interpreter
      // recipients: recipients.split(',').map(email => { return {email: email} })
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
  })
}