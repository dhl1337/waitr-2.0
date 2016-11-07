var WaitlistController = require('./WaitlistController');

module.exports = function (app) {
  app.post('/api/waitlist', WaitlistController.create);
  app.get('/api/waitlist', WaitlistController.read);
  app.put('/api/waitlist/:id', WaitlistController.update);
  app.delete('/api/waitlist/:id', WaitlistController.delete);

  app.put('/api/waitlist/:id/list', WaitlistController.addToList);
  app.delete('/api/waitlist/:id/list/:listId', WaitlistController.removeFromList);
  app.get('/api/waitlist/:id/list/:listId', WaitlistController.getFromList);
  app.put('/api/waitlist/:id/list/:listId', WaitlistController.updateListEntry);
};
