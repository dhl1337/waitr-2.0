(function () {
  'use strict';
  angular
    .module('waitrApp')
    .controller('CustomerHomeController', ['restaurantService', '$timeout', CustomerHomeController]);

  function CustomerHomeController(restaurantService, $timeout) {
    var vm = this;

    vm.reverse = false;

    restaurantService.getRestaurants().then(restaurant => {
        $timeout(() => vm.restaurantList = restaurant, 1000);
      });
  }

})();
