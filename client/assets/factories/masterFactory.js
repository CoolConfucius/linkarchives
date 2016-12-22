console.log('Master Factory');

app.factory('usersFactory', ['$http', '$localStorage', '$rootScope', function($http, $localStorage, $rootScope){
  console.log("usersFactory");
  console.log("$localStorage in usersFactory: ", $localStorage);
  var users = []; 
  var loguser = null; 
  if ($localStorage.token && $localStorage.token.username) {
    loguser = $localStorage.token; 
    console.log("loguser: ", loguser);
  }; 

  function UsersFactory(){
    
    this.register = function(newuser, callback){
      console.log("factory registering user");
      $http.post('/users/register', newuser).then(function(returned_data){
        console.log("returned_data: ", returned_data);
        // the returned_data is the token! 

        if (returned_data.data == "Username already taken") {
          console.log("Username already taken. ");
          callback(returned_data.data);
        } else if (typeof(callback) == 'function'){
          var untoken = returned_data.config.data; 
          untoken.password = null; 
          loguser = untoken; 
          $localStorage.token = untoken; 
          $rootScope.rootuser = untoken; 
          users.push(loguser); 
          console.log("users and loguser: ", users, loguser);
          callback(loguser);
        }
      });
    }

    this.login = function(user, callback){
      console.log('usersFactory login, ');
      console.log(user);
      $http.post(`/users/login`, user).then(function(data){
        console.log("login data: ", data);
        if (data.data === "No user in the database" || data.data === "Invalid password") {
          callback(data.data);
        } else if (typeof(callback) == 'function'){
          var untoken = data.config.data; 
          untoken.password = null; 
          loguser = untoken; 
          $localStorage.token = untoken; 
          $rootScope.rootuser = untoken; 
          console.log("loguser: ", loguser);
          callback(loguser);
        }
      })
    };

    this.logout = function(callback){
      console.log('usersFactory logout ');
      loguser = null; 
      $localStorage.token = null; 
      $rootScope.rootuser = null; 
      callback();
    };

    this.index = function(callback){
      $http.get('/users').then(function(returned_data){
        console.log(returned_data.data);
        users = returned_data.data;
        callback(users);
      });

    };
    
    this.show = function(username, callback){
      $http.get(`/users/${username}`).then(function(data){
        console.log("usersFactory show data: ", data);
        var profileuser = data.data; 
        callback(profileuser); 
      })
    };

    this.edit = function(username, editobj, callback){

      $http.put(`/users/${username}`, editobj).then(function(data){
        console.log("usersFactory show data: ", data);
        var profileuser = data.data; 
        callback(profileuser); 
      })
    }
    
    this.getUsers = function(callback){
      callback(users);
    };
    this.getUser = function(callback){
      callback(loguser);
    };
  }

  return new UsersFactory();
}])

app.factory('collectionsFactory', ['$http', function($http){
  var collections = []; 
  var collection = {}; 

  function CollectionsFactory(){

    this.show = function(collectionid, callback){
      $http.get(`/collections/${collectionid}`).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    }

    this.create = function(newcollection,callback){
      $http.post('/collections', newcollection).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };

    this.toggle = function(id, callback){ 
      $http.put(`/collections/${id}`).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };


    this.index = function(callback){
      console.log("collections factory index method");
      $http.get('/collections').then(function(returned_data){
        console.log("collections factory get collections: ", returned_data.data);
        collections = returned_data.data;
        callback(collections);
      });

    };

    this.getCollections = function(callback){
      callback(collections);
    };
    this.getCollection = function(callback){
      callback(collection);
    };
  }
  
  return new CollectionsFactory();
}])




app.factory('linksFactory', ['$http', function($http){
  var links = []; 
  var link = {}; 
  function LinksFactory(){

    this.create = function(newlink, callback){
      $http.post('/links', newlink).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };

    this.toggle = function(id, callback){ 
      $http.put(`/links/${id}`).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };


    this.index = function(callback){
      console.log("links factory index method");
      $http.get('/links').then(function(returned_data){
        console.log("links factory get links: ", returned_data.data);
        links = returned_data.data;
        callback(links);
      });

    };

    this.getLinks = function(callback){
      callback(links);
    };
    this.getLink = function(callback){
      callback(link);
    };
  }
  
  return new LinksFactory();
}])