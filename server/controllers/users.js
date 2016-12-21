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
    // var user = new User({
    //   name: req.body.name,
    //   _items: [] 
    // });
    // user.save(function(err, user){
    //   if(err){
    //     console.log(err);
    //     console.log('create method saving user');
    //   } else {
    //     console.log('successfully added a user!');        
    //     console.log(user);
          
    //     res.json(user);
    //   }
    // })
  };

  

  this.login = function(req, res){
    console.log("UsersController Login: ", req.params);
    console.log(req.params.name);
    User.findOne({name: req.params.name}, function(err, user){
      if (err || !user) {
        console.log("err or no user: ", err, user);
        res.json({nouser: true});
        res.end();
      } else {
        console.log("user: ", user);
        res.json(user);
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
    var edituser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    User.findOneAndUpdate({_id: req.params.id}, edituser, function(err, user){
      res.json(user);
    })

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
    User.findOne({name: req.params.name})
    .populate('_items')
    .exec(function(err, user){
      res.json(user);
    })
  };
}
module.exports = new UsersController();