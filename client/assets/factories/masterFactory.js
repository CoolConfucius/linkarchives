console.log('Master Factory');

app.factory('usersFactory', ['$http', function($http){
  console.log("usersFactory");
  var users = []; 
  var loggedinuser = {}; 

  function UsersFactory(){
    
    this.register = function(newuser, callback){
      console.log("factory registering user");
      $http.post('/users/register', newuser).then(function(returned_data){
        console.log("returned_data: ", returned_data);
        // the returned_data is the token! 

        if (returned_data.data == "Username already taken") {
          console.log("Username already taken. ");
          callback(returned_data.data);
        };
        if (typeof(callback) == 'function'){
          var untoken = returned_data.config.data; 
          loggedinuser = untoken; 
          users.push(loggedinuser); 
          console.log("users and loggedinuser: ", users, loggedinuser);
          callback(loggedinuser);
        }
      });
    }

    this.login = function(name, callback){
      console.log('usersFactory login, ', name);
      $http.get(`/login/${name}`).then(function(data){
        console.log("login data: ", data);
        if (data.data.nouser) {
          console.log("No existing user, so create one");
          register({name: name}, callback);
        } else {
          loggedinuser = data.data; 
          callback(data.data); 
        }
      })
    };

    this.logout = function(callback){
      console.log('usersFactory logout ');
      loggedinuser = {}; 
      callback();
    };

    this.index = function(callback){
      $http.get('/users').then(function(returned_data){
        console.log(returned_data.data);
        users = returned_data.data;
        callback(users);
      });

    };
    
    this.show = function(name, callback){
      $http.get(`/users/${name}`).then(function(data){
        console.log("show data: ", data);
        var profileuser = data.data; 
        callback(profileuser); 
      })
    };
    
    this.getUsers = function(callback){
      callback(users);
    };
    this.getUser = function(callback){
      callback(loggedinuser);
    };
  }

  return new UsersFactory();
}])

app.factory('itemsFactory', ['$http', function($http){
  var items = []; 
  var item = {}; 
  function ItemsFactory(){
    var _this = this;
    this.create = function(newitem,callback){
      $http.post('/items', newitem).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };

    this.toggle = function(id, callback){ 
      $http.put(`/items/${id}`).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };


    this.index = function(callback){
      console.log("items factory index method");
      $http.get('/items').then(function(returned_data){
        console.log("items factory get items: ", returned_data.data);
        items = returned_data.data;
        callback(items);
      });

    };

    this.getItems = function(callback){
      callback(items);
    };
    this.getItem = function(callback){
        callback(item);
    };
  }
  
  return new ItemsFactory();
}])


