console.log('routes js');
var users = require('./../controllers/users.js');
var collections = require('./../controllers/collections.js');
var links = require('./../controllers/links.js');
// var authMiddleware = require('../config/auth');

// var items = require('./../controllers/items.js');

module.exports = function(app){

  app.get('/users', users.index)
  app.post('/users/register', users.create)
  app.post('/users/login', users.login)
  
  // app.get('/login/:name', users.login)
  
  // app.get('/login/:name', users.login)
  app.get('/users/:name', users.show)
  // app.get('/users/:id', users.show)
  app.post('/users', users.create)
  app.put('/users/:id', users.update)
  app.delete('/users/:id', users.delete)
  
  // app.get('/users/checkfave/:username/:collectionid', authMiddleware, users.checkfave);
  // app.put('/users/addfave/:username/:collectionid', authMiddleware, users.addfave);
  // app.put('/users/unfave/:username/:collectionid', authMiddleware, users.unfave);



  app.get('/collections', collections.index)
  app.get('/collections/:id', collections.show)
  app.post('/collections', collections.create)
  app.put('/collections/:id', collections.update)
  app.delete('/collections/:id', collections.delete)

  app.get('/links', links.index)
  app.get('/links/:id', links.show)
  app.post('/links', links.create)
  app.put('/links/:id', links.update)
  app.delete('/links/:id', links.delete)


  // app.get('/items', items.index)
  // app.get('/items/:id', items.show)
  // app.post('/items', items.create)
  // // app.put('/items/:id', items.update)
  // app.put('/items/:id', items.toggle)
  // app.delete('/items/:id', items.delete)


}