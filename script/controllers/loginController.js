'use strict';

var mainApp = angular.module("myApp");


mainApp.controller("loginController", function( $scope, $http, $location, $rootScope/*, vcRecaptchaService*/ ){
	
	var loginObj =[];
	
	$scope.submit = function(){
		
		$http({
			  method: 'GET',
			  url: 'json/login.json'
			}).then(function successCallback(response) {
				
				//Get data from login Json
				loginObj = response.data.login; 
		  		/*console.log("login Json "+loginObj);*/
				for(var i = 0; i < Object.keys(loginObj).length; i++){
					
					if(loginObj[i].userName === $scope.userName && loginObj[i].passWord === $scope.passWord){
						$rootScope.successLogin = true;
						$location.path("/dashboard");
						console.log("Succesfull login");
						break;
					}
				}
				//If userName and passWord is not same
				if(!$rootScope.successLogin){
					console.log("Succesfull login Not");
					$scope.errorMesssage = "Invalid Username or Password";
				}
				
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  }); 
			
		
	};
	 
});
