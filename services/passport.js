const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'],
      proxy: true
    },
    (token, refreshToken, profile, done) => {
      console.log(profile);
      // asynchronous
      // process.nextTick(() => {
      // find the user in the database based on their facebook id

      User.findOne({ googleId: profile.id }, function(err, user) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) return done(err);
        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them
          var newUser = new User({ googleId: profile.id });

          // set all of the facebook information in our user model
          // newUser.facebook.id = profile.id; // set the users facebook id
          // newUser.facebook.token = token; // we will save the token that facebook provides to the user
          // newUser.facebook.name =
          //   profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
          // newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

          // save our user to the database
          newUser.save(err => {
            if (err) {
              throw err;
            }
            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    }
  )
);
