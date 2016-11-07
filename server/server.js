var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('./config/config');

var port = 3000;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userCtrl = require('./controllers/userCtrl'),
  restaurantCtrl = require('./controllers/restaurantCtrl'),
  waitlistCtrl = require('./controllers/waitlistCtrl'),
  twilioCtrl = require('./controllers/twilioCtrl');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/../www'));

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Mongo connected at ' + config.db);
});

var authorize = function(roles) {
  return function(req, res, next) {
    var authHeader = req.header('Authorization');
    if (authHeader) {
      var token = authHeader.split(' ').pop();
      jwt.verify(token, config.secretKey, function(err, payload) {
        if (err)
          res.status(401).send('Authorization Issue');
        else {
          if (roles.indexOf(payload.role) === -1) res.status(401).send('Unauthorized');
          else next();
        }
      });
    }
    else res.status(401).send('Unauthenticated');
  };
};

// PROTECTED TEST ROUTE
app.get('/protected', authorize(['restaurant']), function(req, res) {
  res.status(200).json('Auth worked!');
});

require('./authentication/AuthenticationRoute')(app);
require('./restaurant/RestaurantRoute')(app);
require('./user/UserRoute')(app);
require('./waitlist/WaitlistRoute')(app);

io.on('connection', function(socket) {
  socket.on('newPerson', function(data) {
    io.emit('newPersonAdded', data);
  });
  socket.on('deletePerson', function(data) {
    io.emit('deletedPerson', data);
  });
});

http.listen(port, function() {
  console.log("listening on port ", port);
});
