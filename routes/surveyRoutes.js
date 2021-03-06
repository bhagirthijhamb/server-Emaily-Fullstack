const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('./../services/Mailer');
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body);
    // res.send({})
    const p = new Path('/api/surveys/:surveyId/:choice');

    // const events = _.map(req.body, (event) => {
    //   // const pathname = new URL(event.url).pathname;
    //   // console.log(p.test(pathname));
    //   // const match = p.test(pathname);
    //   const match = p.test(new URL(event.url).pathname);
    //   if(match){
    //     // return match;
    //     return { email: event.email, surveyId: match.surveyId, choice: match.choice };
    //   }
    // })
    // // console.log(events)
    // const compactEvents = _.compact(events);
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    // console.log(uniqueEvents);
    // res.send({});

    // const events = _.chain(req.body)
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if(match){
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1},
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

      // console.log(events);
      res.send({});
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user)
    } catch(err){
      res.status(422).send(err);
    }
  })
}