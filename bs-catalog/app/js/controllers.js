'use strict';

/* Controllers */

var bsCatalogControllers = angular.module('bsCatalogControllers', []);

bsCatalogControllers.controller('BusinessListCtrl', ['$scope', '$http', 'businessService',
  function($scope, $http, businessService) {

    $scope.getCompanyDescription = function(source){
      businessService.clearInfo();
      businessService.addInfo(source);    
    }

  }]);

bsCatalogControllers.controller('BusinessDetailCtrl', ['$scope', '$routeParams', '$http', 'businessService',
  function($scope, $routeParams, $http, businessService) {
    // $routeParams.companyName <----- unused!
    $scope.business = businessService.getInfo()[0];
    var business = $scope.business;
    $scope.newAddress = addressNormalize(business.company_address);

  }]);

bsCatalogControllers.controller('BusinessAddCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.addNewBusiness = function(){
      $http({
        method: 'POST',
        url: 'http://localhost:9200/manufactures/manufacture/',
        data: $scope.business
      }).then(function successCallback(response) {
          console.log('Success: ' + response)
        }, function errorCallback(response) {
          console.log('Error: ' + response)
        });
    }

    
  }]);


//Additional to BusinessDetailController
var addressNormalize = function(address){
      console.log(address);
      var regionIndex = address.substr(address.lastIndexOf(",")+2);
      var newAddress = regionIndex + " " + address.substr(0, address.lastIndexOf(","));
      console.log(newAddress);
      return newAddress;
    }


    //3386 West Ski Hill Court, Lansing, Michigan, 30329
    //30329 3386 West Ski Hill Court, Lansing, Michigan