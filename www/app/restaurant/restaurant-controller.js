(function () {
  angular
    .module('waitrApp')
    .controller('restaRestaurantCtrl', ['restaurantInfo',restaAdminCtrl]);

  function restaAdminCtrl(restaurantInfo) {
    var rrc = this;
    rrc.currentUser = restaurantInfo.currentUser;
    rrc.restaurant = restaurantInfo.restaurant[0];

  }

})();
