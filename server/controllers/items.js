console.log('items controller');

var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

function ItemsController(){
  this.index = function(req, res){
    Item.find({}, function(err, items){
      res.json(items);
    })
  };
  this.create = function(req, res){
    console.log("create item: ", req.body);
    var item = new Item({
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
          user._items.push(item); 
          taguser._items.push(item); 
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
                  item.save(function(err, item){
                    if(err){
                      console.log(err);
                      console.log('create method saving item');
                    } else {
                      console.log('successfully added a item!');
                      console.log(item);
                      res.json(item);
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
          user._items.push(item);  
          user.save(function(err, user){
            if(err){
              console.log('err in create method saving user', err);
            } else {
              console.log('successfully saved a user! ', user);
              item.save(function(err, item){
                if(err){
                  console.log(err);
                  console.log('create method saving item');
                } else {
                  console.log('successfully added a item!');
                  console.log(item);
                  res.json(item);
                }
              })
            }
          })
        })
      }

    })

  };

  this.toggle = function(req, res){
    Item.findOne({_id: req.params.id}, function(err, item){
      item.done = !item.done; 
      item.save(function(err, item){
        if(err){
          console.log('toggle method saving item err ', err);
        } else {
          console.log('successfully toggled an item! ', item);
          res.json(item);
        }
      })    
    })

  };

  this.update = function(req, res){
    var edititem = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Item.findOneAndUpdate({_id: req.params.id}, edititem, function(err, item){
      res.json(item);
    })

  };
  this.delete = function(req, res){
    console.log("items delete req params ", req.params);
    Item.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in items.js');
      } else { 
        console.log('successfully removed a item!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Item.findOne({_id: req.params.id}, function(err, item){
      res.json(item);
    })
  };
}
module.exports = new ItemsController();