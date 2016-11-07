var AuthenticationController = require('./AuthenticationController');

module.exports = function (app) {
  app.post('/register', AuthenticationController.register);
  app.post('/login', AuthenticationController.login);
};
