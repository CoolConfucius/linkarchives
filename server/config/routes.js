console.log('future routes');
var users = require('./../controllers/users.js');
var items = require('./../controllers/items.js');

module.exports = function(app){

  app.get('/users', users.index)
  app.get('/login/:name', users.login)
  
  app.get('/users/:name', users.show)
  // app.get('/users/:id', users.show)
  app.post('/users', users.create)
  app.put('/users/:id', users.update)
  app.delete('/users/:id', users.delete)


  app.get('/items', items.index)
  app.get('/items/:id', items.show)
  app.post('/items', items.create)
  // app.put('/items/:id', items.update)
  app.put('/items/:id', items.toggle)
  app.delete('/items/:id', items.delete)


}