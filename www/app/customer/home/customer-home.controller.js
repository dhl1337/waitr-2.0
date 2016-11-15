(function () {
  angular
    .module('waitrApp')
    .controller('CustomerHomeController', ['restaurantService', '$timeout', CustomerHomeController]);

  function CustomerHomeController(restaurantService, $timeout) {
    var chc = this;

    chc.reverse = false;

    restaurantService.getRestaurants().then(function (restaurant) {
      console.log('rest', restaurant);
        $timeout(function() {
          chc.restaurantList = restaurant;
        }, 1000);
      });
  }

})();
