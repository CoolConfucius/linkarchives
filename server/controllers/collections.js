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
    var collection = req.body; 
    var owner; 
    if (collection.owner) {
      owner = req.body.owner; 
    } else {
      owner = "Anonymous"; 
    }

    var isclosed = (collection.isclosed === 'closed') ? true : false; 
    var isprivate = (collection.isprivate === 'private') ? true : false; 

    var newcollection = new Collection({
      name: collection.name, 
      description: collection.description, 
      isclosed: isclosed, 
      isprivate: isprivate, 
      owner: owner
    });
    newcollection.save(function(err, savedCollection) {
      if (err) return cb(err);
      if (savedCollection.owner) {
        User.findOne({username: savedCollection.owner}, function(err, user){
          if (err || !user) res.send('user not found', null);
          user._collections.push(savedCollection._id);
          user.save(function(err, savedUser){
            res.json(savedCollection);  
          })
        })
      } else res.json(savedCollection);
    });

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
    console.log("Collection show: ", req.params);
    Collection.findOne({_id: req.params.id})
    .populate('_links')
    .exec(function(err, collection){
      console.log("Found one!: ", collection);
      res.json(collection);
    })
  };
}

module.exports = new CollectionsController();