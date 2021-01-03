const passport = require('passport');

// exporting a function (that takes app) from this file
module.exports = (app) => {
  // app.get('/', (req, res) => {
  //   res.send({ bye: 'buddy' });
  // })

  // when user come to this route, take it to the OAuth flow via passport
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))


  // on redirect from Google, the url has the code in it(to be exchanged for information on profile and email)
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    // logout() is a function added to req object by passport
    req.logout();
    res.send(req.user);
  })

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  })
}

