console.log('products controller');

var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function ProductsController(){
  this.index = function(req, res){
    Product.find({}, function(err, products){
      res.json(products);
    })
  };
  this.create = function(req, res){
    console.log(req.body);
    var product = new Product({
      name: req.body.name, 
      description: req.body.description, 
      // imageurl: req.body.imageurl, 
      imageurl: 'http://placehold.it/100x100',
      quantity: req.body.quantity 
    });
    product.save(function(err, product){
      if(err){
        console.log(err);
        console.log('create method saving product');
      } else {
        console.log('successfully added a product!');
        console.log(product);
        res.json(product);
      }
    })
  };
  this.update = function(req, res){
    var editproduct = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Product.findOneAndUpdate({_id: req.params.id}, editproduct, function(err, product){
      res.json(product);
    })

  };
  this.delete = function(req, res){
    console.log("products delete req params ", req.params);
    Product.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in products.js');
      } else { 
        console.log('successfully removed a product!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Product.findOne({_id: req.params.id}, function(err, product){
      res.json(product);
    })
  };
}
module.exports = new ProductsController();