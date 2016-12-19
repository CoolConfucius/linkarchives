console.log('customers controller');

var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

function CustomersController(){
  this.index = function(req, res){
    Customer.find({}, function(err, customers){
      res.json(customers);
    })
  };
  this.create = function(req, res){
    console.log(req.body);
    var customer = new Customer({
      name: req.body.name
    });
    customer.save(function(err, customer){
      if(err){
        console.log(err);
        console.log('create method saving customer');
      } else {
        console.log('successfully added a customer!');
        console.log(customer);
        res.json(customer);
      }
    })
  };
  this.update = function(req, res){
    var editcustomer = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Customer.findOneAndUpdate({_id: req.params.id}, editcustomer, function(err, customer){
      res.json(customer);
    })

  };
  this.delete = function(req, res){
    console.log("customers delete req params ", req.params);
    Customer.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in customers.js');
      } else { 
        console.log('successfully removed a customer!');
        // res.redirect('/');
        res.end(); 
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Customer.findOne({_id: req.params.id}, function(err, customer){
      res.json(customer);
    })
  };
}
module.exports = new CustomersController();