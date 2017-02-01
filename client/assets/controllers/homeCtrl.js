var app = angular.module('app');

app.controller('homeCtrl', ['$scope', '$location', 'usersFactory', 'collectionsFactory', 'linksFactory', function($scope, $location, usersFactory, collectionsFactory, linksFactory){
  console.log("homeCtrl");
  $scope.collectionform = true; 
  $scope.newcollection = {
    isclosed: "open",
    isprivate: "public"
  }
  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    console.log("navCtrl usersFactory getUser, ", data);
    if (data) {
      $scope.loguser = data; 
      $scope.newcollection.owner = data.username;
      $scope.username = data.username;
      usersFactory.show($scope.username, function(data){
        console.log("homeCtrl usersFactory show: ");
        console.log("data , ", data);
        $scope.loguser._collections = data._collections; 
      })
    };
  })

  

  $scope.users = [];
  $scope.items = [];
  $scope.newitem = {};

  $scope.togglecollectionform = function(){
    $scope.collectionform = !$scope.collectionform; 
  }


  $scope.addcollection = function(){
    console.log("homeCtrl addcollection: ", $scope.newcollection);
    if ($scope.newcollection.name.length === 0) return swal("Give your collection a name!");
    collectionsFactory.create($scope.newcollection, function(data){
      console.log("homeCtrl collectionsFactory create: ", data);
        $location.url(`collections/${data._id}`);
    })
  }

  $scope.change = function(index){
    console.log("scope change collection id: ", $scope.newlink.collectionid);
    for (var i = $scope.loguser._collections.length - 1; i >= 0; i--) {
      if ($scope.loguser._collections[i]._id === $scope.newlink.collectionid) {
        $scope.newlink.collection = $scope.loguser._collections[i].name;
        console.log("scope change collection name: ", $scope.newlink.collection);
        return;
      }
    };
  }

  $scope.addlink = function(){
    console.log("homeCtrl addlink: ", $scope.newlink);
    if ($scope.newlink.url.length === 0) return swal("Give your link a url!");
    linksFactory.create($scope.newlink, function(data){
      console.log("homeCtrl linksFactory create: ", data);
        $location.url(`collections/${data.collectionid}`);
    })
  }


  $scope.additem = function(){
    console.log($scope.newitem.taguser);
    if (!$scope.newitem.taguser) $scope.newitem.taguser = $scope.loggedinuser.name;
    console.log("create new item in homeCtrl!", $scope.newitem);
    itemsFactory.create($scope.newitem, function(data){
      console.log("returned item: ", data);
    })
  }

  console.log($scope.users);


  $scope.toggle = function(id){
    console.log("dashboard toggle!", id);
    itemsFactory.toggle(id, function(data){
      console.log("data: ", data);
    })
  }

}])
