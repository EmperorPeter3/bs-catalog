'use strict';

/* App Module */

var bsCatalogApp = angular.module('bsCatalogApp', [
  'ngRoute',
  'bsCatalogControllers',
  'bsCatalogDirectives',
  'elasticui',
  'ngMap'
]);

bsCatalogApp.constant('euiHost', 'http://localhost:9200');

bsCatalogApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/business-catalog', {
        templateUrl: 'partials/business-catalog.html',
        controller: 'BusinessListCtrl'
      }).
      when('/business-catalog/:companyName', {
        templateUrl: 'partials/business-detail.html',
        controller: 'BusinessDetailCtrl'
      }).
      when('/addBusiness', {
        templateUrl: 'partials/business-add.html',
        controller: 'BusinessAddCtrl'
      }).
      when('/editManufacture', {
        templateUrl: 'partials/edit-manufacture.html',
        controller: 'editManufactureCtrl'
      }).
      otherwise({
        redirectTo: '/business-catalog'
      });
  }]);

bsCatalogApp.service('businessService', function() {
  var businessInfo = [];

  var addInfo = function(newObj) {
      businessInfo.push(newObj);
      console.log('Added: ' + newObj);
  };

  var getInfo = function(){
    console.log('Returned: ' + businessInfo);
      return businessInfo;
  };

  var clearInfo = function(){
    businessInfo = [];
  };

  return {
    addInfo: addInfo,
    getInfo: getInfo,
    clearInfo: clearInfo
  };

});