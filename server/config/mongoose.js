console.log('mongoose connection and model loading');
var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    models_path = path.join(__dirname, './../models'),
    reg = new RegExp(".js$", "i"),
    dbURI = process.env.MONGODB_URI || 'mongodb://localhost/linkarchives';


mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log(`Mongoose default connection open to ${ dbURI }`);
});
mongoose.connection.on('error', function(err){
  console.error(`Mongoose default connection error: ${ err }`);
});
mongoose.connection.on('disconnected', function(){
  console.log( 'Mongoose default connection disconnected' );
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exist(0);
  })
})

// fs.readdirSync(models_path).forEach(function(file){
//   if(file.indexOf('.js') >= 0){
//     require(models_path + '/' + file); 
//   }
// })

fs.readdirSync(models_path).forEach(function(file){
  if(reg.test(file)){
    require(path.join(models_path, file));
  }
})