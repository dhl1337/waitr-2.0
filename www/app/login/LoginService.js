(function () {
  angular
    .module('waitrApp')
    .service('LoginService', ['$http', 'SERVER_URL', '$q', 'authTokenService', LoginService]);

  function LoginService ($http, SERVER_URL, $q, authTokenService) {

    this.login = function (credentials) {
      var deferred = $q.defer();
      $http
        .post(SERVER_URL + '/login', credentials)
        .then(function(res) {
          authTokenService.setToken(res.data.token);
          var currentUser = parseToken(res.data.token);
          $rootScope.$broadcast('currentUser', currentUser);
          return deferred.resolve(currentUser);
        }, function(res) {
          return deferred.reject(res);
        });
      return deferred.promise;
    };

    this.logout = function () {
      authTokenService.setToken();
    }
  }
})();
