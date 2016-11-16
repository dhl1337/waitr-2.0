(function () {
  'use strict';
  angular
    .module('waitrApp')
    .controller('custRestaurantCtrl', ['currentUser', 'restaurantService', 'waitlistService', '$stateParams', '$ionicHistory', '$state', custRestaurantCtrl]);

  function custRestaurantCtrl(currentUser, restaurantService, waitlistService, $stateParams, $ionicHistory, $state) {

    var vm = this,
      restaurantId = $stateParams.restaurantId;

    vm.infoHoursToggle = true;

    vm.currentUser = currentUser;

    restaurantService.getCurrentRestaurant(restaurantId).then(restaurant => vm.restaurant = restaurant[0]);

    waitlistService.getWaitlist(restaurantId).then(res => vm.customerEntries = res[0]);

    vm.userAddingToQ = () => {
      waitlistService.addAnonToWaitlist(vm.currentUser, vm.restaurant.waitlist_id).then(() => {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        $state.go("restaurant.home");
      });
    };

    vm.callTel = () => window.location.href = 'tel:' + vm.restaurant.restaurantPhone;

    vm.getWebsite = () => {
      window.open(vm.restaurant.restaurantWebsite, '_system', 'location=yes');

      return false;
    };

    vm.goBack = () => $ionicHistory.goBack();

    vm.showOnClick = (value) => vm.infoHoursToggle = value;

    //console.log(crc.currentUser);

    //we need to get the user again just in case they get added to a list
    /*userService.currentUser(crc.currentUser._id).then(function(res) {
     crc.currentUser = res[0];
     //console.log(crc.currentUser);
     })*/
  }

})();
