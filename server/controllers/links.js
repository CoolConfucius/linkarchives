console.log('links controller js');

var mongoose = require('mongoose');
var Link = mongoose.model('Link');
var Collection = mongoose.model('Collection');
var User = mongoose.model('User');

function LinksController(){
  console.log("links controller");
  this.index = function(req, res){
    console.log("links index");
    Link.find({}, function(err, links){
      if(err) res.status(400).send(err);
      res.json(links);
    })
  };

  this.create = function(req, res){
    console.log("create link: ", req.body);
    var link = req.body; 
    var newlink = new Link({
      collection: link.collection,
      collectionid: link.collectionid,
      url: link.url,
      title: link.title,
      description: link.description,
      tags: link.tags,
      addedby: link.addedby
    });
    newlink.save(function(err, savedLink) {
      console.log("newlink save: ,", err, savedLink);
      if (err) res.send(err);
      
      Collection.findById(savedLink.collectionid, function(err, collection){
        if (err || !collection) return res.status(400).send(err); 
        collection._links.push(savedLink._id);
        
        
        collection.recentby = savedLink.addedby; 
        collection.save(function(err, savedStory){
          if (savedLink.userid) {
            User.findById(savedLink.userid, function(err, user){
              if (err || !user) return res.status(400).send(err); 
              user._links.push(savedLink._id);
              user.save(function(err, savedUser){
                res.send(savedLink);
              })
            })
          } else 
          res.json(savedLink);
        })
      })

    });
  };

  this.toggle = function(req, res){
    Link.findOne({_id: req.params.id}, function(err, link){
      link.done = !link.done; 
      link.save(function(err, link){
        if(err){
          console.log('toggle method saving link err ', err);
        } else {
          console.log('successfully toggled an link! ', link);
          res.json(link);
        }
      })    
    })
  };

  this.update = function(req, res){
    var editlink = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Link.findOneAndUpdate({_id: req.params.id}, editlink, function(err, link){
      res.json(link);
    })

  };
  this.delete = function(req, res){
    console.log("links delete req params ", req.params);
    Link.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in links.js');
      } else { 
        console.log('successfully removed a link!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Link.findOne({_id: req.params.id}, function(err, link){
      res.json(link);
    })
  };
}

module.exports = new LinksController();