const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //To ask google to give us the users' profiles and emails
    })
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: 'email'
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/api/current_user',
      failureRedirect: '/auth/facebook'
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
