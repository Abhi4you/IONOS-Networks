'use strict';

var mainApp = angular.module("myApp");


mainApp.controller("dashboardController", function( $scope, $http, $location ){
	
	$scope.chatType = "bar";
	$scope.barChart = function(){
		$scope.chatType = "bar";
	};
	
	$scope.pieChart = function(){
		$scope.chatType = "pie";
	};
	
	$scope.config = {
		    title: '',
		    tooltips: true,
		    labels: false,
		    mouseover: function() {},
		    mouseout: function() {},
		    click: function() {},
		    legend: {
		      display: true,
		      //could be 'left, right'
		      position: 'right'
		    }
		  };
	
	function getJson(url) {
		 return JSON.parse($.ajax({
		     type: 'GET',
		     url: url,
		     dataType: 'json',
		     global: false,
		     async:false,
		     success: function(data) {
		         return data;
		     }
		 }).responseText);
	};
	
	$scope.callEngr = function(){
		$http.get("json/Engr.json").success(function(data) {
				$scope.data = data;
		   }).error(function (data, status, headers, config) {
	        //  Do some error handling here
	    });
	};

	
	$scope.callMktg = function(){
		$http.get("json/Mktg.json").success(function(data) {
			$scope.data = data;
	   }).error(function (data, status, headers, config) {
        //  Do some error handling here
	   });
	};
	
	$scope.callSales = function(){
		$http.get("json/Sales.json").success(function(data) {
			$scope.data = data;
	   }).error(function (data, status, headers, config) {
        //  Do some error handling here
	   });
	};
	
	function addObjects(obj1, obj2) {
	    return obj1.data.map( (o1, i) => Object.assign({}, o1,  
	        { y: o1.y.map( (n1, j) => n1 + obj2.data[i].y[j] ) }
	    ));
	};
	
	/*function saveText(text, filename){
		  var a = document.createElement('a');
		  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
		  a.setAttribute('download', filename);
		  a.click()
	}*/
	
	$scope.callTotal = function(){
		
		var engrJson = getJson('json/Engr.json');
		var mktgJson = getJson('json/Mktg.json');
		

	    var data = {};
	    data["data"] = addObjects(engrJson, mktgJson);
	    console.log("abc :"+JSON.stringify(data));
	    
	    /*saveText( JSON.stringify(data), "../json/Total.json" );
	    console.log("Succesfull..");*/
	   var txtFile = "json/Total.json";
	    var file = new File(txtFile,"write");
	    var stra = JSON.stringify(data);

	    console.log("opening file...");
	    file.open(); 
	    console.log("writing file..");
	    file.writeline(stra);
	    file.close();
  
	    /*$scope.data = JSON.stringify(data);*/
	    	     
	};
		
	$scope.logout = function(){
		$location.path("/");
	};

	

});

