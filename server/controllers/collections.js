console.log('collections controller js');

var mongoose = require('mongoose');
var Collection = mongoose.model('Collection');
var User = mongoose.model('User');

function CollectionsController(){
  console.log("collections controller");
  this.index = function(req, res){
    console.log("collections index");
    Collection.find({}, function(err, collections){
      if(err) res.status(400).send(err);
      res.json(collections);
    })
  };

  this.create = function(req, res){
    console.log("create collection: ", req.body);
    var ownerid, owner; 
    var collection = new Collection({
      title: req.body.title, 
      description: req.body.description, 
      user: req.body.user,
      taguser: req.body.taguser
    });

    User.findOne({name: req.body.user}, function(err, user){
      if (err || !user) { console.log("user find one err or not found, ", err);}
      console.log("found user : ", user);
      if (req.body.user !== req.body.taguser) {
        User.findOne({name: req.body.taguser}, function(err, taguser){
          if (err || !taguser) { console.log("taguser find one err or not found, ", err);}
          console.log("found taguser : ", taguser);
          user._collections.push(collection); 
          taguser._collections.push(collection); 
          taguser.save(function(err, taguser){
            if(err){
              console.log('err in create method saving taguser', err);
            } else {
              console.log('successfully saved a taguser! ', taguser);
              user.save(function(err, user){
                if(err){
                  console.log('err in create method saving user', err);
                } else {
                  console.log('successfully saved a user!', user);
                  collection.save(function(err, collection){
                    if(err){
                      console.log(err);
                      console.log('create method saving collection');
                    } else {
                      console.log('successfully added a collection!');
                      console.log(collection);
                      res.json(collection);
                    }
                  })
                }
              })            
            }
          })
        })


      } else {
        User.findOne({name: req.body.user}, function(err, taguser){
          if (err || !user) { console.log("user find one err or not found, ", err);}
          console.log("found user : ", user);
          user._collections.push(collection);  
          user.save(function(err, user){
            if(err){
              console.log('err in create method saving user', err);
            } else {
              console.log('successfully saved a user! ', user);
              collection.save(function(err, collection){
                if(err){
                  console.log(err);
                  console.log('create method saving collection');
                } else {
                  console.log('successfully added a collection!');
                  console.log(collection);
                  res.json(collection);
                }
              })
            }
          })
        })
      }
    })

  };

  this.toggle = function(req, res){
    Collection.findOne({_id: req.params.id}, function(err, collection){
      collection.done = !collection.done; 
      collection.save(function(err, collection){
        if(err){
          console.log('toggle method saving collection err ', err);
        } else {
          console.log('successfully toggled an collection! ', collection);
          res.json(collection);
        }
      })    
    })
  };

  this.update = function(req, res){
    var editcollection = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Collection.findOneAndUpdate({_id: req.params.id}, editcollection, function(err, collection){
      res.json(collection);
    })

  };
  this.delete = function(req, res){
    console.log("collections delete req params ", req.params);
    Collection.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in collections.js');
      } else { 
        console.log('successfully removed a collection!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Collection.findOne({_id: req.params.id}, function(err, collection){
      res.json(collection);
    })
  };
}

module.exports = new CollectionsController();