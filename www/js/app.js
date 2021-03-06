// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
 	var db = null;
 
angular.module('starter', ['ionic', 'ngCordova'])


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
		
	
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http,$cordovaSQLite,$location, $rootScope) {
	// $ionicPlatform.ready() {
        // All your plugin calls here
        //window.openDatabase({ name: "my.db" });
        // db = window.openDatabase({ name: "my.db", bgType: 1 });
       // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    //}

  $scope.insert = function() {
  alert("Call Method"+db);
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, ['Enamul', 'Haque']).then(function(res) {
		 alert("Insert Method");
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
		 alert("Failure");
            console.error(err);
        });
    }
 
    $scope.select = function() {
	 alert("Call Method"+db);
        var query = "SELECT firstname, lastname FROM people ";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
			 alert("Select Method");
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
			 alert("Error Method");
        });
    }
})
.controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {

})

   .run(function($ionicPlatform, $cordovaSQLite,$rootScope) {
  // alert("dddd");
        $ionicPlatform.ready(function() {
        		alert("ready");
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
			//SQLite database
		//	db = $cordovaSQLite.openDB("my.db", 1);
		
		//alert("db under");	
			  //db.transaction((tx) {})
            // $cordovaSQLite.openDB({ name: "my.db" });
        // $rootScope.db1 = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });
        // $cordovaSQLite.execute(  $rootScope.db1, "CREATE TABLE IF NOT EXISTS people (firstname text, lastname text)");
        
        	if (window.cordova && window.cordova.plugins.sqliteplugin) {
        		alert("device");
      db = $cordovaSQLite.openDB({ name: "my.db" }); //device
       $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (firstname text, lastname text)");
    }else{
	alert("browser");
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
      
    }
		
        });
    });
