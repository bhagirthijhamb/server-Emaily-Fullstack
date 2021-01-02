const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./../config/keys');


// inform passport library to use GoogleStrategy
// new GoogleStrategy() takes 2 things ClientID and ClientSecret (provided from Google's OAuth service)
// console.developers.google.com
passport.use(new GoogleStrategy({ 
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
// }, (accessToken) => {
//   console.log(accessToken);
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken);
  console.log('refresh token', refreshToken);
  console.log('profile', profile);
}))

// Client ID
// Public token -  we can share this with the public. Identifies our application to google servers.
// 
// Client Secret
// If shared, others can have elevated previleges inside our OAuth account.
// 

// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=563635936233-ck11v6i2bql96ab08peg4l6tr2pdp0tm.apps.googleusercontent.com&flowName=GeneralOAuthFlow

// http://localhost:5000/auth/google/callback?code=4%2F0AY0e-g7rrREV48pBirWzWm552-gGtP9reBIKhagi9P-IQ3EgsRfX3GjgZ45qwZR5vtZMhw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=1&prompt=consent# 

