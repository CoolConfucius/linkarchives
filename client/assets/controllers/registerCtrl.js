console.log("registerCtrl.js");

var app = angular.module('app');

app.controller('registerCtrl', ['$scope', '$state', '$localStorage', 'usersFactory', function($scope, $state, $localStorage, usersFactory){
  console.log("registerCtrl");
  $scope.username = '';

  $scope.register = function(){
    if ($scope.regpassword !== $scope.regconfirmpassword) {
      swal("Passwords not the same!");
      return;
    };
    var user = {
      username: $scope.regusername,
      password: $scope.regpassword
    }
    usersFactory.register(user, function(data){
      console.log("user controller factory register", data);
      if (data === "Username already taken") {
        swal("Username already taken!");  
      } else {
        $scope.loguser = data; 
        $state.go('home');
      }
    })
  }
}])
