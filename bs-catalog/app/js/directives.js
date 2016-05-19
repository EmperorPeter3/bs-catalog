'use strict';

var bsCatalogDirectives = angular.module('bsCatalogDirectives', []);

bsCatalogDirectives.directive('validPhone',function(){
	return{
		require: "ngModel",
		link: function(scope, elm, attrs, ctrl){
			
			var regex=/79[0-9]{9}/;
			ctrl.$parsers.unshift(function(viewValue){
				var floatValue = parseFloat(viewValue);
				if(regex.test(viewValue)){
					ctrl.$setValidity('validPhone',true);
				}else{
				    ctrl.$setValidity('validPhone',false);
                }
				return viewValue;
			});
		}
	};
});
bsCatalogDirectives.directive('validEmail',function(){
	return{
		require: "ngModel",
		link: function(scope, elm, attrs, ctrl){
			
			var regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			ctrl.$parsers.unshift(function(viewValue){
				var floatValue = parseFloat(viewValue);
				if(regex.test(viewValue)){
					ctrl.$setValidity('validEmail',true);
				}else{
				    ctrl.$setValidity('validEmail',false);
                }
				return viewValue;
			});
		}
	};
});
