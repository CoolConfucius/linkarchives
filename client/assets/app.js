console.log("appjs");
var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/enter.html'
  })

  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html'
  })

  .when('/user/:name', {
    templateUrl: 'partials/user.html'
  })


  .when('/customers', {
    templateUrl: 'partials/customers.html'
  })
  .when('/products', {
    templateUrl: 'partials/products.html'
  })
  .when('/orders', {
    templateUrl: 'partials/orders.html'
  })
})