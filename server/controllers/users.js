console.log('users controller');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');
var jwt = require('jwt-simple');

var User = mongoose.model('User');
// var Item = mongoose.model('Item');

function UsersController(){
  this.index = function(req, res){
    User.find({})
    // .populate('_items')
    .exec(function(err, users){
      res.json(users);
    })
  };


  this.create = function(req, res){
    console.log("users create: ", req.body);
    var user = req.body; 
    var username = user.username;
    var password = user.password;
    // console.log("Here: ", username, password);
    User.findOne({username: username}, function(err, user){
      console.log("Finding existing user");
      if(user){
        console.log("Username already taken : ", user);
        res.send("Username already taken");
      } else {
        console.log("Generating salt");
        bcrypt.genSalt(10, function(err1, salt) {
          bcrypt.hash(password, salt, null, function(err2, hash) {
            if(err1 || err2) res.send(err1 || err2);
            
            var newUser = new User();
            newUser.username = username;
            newUser.password = hash;
            newUser.save(function(err, savedUser){
              if (err) res.send(err);
              savedUser.password = null;          
              var token = savedUser.token(); 
              // res.status(200).send(token); 
              res.status(200).json(token); 
              // res.status(200).json(savedUser); 
              
            });
          });
        });
      }
    })
    
  };

  

  this.login = function(req, res){
    console.log("UsersController Login: ", req.body);
    
    User.findOne({username: req.body.username}, function(err, dbUser){
      if (err || !dbUser) {
        console.log("err or no dbUser: ", err, dbUser);
        // res.status(401).send(err);
        // res.status(401).json({nouser: true});
        res.send("No user in the database");
      } else {
        console.log("found dbUser: ", dbUser);
        bcrypt.compare(req.body.password, dbUser.password, function(err, isGood){
          if (err || !isGood) {
            // res.status(401).send('invalid username or password'); 
            res.send('Invalid password'); 
          } else {
            console.log("Password is good! ");
            dbUser.password = null; 
            var token = dbUser.token(); 
            res.status(200).json(token); 
          }
        })
      }
    })
  };

  // this.create = function(req, res){
  //   console.log("users create: ", req.body);
  //   var user = new User({
  //     name: req.body.name,
  //     _items: [] 
  //   });
  //   user.save(function(err, user){
  //     if(err){
  //       console.log(err);
  //       console.log('create method saving user');
  //     } else {
  //       console.log('successfully added a user!');        
  //       console.log(user);
          
  //       res.json(user);
  //     }
  //   })
  // };
  this.update = function(req, res){
    console.log("req body and req params", req.body, req.params);
    var username = req.params.username; 
    var userObj = req.body; 
    User.findOne({username: username}, function(err, user){
      if(err) res.status(400).send(err); 
      user.imageurl = userObj.imageurl; 
      user.summary = userObj.summary; 
      user.age = userObj.age; 
      user.birthday = userObj.birthday; 
      user.gender = userObj.gender; 
      user.interests = userObj.interests; 
      user.email = userObj.email; 
      user.location = userObj.location; 
      user.save(function(err, savedUser){
        user.password = null; 
        if (err) res.status(400).send(err);
        res.json(savedUser);
      })
    });
  };
  this.delete = function(req, res){
    console.log("users delete req params ", req.params);
    User.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in users.js');
      } else { 
        console.log('successfully removed a user!');
        // res.redirect('/');
        res.end(); 
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    User.findOne({username: req.params.username})
    .populate('_collections')
    .exec(function(err, user){
      res.json(user);
    })
  };
}
module.exports = new UsersController();