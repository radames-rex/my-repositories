'use strict';

/**
 * @ngdoc function
 * @name myRepositoriesApp.controller:RepositoriesCtrl
 * @description
 * # RepositoriesCtrl
 * Controller of the myRepositoriesApp
 */
angular.module('myRepositoriesApp')
  .controller('RepositoriesCtrl', function ($scope) {
    $scope.repos = [{
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
  });
