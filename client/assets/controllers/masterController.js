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
  // console.log("scope: ", $scope);
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

app.controller('homeCtrl', ['$scope', '$location', 'usersFactory', 'itemsFactory', function($scope, $location, usersFactory, itemsFactory){
  console.log("homeCtrl");
  $scope.collectionform = true; 
  
  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    $scope.loguser = data; 
    console.log("navCtrl usersFactory getUser, ", data);
  })
  $scope.users = [];
  $scope.items = [];
  $scope.newitem = {};

  $scope.togglecollectionform = function(){
    $scope.collectionform = !$scope.collectionform; 
  }

  // function gotoRegister(){
  //   if (!$scope.loguser) {
  //     alert("Register to add a collection!");
  //     $location.url('/register');
  //   };
  // }

  $scope.addcollection = function(){
    
    // console.log($scope.newitem.taguser);
    // if (!$scope.newitem.taguser) $scope.newitem.taguser = $scope.loggedinuser.name;
    // console.log("create new item in homeCtrl!", $scope.newitem);
    // itemsFactory.create($scope.newitem, function(data){
    //   console.log("returned item: ", data);
    // })
  }

  // usersFactory.getUser(function(data){
  //   $scope.loggedinuser = data; 
  //   $scope.newitem.user = data.name; 
  // })
  // usersFactory.getUsers(function(data){
  //   if (data.length) {
  //     $scope.users = data; 
  //   } else {
  //     usersFactory.index(function(data){
  //       $scope.users = data; 
  //     })
  //   }
  // })

  // itemsFactory.getItems(function(data){
  //   if (data.length) {
  //     $scope.items = data; 
  //   } else {
  //     itemsFactory.index(function(data){
  //       $scope.items = data; 
  //     })
  //   }
  // })

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

app.controller('profileCtrl', ['$scope', '$state', 'usersFactory', 'itemsFactory', function($scope, $state, usersFactory, itemsFactory){
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
  })

  if ($state.params.username === $scope.loguser.username) {
    console.log("Profileuser same as LoggedinUser");
    $scope.sameuser = true; 
  } 


  $scope.toggle = function(id){
    console.log("toggle!", id);
    itemsFactory.toggle(id, function(data){
      console.log("data: ", data);
      for (var i = $scope.profileuser._items.length - 1; i >= 0; i--) {
        if ($scope.profileuser._items[i]._id === id) {
          $scope.profileuser._items[i].done = !$scope.profileuser._items[i].done;
          break; 
        }
      }
    })
  }

}])









app.controller('customersCtrl', ['$scope', '$location', 'customersFactory', function($scope, $location, customersFactory){
  console.log("customersCtrl");
  $scope.newcustomer = {};
  $scope.customers = [];

  customersFactory.index(function(data){
    $scope.customers = data; 
  })
  $scope.addcustomer = function(){
    console.log("addcustomer");
    customersFactory.create($scope.newcustomer, function(newcustomer){
      $scope.customers.push(newcustomer);
      $scope.newcustomer = {}
    })
  }

  $scope.removecustomer = function(index){
    console.log($scope.customers[index]);
    var id = $scope.customers[index]._id; 
    customersFactory.delete(id, function(){
      $scope.customers.splice(index, 1);
      // $scope.customers = data; 
    })
  }

}])


app.controller('productsCtrl', ['$scope', '$location', 'productsFactory', function($scope, $location, productsFactory){
  console.log("productsCtrl");
  $scope.newproduct = {};
  $scope.products = [];

  productsFactory.index(function(data){
    $scope.products = data; 
  })
  $scope.addproduct = function(){
    console.log("addproduct");
    productsFactory.create($scope.newproduct, function(newproduct){
      $scope.products.push(newproduct);
      $scope.newproduct = {};
    })
  }

  $scope.removeproduct = function(index){
    console.log($scope.products[index]);
    var id = $scope.products[index]._id; 
    productsFactory.delete(id, function(){
      $scope.products.splice(index, 1);
      // $scope.products = data; 
    })
  }

  $scope.disableFilter = true; 
  $scope.filtertoggle = function(){
    $scope.disableFilter = !$scope.disableFilter; 
  }
}])

app.controller('ordersCtrl', ['$scope', '$location', 'customersFactory', 'productsFactory', 'ordersFactory', function($scope, $location, customersFactory, productsFactory, ordersFactory){
  console.log("ordersCtrl");
  $scope.customers = [];
  $scope.products = []; 
  customersFactory.index(function(data){
    $scope.customers = data; 
  })
  productsFactory.index(function(data){
    $scope.products = data; 
    $scope.currentproduct = data[0]; 
  })

  $scope.orders = []; 

  ordersFactory.index(function(data){
    $scope.orders = data; 
  })

  $scope.currentmax; 
  $scope.change = function(index){
    console.log($scope.neworder.product);
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      if ($scope.products[i]._id === $scope.neworder.product) {
        $scope.currentmax = $scope.products[i].quantity;
        console.log($scope.currentmax);
        return;
      }
    };
  }

  $scope.scope = function(){
    console.log();
  }

  $scope.addorder = function(){
    console.log("addorder ", $scope.neworder);
    ordersFactory.create($scope.neworder, function(neworder){
      $scope.orders.push(neworder);
      $scope.neworder = {};
    })
  }  

}])



// app.controller('homeCtrl', ['$scope', '$location', 'customersFactory', 'productsFactory', 'ordersFactory', function($scope, $location, customersFactory, productsFactory, ordersFactory){
//   console.log("homeCtrl");
//   $scope.customers = [];
//   $scope.products = []; 
//   $scope.orders = []; 
  
//   customersFactory.index(function(data){
//     $scope.customers = data; 
//   })
//   productsFactory.index(function(data){
//     $scope.products = data; 
//   })
//   ordersFactory.index(function(data){
//     $scope.orders = data; 
//   })

// }])
