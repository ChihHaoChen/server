// prod.js - production keys here
module.exports = {
  googleClientID: '953481300821-3ltfj4k8c7p1rcmj01e02aaamdphf4hh.apps.googleusercontent.com',
  googleClientSecret: 'RLYi0sMCWVv38Wa5c6GBUEI7',
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};

// module.exports = {
//   googleClientID: process.env.GOOGLE_CLIENT_ID,
//   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   mongoURI: process.env.MONGO_URI,
//   cookieKey: process.env.COOKIE_KEY
// };
