'use strict';

/**
 * @ngdoc overview
 * @name myRepositoriesApp
 * @description
 * # myRepositoriesApp
 *
 * Main module of the application.
 */
angular
  .module('myRepositoriesApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ngMaterial'
  ])
  .constant('PATH', {
    main: '/myrepo',
    repositories: '/repositories'
  })
  .constant('REQUEST', {
    github: {
      url: 'https://api.github.com',
      users: '/users/',
      repos: '/repos'
    }
  })
  .config(function($stateProvider, $urlRouterProvider, $translateProvider, PATH) {

    /* Configuração do provider de universalização e da linguagem padrão. */
    $translateProvider.useStaticFilesLoader({
      prefix: 'translate/messages-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('pt');

    /* Configuração dos estados e rotas da aplicação */
    $stateProvider.state('main', {
      abstract: true,
      url: PATH.main,
      templateUrl: 'views/main.html'
    }).state('main.repositories', {
      url: PATH.repositories,
      templateUrl: 'views/repositories.html',
      controller: 'RepositoriesCtrl as ctrl'
    });

    $urlRouterProvider.otherwise(function() {
      return '/myrepo/repositories';
    });

  });
