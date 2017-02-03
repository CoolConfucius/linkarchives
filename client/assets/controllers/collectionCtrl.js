console.log("collectionCtrl.js");

var app = angular.module('app');

app.controller('collectionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$localStorage', 'collectionsFactory', 'linksFactory', 'usersFactory', function($scope, $rootScope, $state, $stateParams, $localStorage, collectionsFactory, linksFactory, usersFactory) {
  
  var collectionid = $state.params.collectionid;
  $scope.newlink = {
    collectionid: collectionid
  }
  $scope.editcollectionobj = {}; 
  $scope.showaddedby = true; 
  $scope.toggleshowaddedby = function(){
    $scope.showaddedby = !$scope.showaddedby; 
  }

  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    console.log("collectionCtrl usersFactory getUser, ", data);
    $scope.loguser = data; 
    $scope.newlink.addedby = data.username; 
  }) 

  


  collectionsFactory.show(collectionid, function(res){
    console.log("collectionCtrl collectionsFactory ", res);
    $scope.collection = res; 
    $scope.newlink.collection = res.name; 
    $scope.editcollectionobj = {
      name: res.name, 
      isclosed: res.isclosed ? "closed" : "open", 
      isprivate: res.isprivate ? "private" : "public", 
      description: res.description
    };
  })

  $scope.addlink = function(){    
    var link = $scope.newlink; 
    console.log("collectionCtrl addlink: ", link, $scope.loguser);


    var newObj; 
    var addedby = 'Anonymous';
    if ($scope.loguser) addedby = $scope.loguser.username;    
    newObj = {
      collection: $scope.collection.name, 
      collectionid: collectionid,
      url: link.url, 
      title: link.title, 
      tags: link.tags, 
      description: link.description, 
      addedby: addedby
    }    
    console.log("newObj: ", newObj);
    
    linksFactory.create(newObj, function(savedLink){
      console.log("collectionCtrl linksFactory add: ", savedLink);     
      $scope.collection._links.push(savedLink);
    })
  };

  $scope.iseditcollection = false; 
  $scope.editcollection = function(collection, user){
    console.log("editcollection: ", $scope.iseditcollection);
    if (!$scope.loguser) return;
    console.log($scope.collection, $scope.loguser);
    if ($scope.collection.owner !== $scope.loguser.username) return;    
    $scope.iseditcollection = !$scope.iseditcollection; 
  }

  $scope.savechanges = function(editcollectionobj){    
    collectionsFactory.edit(collectionid, editcollectionobj, function(){
        $scope.collection.name = editcollectionobj.name;
        $scope.collection.description = editcollectionobj.description;
        $scope.collection.isclosed = editcollectionobj.isclosed === "closed";
        $scope.collection.isprivate = editcollectionobj.isprivate === "private";
        $scope.iseditcollection = false; 
    })
  };

  $scope.isdeleting = false; 
  $scope.deletecollection = function(collection, user) {    
    if (!user) return;
    if (collection.startedby !== loguser.username) return;    
    $scope.isdeleting = !$scope.isdeleting; 
  }

  $scope.remove = function(){
    collectionsFactory.remove(collectionid).then(function(){
      $state.go('home');
    })
  }


  // $scope.addfavorite = function(username, collectionid, collectionstarter){
  //   if (username === collectionstarter) return swal("Try favorting other users stories instead of your own.");
  //   collectionsFactory.favorite(username, collectionid).then(function(){
  //     swal("Added to favorites!")
  //     $scope.isfave = true; 
  //   })
  // }

  // $scope.unfave = function(username, collectionid){
  //   collectionsFactory.unfave(username, collectionid).then(function(){
  //     swal("Removed from favorites!")
  //     $scope.isfave = false; 
  //   })
  // }

  
}]);
