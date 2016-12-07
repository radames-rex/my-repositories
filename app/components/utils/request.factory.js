// 'use strict';
//
// (function () {
//
// 	/**
//    * Definição do Factory para todas as Requisições.
//    * @author Rádames Santiago <radames@infoway-pi.com.br>
//    * @class RequestFactory
//    */
// 	var RequestFactory = function($rootScope, $q, $http, UserInfoFactory, cfpLoadingBar, $timeout, localStorageService, Toast){
//
// 		var RequestFactory = {};
//
// 		/**
// 		 * Verifica se o browser do usuário tem conexão com a Internet.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
// 		 * @name isOnline
// 		 * @function
// 		 * @returns {boolean} Está online ou não.
// 		 * @memberof RequestFactory
// 		 */
// 		var isOnline = function(){
// 			var onLine = window.navigator.onLine;
// 			if(bowser.name == 'PhantomJS'){
// 				onLine = true;
// 			}
// 			return onLine;
// 		}
//
// 		/**
// 		 * Monta o cabeçalho da requisição.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
// 		 * @name createHeaders
// 		 * @function
// 		 * @param {string} data Parâmetros.
// 		 * @param {string} url Url da requisição.
// 		 * @returns {string} Cabeçalho configurado.
// 		 * @memberof RequestFactory
// 		 */
// 		var createHeaders = function(data,url){
// 			var cfg = {};
// 			if(UserInfoFactory.hasUserInfo()){
// 				cfg = url+'?accessToken='+localStorageService.get('accessToken');
// 				if(data !== null && data !== undefined && data !== ""){
// 					// cfg+="&"+data;
// 					cfg+=data;
// 				}
// 			}else	if(data !== null && data !== undefined && data !== ""){
// 				cfg = url+"?"+data;
// 			}else{
// 				cfg = url;
// 			}
// 			return cfg;
// 		}
//
// 		/**
// 		 * Trata a requisição adicionando os loaders corretamente.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
// 		 * @name doRequest
// 		 * @function
// 		 * @param {object} req Requisição.
// 		 * @param {boolean} withoutLoader Sem Loader.
// 		 * @param {boolean} withFilterLoader Com Loader do Filtro.
// 		 * @returns {object} Promessa da requisição.
// 		 * @memberof RequestFactory
// 		 */
// 		var doRequest = function(req, withoutLoader, withFilterLoader){
// 			var defer = $q.defer();
// 			$rootScope.onRequest = true;
// 			if (withoutLoader !== true) {
// 				var startTimeoutLoader = $timeout(function() {
// 					cfpLoadingBar.start();
// 				}, 0);
// 			}
// 			if (withFilterLoader == true) {
// 				var elFilterLoader = $('#md-chips-filter-loader'),
// 				elCompareLoader = $('#md-chips-compare-loader'),
// 				startTimeoutFilterLoader = $timeout(function() {
// 					elFilterLoader.addClass('md-chips-icon-loader--active');
// 					elCompareLoader.addClass('md-chips-icon-loader--active');
// 				}, 0);
// 			}
// 			req.then(function(data){
// 				defer.resolve(data);
// 			}, function(response, status){
// 				defer.reject(response, status);
// 			}).finally(function(){
// 				$rootScope.onRequest = false;
//
// 				if (withoutLoader !== true) {
//           $timeout(function() {
//             $timeout.cancel(startTimeoutLoader);
//             cfpLoadingBar.complete();
// 					}, 250);
// 				}
// 				if (withFilterLoader == true) {
// 					$timeout(function() {
// 						$timeout.cancel(startTimeoutFilterLoader);
// 						elFilterLoader.removeClass('md-chips-icon-loader--active');
// 						elCompareLoader.removeClass('md-chips-icon-loader--active');
// 					}, 250);
// 				}
// 			});
// 			return defer.promise;
// 		}
//
// 		RequestFactory.createHeaders = createHeaders;
//
// 		/**
// 		 * Monta uma requisição Get.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
// 		 * @name get
// 		 * @function
// 		 * @param {string} url Url da requisição.
// 		 * @param {object} data Parâmetros.
// 		 * @param {boolean} withoutLoader Sem Loader.
// 		 * @param {boolean} withFilterLoader Com Loader do Filtro.
// 		 * @returns {object} Promessa da requisição.
// 		 * @memberof RequestFactory
// 		 */
// 		RequestFactory.get = function(url, data, withoutLoader, withFilterLoader) {
// 			if(isOnline()){
// 				return doRequest($http.get(createHeaders(data,url)), withoutLoader, withFilterLoader);
// 			}else{
// 				Toast.showErrorToast('Você não possui conexão com a Internet!');
// 				return null;
// 			}
// 		}
//
// 		/**
// 		 * Monta uma requisição Post.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
//  		 * @name post
// 		 * @function
// 		 * @param {string} url Url da requisição.
// 		 * @param {object} data Parâmetros.
// 		 * @param {object} body Corpo da requisição.
// 		 * @param {boolean} withoutLoader Sem Loader.
// 		 * @returns {object} Promessa da requisição.
// 		 * @memberof RequestFactory
//  		 */
// 		RequestFactory.post = function(url, data, body, withoutLoader) {
// 			if(isOnline()){
// 				return doRequest($http({
//                   url: createHeaders(data,url),
//                   dataType: 'json',
//                   method: 'POST',
//                   data: body,
//                   headers: {
//                       "Content-Type": "application/json"
//                   }
//                 }), withoutLoader);
// 			}else{
// 				Toast.showErrorToast('Você não possui conexão com a Internet!');
// 				return null;
// 			}
// 		}
//
// 		/**
// 		 * Monta uma requisição Put.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
// 		 * @name put
// 		 * @function
// 		 * @param {string} url Url da requisição.
// 		 * @param {object} body Corpo da requisição.
// 		 * @param {boolean} withoutLoader Sem Loader.
// 		 * @returns {object} Promessa da requisição.
// 		 * @memberof RequestFactory
// 		 */
// 		RequestFactory.put = function(url, body, withoutLoader) {
// 			if(isOnline()){
// 				return doRequest($http({
//                   url: createHeaders(null,url),
//                   dataType: 'json',
//                   method: 'PUT',
//                   data: body,
//                   headers: {
//                       "Content-Type": "application/json"
//                   }
//                 }), withoutLoader);
// 			}else{
// 				Toast.showErrorToast('Você não possui conexão com a Internet!');
// 				return null;
// 			}
// 		}
//
// 		/**
// 		 * Monta uma requisição JSONP.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
//  		 * @name jsonp
// 		 * @function
// 		 * @param {string} url Url da requisição.
// 		 * @param {boolean} withoutLoader Sem Loader.
// 		 * @returns {object} Promessa da requisição.
// 		 * @memberof RequestFactory
//  		 */
// 		RequestFactory.jsonp = function(url, withoutLoader) {
// 			if(isOnline()){
// 				return doRequest($http.jsonp(url, createHeaders()), withoutLoader);
// 			}else{
// 				Toast.showErrorToast('Você não possui conexão com a Internet!');
// 				return null;
// 			}
// 		}
//
// 		/**
// 		 * Monta uma requisição post vinda de um formulário.
// 		 * @author Rádames Santiago <radames@infoway-pi.com.br>
//  		 * @name jsonp
// 		 * @function
// 		 * @param {string} url Url da requisição.
// 		 * @param {object} data Parâmetros.
// 		 * @param {boolean} withoutLoader Sem Loader.
// 		 * @returns {object} Promessa da requisição.
// 		 * @deprecated desde a versão 0.5.0
// 		 * @memberof RequestFactory
//  		 */
// 		RequestFactory.postForm = function(url, data, withoutLoader) {
// 			var req = createHeaders(data);
// 			req.data = $.param(data);
// 			req.headers = req.headers ? req.headers : {};
// 			req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 			return doRequest($http({
// 				method: 'POST',
// 				url: url,
// 				headers: req.headers,
// 				data: req.data
// 			}), withoutLoader);
// 		}
//
// 		return RequestFactory;
// 	}
//
// 	RequestFactory.$inject = ['$rootScope', '$q', '$http', 'UserInfoFactory', 'cfpLoadingBar', '$timeout', 'localStorageService', 'Toast'];
//
// 	angular
// 	.module('myRepositoriesApp')
// 	.factory('RequestFactory', RequestFactory);
//
// })();
