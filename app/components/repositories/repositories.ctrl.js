'use strict';

(function() {

  /**
   * @ngdoc function
   * @name myRepositoriesApp.controller:RepositoriesCtrl
   * @description
   * # RepositoriesCtrl
   * Controller of the myRepositoriesApp
   */
  var RepositoriesCtrl = function($scope, RepositoriesFactory) {

    $scope.repos = RepositoriesFactory.getRepositories();


    function replaceSpecialChars(str) {
      str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
      str = str.replace(/[àáâãäå]/, "a");
      str = str.replace(/[ÈÉÊË]/, "E");
      str = str.replace(/[èéêë]/, "e");
      str = str.replace(/[ÌÍÎÏ]/, "I");
      str = str.replace(/[ìíîï]/, "i");
      str = str.replace(/[ÒÓÔÖ]/, "O");
      str = str.replace(/[òóôö]/, "o");
      str = str.replace(/[ÙÚÛÜ]/, "U");
      str = str.replace(/[ùúûü]/, "u");
      str = str.replace(/[Ç]/, "C");
      str = str.replace(/[ç]/, "c");
      str = str.toLowerCase();
      return str.replace(/[^a-z0-9\s]/gi, '');
    }
    $scope.ignoreAccents = function(item) {
      if($scope.search != undefined){
        var text = replaceSpecialChars(item.name);
        var search = replaceSpecialChars($scope.search.undefined);
        return text.indexOf(search) > -1;
      }else{
        return true;
      }
    };

  }

  RepositoriesCtrl.$inject = ['$scope', 'RepositoriesFactory'];

  angular
    .module('myRepositoriesApp')
    .controller('RepositoriesCtrl', RepositoriesCtrl);
})();
