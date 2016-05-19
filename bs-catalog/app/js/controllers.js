'use strict';

/* Controllers */

var bsCatalogControllers = angular.module('bsCatalogControllers', []);

bsCatalogControllers.controller('BusinessListCtrl', ['$scope', '$http', 'businessService',
  function($scope, $http, businessService) {

    $scope.getCompanyDescription = function(source){
      businessService.clearInfo();
      businessService.addInfo(source);    
    };

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

    $scope.addNewBusiness = function(item) {
      $scope.failedValidationsPhone = [];
      $scope.failedValidationsEmail = [];
                  
      if($scope.businessForm.$dirty && $scope.businessForm.$invalid){
        for(var validations in $scope.businessForm.$error){
          for(var count=0; count < $scope.businessForm.$error[validations].length; count++){
            if($scope.businessForm.$error[validations][count].$name === "phone"){
              $scope.failedValidationsPhone.push(errorMessages[$scope.businessForm.$error[validations][count].$name][validations]);
              $scope.phoneErrorStyle = errorStyle;
            }
            if ($scope.businessForm.$error[validations][count].$name === "email"){
              $scope.failedValidationsEmail.push(errorMessages[$scope.businessForm.$error[validations][count].$name][validations]);
              $scope.emailErrorStyle = errorStyle;
            }
          }
        }
        
      } else {            
        $scope.businessForm.$setPristine();
        $http({
          method: 'POST',
          url: 'http://localhost:9200/manufactures/manufacture/',
          data: $scope.business
        }).then(function successCallback(response) {
            console.log('Success: ' + response)
          }, function errorCallback(response) {
            console.log('Error: ' + response)
          });

        $scope.business = {};
        $scope.phoneErrorStyle = noStyle;
        $scope.emailErrorStyle = noStyle;
      } 
    };

    var errorMessages={
      phone:function(){
            var required = "Пустое поле";
            var validPhone = "Неверный формат";
            
            return{
              required: required,
              validPhone: validPhone
            };
          }(),
      email:function(){
            var required = "Пустое поле";
            var validEmail = "Неверно написан адрес";
            
            return{
              required: required,
              validEmail:validEmail
            }
          }()         
      };

    $scope.failedValidationsPhone = [];
    $scope.failedValidationsEmail = [];

    var errorStyle = {
      "border":"1px solid #ff2d01", 
      "border-radius":"5px", 
      "background-color":"#ff2d01", 
      "color":"white", 
      "text-align":"center",
      "font-weight":"bold",
      "padding":"5px 10px 5px 10px"
  }; 
  var noStyle = {};
}]);

bsCatalogControllers.controller('editManufactureCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.manufacture_types = [
    "Заготовка сырья",
    "Консалтинг, инжиниринг, продажа ноу-хау", 
    "Культура и креативные индустрии", 
    "Кооперативы всех типов", 
    "Легкая промышленность",
    "Лесная отрасль", 
    "Местная автономная энергетика",
    "Местная химическая промышленность", 
    "Обработка металла, производство изделий из металла",
    "Образовательные услуги", 
    "Переработка лесного сырья",
    "Переработка мусора",
    "Переработка сельхозпродукции",
    "Пищевая промышленность",
    "Производства в сфере программирования, IT, фриланс",
    "Производство машин и оборудования", 
    "Производство косметики", 
    "Производство медикаментов", 
    "Производство сувениров", 
    "Сельскохозяйственное производство" 
    ];

    $scope.manufacture_layers = [
    "temperature",
    "forest",
    "water"
    ]

    var diapasoneEL = '<div class="diapasone"><label class="control-label" for="man_diap">Диапазон: </label><span> От:<input type="text"/></span><span> До:<input type="text"/></span><span> Значение:<input type="text"/></span></div>';
    var layerEL = '<div class="control-group layer"><label class="control-label" for="man_layers">Слой: </label><select class="controls" id="man_layers"><option ng-repeat="layer in manufacture_layers" value="type" ng-model="manufacture.man_type">{{layer}}</option></select><div class="layerDiapasones"><div class="diapasone"><label class="control-label" for="man_diap">Диапазон: </label><span>От:<input type="text"/></span><span>До:<input type="text"/></span><span>Значение:<input type="text"/></span></div></div><span><input class="btn btn-default" type="button" id="addDiapasone" value="Добавить диапазон" ng-click="addDiapasone()"/></span></div>';

    $scope.addDiapasone = function() {
      $(".layerDiapasones").append(diapasoneEL);
    };

    $scope.addLayer = function() {
      $(".manufactureLayers").append(layerEL);
    };

  }]);


//Additional to BusinessDetailController
var addressNormalize = function(address){
      console.log(address);
      var regionIndex = address.substr(address.lastIndexOf(",")+2);
      var newAddress = regionIndex + " " + address.substr(0, address.lastIndexOf(","));
      console.log(newAddress);
      return newAddress;
    };