'use strict';

(function() {

  /**
   * @ngdoc function
   * @name myRepositoriesApp.factory:RepositoriesFactory
   * @description
   * # RepositoriesFactory
   * Factory of the myRepositoriesApp
   */
  var RepositoriesFactory = function(REQUEST, RequestFactory, $q) {
    var RepositoriesFactory = {};

    var repoFormatted = function() {
      return [{
        owner: "@radames-rex",
        name: "nvd3js-vhline",
        language: "js",
        stars: "3",
        forks: "1"
      }, {
        owner: "@radames-rex",
        name: "zionmvc",
        language: "php",
        stars: "2",
        forks: "1"
      }, {
        owner: "@radames-rex",
        name: "starbus-api",
        language: "ruby",
        stars: "5",
        forks: "1"
      }];
    }

    RepositoriesFactory.filterRepositories = function() {
      return repoFormatted();
    }

    RepositoriesFactory.getRepositories = function(user) {
      var defer = $q.defer();
      RequestFactory.get(REQUEST.github.url + REQUEST.github.users + user + REQUEST.github.repos).then(function(data) {
        data = data.data;
        if (typeof data === 'object') {
          defer.resolve(data);
        } else {
          defer.reject("hasnt object");
        }
      }, function(response, status) {
        defer.reject(response, status);
      });
      return defer.promise;
    }

    return RepositoriesFactory;
  }

  RepositoriesFactory.$inject = ['REQUEST', 'RequestFactory', '$q'];

  angular
    .module('myRepositoriesApp')
    .factory('RepositoriesFactory', RepositoriesFactory);
})();
