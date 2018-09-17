const passport = require('passport');

const Authentication = require('./controllers/authentication');
const Labeling = require('./controllers/labeling');
const Security = require('./controllers/security')
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Authentication
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);

  // Labeling interface
  app.get('/api/modalities', Labeling.getModalities);
  app.get('/api/training/:previous', Labeling.getNextImage);
  app.patch('/api/training/:id', Labeling.updateImage);

  // Role and groups management
  app.patch('/api/addRole', Security.addRole);
  app.patch('/api/removeRole', Security.removeRole);
}
