console.log('links controller js');

var mongoose = require('mongoose');
var Link = mongoose.model('Link');
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
    var ownerid, owner; 
    var link = new Link({
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
          user._links.push(link); 
          taguser._links.push(link); 
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
                  link.save(function(err, link){
                    if(err){
                      console.log(err);
                      console.log('create method saving link');
                    } else {
                      console.log('successfully added a link!');
                      console.log(link);
                      res.json(link);
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
          user._links.push(link);  
          user.save(function(err, user){
            if(err){
              console.log('err in create method saving user', err);
            } else {
              console.log('successfully saved a user! ', user);
              link.save(function(err, link){
                if(err){
                  console.log(err);
                  console.log('create method saving link');
                } else {
                  console.log('successfully added a link!');
                  console.log(link);
                  res.json(link);
                }
              })
            }
          })
        })
      }
    })

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