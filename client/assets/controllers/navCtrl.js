console.log("navCtrl.js");

var app = angular.module('app');

app.controller('navCtrl', ['$scope', '$state', 'usersFactory', function($scope, $state, usersFactory){
  console.log("navCtrl");
  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    $scope.loguser = data; 
    console.log("navCtrl usersFactory getUser, ", data);
  })

  $scope.login = function(){
    var user = {
      password: $scope.logpassword,
      username: $scope.logusername
    }
    usersFactory.login(user, function(data){
      console.log('login data', data);
      if (data === "No user in the database" || data === "Invalid password") {
        swal(data);  
      } else {
        $scope.loguser = data; 
        console.log("$scope.loguser ", $scope.loguser);        

        $state.go('home');
      }
    })
  }

  $scope.logout = function(){
    console.log("Logging out");
    usersFactory.logout(function(){
      $scope.loguser = null;   
      $state.go('home')
    })
  }

}])