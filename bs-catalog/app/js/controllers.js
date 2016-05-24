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

    $scope.manufacture = [{
    "manufacture_types": 
    [
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
    ],
    "manufacture_layers":
    [
      {
        "number":0,
        "type":"",
        "types":
        [
          "temperature",
          "forest",
          "water"
        ],
        "diapasones":
        [
          {
            "From":"",
            "To":"",
            "Value":""
          }
        ]
      }
    ]
    }];

    $scope.addDiapasone = function(layer_number) {
      $scope.manufacture[0].manufacture_layers[layer_number].diapasones = $scope.manufacture[0].manufacture_layers[layer_number].diapasones.concat([{
        "From":"",
        "To":"",
        "Value":""
      }]);   
    };

    $scope.addLayer = function() {
      $scope.manufacture[0].manufacture_layers = $scope.manufacture[0].manufacture_layers.concat([{
        "number":$scope.manufacture[0].manufacture_layers.length,
        "type":"",
        "types":
        [
          "temperature",
          "forest",
          "water"
        ],
        "diapasones":
        [
        {
          "From":"",
          "To":"",
          "Value":""
        }
        ]
      }]);  
    };

    $scope.updateManufacture = function() {
      console.log($scope.manufacture);
    };

  }
]);


//Additional to BusinessDetailController
var addressNormalize = function(address){
      console.log(address);
      var regionIndex = address.substr(address.lastIndexOf(",")+2);
      var newAddress = regionIndex + " " + address.substr(0, address.lastIndexOf(","));
      console.log(newAddress);
      return newAddress;
    };

