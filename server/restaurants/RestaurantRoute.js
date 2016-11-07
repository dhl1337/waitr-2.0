var RestaurantController = require('./RestaurantController');

module.exports = function (app) {
  app.post('/api/restaurant', RestaurantController.create);
  app.get('/api/restaurant', RestaurantController.read);
  app.put('/api/restaurant/:id', RestaurantController.update);
  app.delete('/api/restaurant/:id', RestaurantController.delete);
  app.get('/api/restaurant/:id', RestaurantController.currentRestId);
  app.put('/api/restaurant/menu/add/:id', RestaurantController.addItemToMenu);
  app.put('/api/restaurant/menu/remove/:id', RestaurantController.deleteItemToMenu);
};
