console.log('orders controller');

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');

function OrdersController(){
  this.index = function(req, res){
    Order.find({})
    .populate(['_cutomers', '_products'])
    .exec(function(err, orders){
      res.json(orders);
    })
  };
  this.create = function(req, res){
    console.log("orders create: ", req.body);
    Customer.findOne({_id: req.body.customer}, function(err, customer){
      if (err || !customer) { console.log("customer find one err or not found, ", err);}
      console.log("customer : ", customer);

 
      Product.findOne({_id: req.body.product}, function(err, product){
        if (err || !product) { console.log("product find one err or not found, ", err);}
        console.log("product : ", product);
        
        var order = new Order({
          _customer: req.body.customer, 
          _product: req.body.product, 
          quantity: req.body.quantity, 
          customer: customer.name,
          product: product.name
        });
        order.save(function(err, order){
          if(err){
            console.log(err);
            console.log('create method saving order');
          } else {
            console.log('successfully added a order!');
            
            product.quantity = product.quantity - order.quantity; 

            if (product.quantity < 0) {
              console.log("Negative quantity! There's an error!, ", product.quantity);
            }
            if (product.quantity === 0) {};


            console.log(order);
            product.save(function(err, product){
              if(err){
                console.log(err);
                console.log('create method saving product');
              } else {
                console.log('successfully saved a product!');
                console.log(product);
                
                res.json(order);
              }
            })            
            // res.json(order);
          }
        })

      })
    })



  };
  this.update = function(req, res){
    var editorder = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Order.findOneAndUpdate({_id: req.params.id}, editorder, function(err, order){
      res.json(order);
    })

  };
  this.delete = function(req, res){
    console.log("orders delete req params ", req.params);
    Order.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in orders.js');
      } else { 
        console.log('successfully removed a order!');
        // res.redirect('/');
        res.end(); 
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Order.findOne({_id: req.params.id}, function(err, order){
      res.json(order);
    })
  };
}
module.exports = new OrdersController();