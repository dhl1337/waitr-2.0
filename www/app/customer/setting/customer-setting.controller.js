(function () {
  angular
    .module('waitrApp')
    .controller('CustomerSettingController', ['userService', 'currentUser', '$state', '$timeout', '$scope', CustomerSettingController]);

  function CustomerSettingController(userService, currentUser, $state, $timeout, $scope) {
    var csc = this;

    csc.currentUser = currentUser;
    csc.firstName = csc.currentUser.firstName;
    csc.lastName = csc.currentUser.lastName;
    csc.phone = csc.currentUser.phone;
    csc.email = csc.currentUser.email;

    csc.updateUser = function () {
      var user = {
        firstName: csc.firstName,
        lastName: csc.lastName,
        phone: csc.phone,
        email: csc.email
      };
      userService.updateUser(csc.currentUser._id, user).then(function(user) {
        $state.go('customer.home');
      });

    };

  }

})();
