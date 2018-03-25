// prod.js - production keys here
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  facebookClientID: process.env.facebookClientID,
  facebookClientSecret: process.env.facebookClientSecret,
  facebookProfileURI: process.env.facebookProfileURI,
  facebookProfileFields: ['id', 'email', 'name']
};
