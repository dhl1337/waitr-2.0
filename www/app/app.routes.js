(function () {
  'use strict';

  angular.module('waitrApp')
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'USER_ROLES', configure]);

  function configure($stateProvider, $urlRouterProvider, $ionicConfigProvider, USER_ROLES) {

    $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');

    $stateProvider
    // LOGIN - REGISTER ROUTES
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('customer-sign-up', {
        url: '/customer-registration',
        templateUrl: 'app/registration/customer-registration.html',
        controller: 'RegistrationController',
        controllerAs: 'registration'
      })
      .state('restaurant-sign-up', {
        url: '/restaurant-registration',
        templateUrl: 'app/registration/restaurant-registration.html',
        controller: 'RegistrationController',
        controllerAs: 'registration'
      })

      // CUSTOMER ROUTES
      .state('customer', {  //parent, sidenav
        url: '/customer',
        abstract: true,
        templateUrl: './app/customer/customer.html',
        resolve: {
          currentUser: function (authService, $state) {
            var user = authService.getUser();
            if (!user) {
              return $state.go('login');
            }
            return user;
          }
        }
      })
      .state('customer.home', {
        url: '/home',
        views: {
          'customer-home': {
            templateUrl: './app/customer/home/customer-home.html',
            controller: 'CustomerHomeController',
            controllerAs: 'CustomerHomeCtrl'
          }
        }
      })
      .state('customer.settings', {
        url: '/settings',
        views: {
          'customer-setting': {
            templateUrl: './app/customer/setting/customer-setting.html',
            controller: 'CustomerSettingController',
            controllerAs: 'CustomerSettingCtrl'
          }
        }
      })
      .state('customer.restaurant', {
        url: '/home/restaurant/:restaurantId',
        views: {
          'customer-home': {
            templateUrl: './app/customer/restaurant/customer-restaurant.html',
            controller: 'custRestaurantCtrl',
            controllerAs: 'crc'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
