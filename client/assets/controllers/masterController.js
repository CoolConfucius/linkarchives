console.log("masterCtrl");

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






