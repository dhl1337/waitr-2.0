(function () {
  'use strict';
  angular
    .module('waitrApp')
    .controller('CustomerSettingController', ['userService', 'currentUser', '$state', CustomerSettingController]);

  function CustomerSettingController(userService, currentUser, $state) {

    var vm = this;

    vm.firstName = currentUser.firstName;
    vm.lastName = currentUser.lastName;
    vm.phone = currentUser.phone;
    vm.email = currentUser.email;

    vm.updateUser = () => {

      var user = {
        firstName: vm.firstName,
        lastName: vm.lastName,
        phone: vm.phone,
        email: vm.email
      };

      userService.updateUser(currentUser._id, user).then(() =>$state.go('customer.home'));

    };

  }

})();
