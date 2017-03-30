 'use strict';

var mainApp = angular.module("myApp",["ui.router", "angularCharts","vcRecaptcha"]);

mainApp.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	/*$urlRouterProvider.when("/dashboard", "/dashboard/Engr");*/
	$stateProvider
	.state("login",{
		url : "/",
		templateUrl : "views/login.html",
		controller : "loginController"
	})
	.state("dashboard",{
		url : "/dashboard",
		abtract: true,
		resolve : {
			"loginCheck" : function($rootScope, $location){
				if(!$rootScope.successLogin){
					$location.path("/");
				}
			}
		},
		templateUrl : "views/dashboard.html",
		controller : "dashboardController"
	})
	// dashboard, ABC substate 
    .state("dashboard.Engr", {
    	url: "/Engr",	
        templateUrl:"views/graph.html"
        
     })
      .state("dashboard.Mktg", {
    	  url: "/Mktg",	
    	  templateUrl:"views/graph.html"
    		  
      })
       .state("dashboard.Sales", {
    	   url: "/Sales",	
    	   templateUrl:"views/graph.html"
    	   
      })
       .state("dashboard.Total", {
    	url: "/Total",	
        templateUrl:"views/graph.html"
                
       });
	
});
