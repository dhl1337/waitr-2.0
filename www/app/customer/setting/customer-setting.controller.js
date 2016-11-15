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

    csc.updateUser = function (firstName, lastName, phone, email) {
      var user = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
      };
      userService.updateUser(csc.currentUser._id, user).then(function(user) {
        $scope.ccc.currentUser = user;
        $state.go('customer.settings');
      });

    };

  }

})();
