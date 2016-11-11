(function () {
  angular
    .module('waitrApp')
    .service('RegistrationService', ['$http', 'SERVER_URL', '$q', 'authTokenService', RegistrationService]);

  function RegistrationService ($http, SERVER_URL, $q, authTokenService) {

    this.register = function (data) {
      const deferred = $q.defer();
      $http.post(SERVER_URL + '/register', data).then(res => {
        authTokenService.setToken(res.data.token);
        const currentUser = parseToken(res.data.token);
        $rootScope.$broadcast('currentUser', currentUser);
        return deferred.resolve(currentUser);
      }, res => deferred.reject(res));
      return deferred.promise;
    }
  }

})();
