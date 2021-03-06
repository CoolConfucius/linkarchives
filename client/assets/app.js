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
  .state('collection', { 
    url: '/collections/:collectionid', templateUrl: 'partials/collection.html', 
    controller: 'collectionCtrl' })
  .state('profile', { 
    url: '/users/:username', templateUrl: 'partials/profile.html', 
    controller: 'profileCtrl' })
  .state('usercollections', { 
    url: '/usercollections/:username', templateUrl: 'partials/usercollections.html', 
    controller: 'profileCtrl' })
  .state('userlinks', { 
    url: '/userlinks/:username', templateUrl: 'partials/userlinks.html', 
    controller: 'profileCtrl' })
  // .state('userfavorites', { 
  //   url: '/userfavorites/:username', templateUrl: 'partials/userfavorites.html', 
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


  $urlRouterProvider.otherwise('/');
});

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