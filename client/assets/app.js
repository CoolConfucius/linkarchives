console.log("appjs");
var app = angular.module('app', ["ui.router", "ngStorage"]);
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', { 
    url: '/', templateUrl: 'partials/home.html', 
    controller: 'homeCtrl' })
  .state('register', { 
    url: '/register', templateUrl: 'partials/register.html', 
    controller: 'registerCtrl' })
  .state('addlink', { 
    url: '/addlink', templateUrl: 'partials/addlink.html', 
    controller: 'navCtrl' })
  // .state('story', { 
  //   url: '/story/:storyid', templateUrl: 'partials/story.html', 
  //   controller: 'storyCtrl' })
  // .state('snippet', { 
  //   url: '/snippet/:snippetid', templateUrl: 'partials/snippet.html', 
  //   controller: 'snippetCtrl' })
  // .state('profile', { 
  //   url: '/profile/:profilename', templateUrl: 'partials/profile.html', 
  //   controller: 'profileCtrl' })
  // .state('userstories', { 
  //   url: '/userstories/:profilename', templateUrl: 'partials/userstories.html', 
  //   controller: 'profileCtrl' })
  // .state('usersnippets', { 
  //   url: '/usersnippets/:profilename', templateUrl: 'partials/usersnippets.html', 
  //   controller: 'profileCtrl' })
  // .state('userfavorites', { 
  //   url: '/userfavorites/:profilename', templateUrl: 'partials/userfavorites.html', 
  //   controller: 'profileCtrl' })

  // .state('/', {
  //   templateUrl: 'partials/home.html'
  // })

  // .state('/dashboard', {
  //   templateUrl: 'partials/dashboard.html'
  // })

  // .state('/user/:name', {
  //   templateUrl: 'partials/user.html'
  // })


  // .state('/customers', {
  //   templateUrl: 'partials/customers.html'
  // })
  // .state('/products', {
  //   templateUrl: 'partials/products.html'
  // })
  // .state('/orders', {
  //   templateUrl: 'partials/orders.html'
  // })
})

app.run(function($rootScope, usersFactory){
  console.log("App.run! ");
  usersFactory.getUser(function(data){
    $rootScope.rootuser = data; 
  }); 
})


// app.run(function(Auth, Story, $rootScope){
//   Auth.user();
//   Story.stories();
//   $rootScope.stories = Story.data; 
// });