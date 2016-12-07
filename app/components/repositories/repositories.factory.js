'use strict';

(function() {

  /**
   * @ngdoc function
   * @name myRepositoriesApp.factory:RepositoriesFactory
   * @description
   * # RepositoriesFactory
   * Factory of the myRepositoriesApp
   */
  var RepositoriesFactory = function() {
    var RepositoriesFactory = {};

    var repoFormatted = function(){
      return [{
        owner: "@radames-rex",
        name: "nvd3js-vhline",
        language: "js",
        stars: "3",
        forks: "1"
      },{
        owner: "@radames-rex",
        name: "zionmvc",
        language: "php",
        stars: "2",
        forks: "1"
      },{
        owner: "@radames-rex",
        name: "starbus-api",
        language: "ruby",
        stars: "5",
        forks: "1"
      }];
    }

    RepositoriesFactory.getRepositories = function() {
      return repoFormatted();
    }

    RepositoriesFactory.filterRepositories = function() {
      return repoFormatted();
    }

    return RepositoriesFactory;
  }

  RepositoriesFactory.$inject = [];

  angular
    .module('myRepositoriesApp')
    .factory('RepositoriesFactory', RepositoriesFactory);
})();
