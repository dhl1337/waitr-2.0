(function () {
  'use strict';

  angular.module('waitrApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', '$state', '$ionicPopup'];

  function LoginController(authService, $state, $ionicPopup) {
    var logCtrl = this;

    logCtrl.credentials = {
      email: '',
      password: ''
    };

    logCtrl.login = login;

    ///////////////

    function login(credentials) {
      authService.login(credentials).then(function(user) {
        logCtrl.credentials.email = '';
        logCtrl.credentials.password = '';
        if (user.role === 'user') $state.go('customer.home');
        if (user.role === 'restaurant') $state.go('restaurant.home');
      }, function(res) {
        console.log('Login error: ' + res.data)
        // var alertPopup = $ionicPopup.alert({
        //   title: 'Login failed!',
        //   template: 'Error: ' + res
        // });
      });
    }


  }
})();
