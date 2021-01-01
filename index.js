const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
// inform passport library to use GoogleStrategy
// new GoogleStrategy() takes 2 things ClientID and ClientSecret (provided from Google's OAuth service)
// console.developers.google.com
passport.use(new GoogleStrategy({ 
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURl: '/auth/google/callback'
}))

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
})

// Dynamic port binding
const PORT = process.env.PORT || 5000
app.listen(PORT)

// Client ID
// Public token -  we can share this with the public. Identifies our application to google servers.
// 
// Client Secret
// If shared, others can have elevated previleges inside our OAuth account.
// 