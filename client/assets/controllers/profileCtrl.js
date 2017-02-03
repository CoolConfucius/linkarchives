console.log("profileCtrl.js");

var app = angular.module('app');

app.controller('profileCtrl', ['$scope', '$state', 'usersFactory', 'collectionsFactory', function($scope, $state, usersFactory, collectionsFactory){
  console.log("profileCtrl");
  console.log("params", $state.params);
  $scope.sameuser = false; 
  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    $scope.loguser = data; 
    console.log("navCtrl usersFactory getUser, ", data);
  }) 
  $scope.profileuser = null; 
  
  usersFactory.show($state.params.username, function(data){
    console.log("profileCtrl usersFactory show: ");
    console.log("data , ", data);
    $scope.profileuser = data; 
    $scope.editobj = {
      imageurl: data.imageurl,
      summary: data.summary,
      age: data.age, 
      birthday: data.birthday,
      gender: data.gender,
      location: data.location,
      interests: data.interests,
      email: data.email
    }
  })

  if ($state.params.username === $scope.loguser.username) {
    console.log("Profileuser same as LoggedinUser");
    $scope.sameuser = true; 
  } 

  $scope.isediting = false; 
  $scope.editprofile = function(){
    $scope.isediting = !$scope.isediting; 
  }

  $scope.savechanges = function(editobj){
    if (!$scope.isediting) return;    
    usersFactory.edit($scope.profileuser.username, $scope.editobj, 
      function(){
        $scope.profileuser.imageurl = editobj.imageurl;
        $scope.profileuser.summary = editobj.summary;
        $scope.profileuser.age = editobj.age;
        $scope.profileuser.birthday = editobj.birthday;
        $scope.profileuser.gender = editobj.gender;
        $scope.profileuser.location = editobj.location;
        $scope.profileuser.interests = editobj.interests;
        $scope.profileuser.email = editobj.email;
        $scope.isediting = false;
      }
    )
  }

}])