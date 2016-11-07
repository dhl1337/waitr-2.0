var Waitlist = require('../models/WaitlistModel'),
  User = require('../models/UserModel'),
  jwt = require('jsonwebtoken');

module.exports = {
  register: function (req, res) {
    function regCust(req, res) {
      if (req.body.restaurant_id) {
        req.body.role = 'restaurant';
      }
      var newUser = new User(req.body);
      newUser.password = newUser.generateHash(req.body.password);
      newUser.save(function (err, user) {
        if (err)
          res.status(500).send(err);
        else {
          var payload = user.toObject();
          var token = jwt.sign(payload, config.secretKey); // { expiresIn: 600 } expires in 10 minutes
          res.status(200).json({
            token: token
          });
        }
      });
    }

    if (req.body.restaurantName) {
      var newRestaurant = new Restaurant({restaurantName: req.body.restaurantName});
      newRestaurant.save(function (err, restaurant) {
        if (err)
          res.status(500).send(err);
        else {
          var newWaitlist = new Waitlist({restaurant_id: restaurant._id});
          newWaitlist.save(function (err, waitlist) {
            Restaurant.findByIdAndUpdate(restaurant._id, {$set: {waitlist_id: waitlist._id}}, function (err, restaurant) {
              if (err)
                res.status(500).send(err);
              else {
                req.body.restaurant_id = restaurant._id;
                regCust(req, res);
              }
            });
          });
        }
      });
    } else {
      regCust(req, res);
    }
  },

  login: function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (user) {
        if (!user.validPassword(req.body.password))
          res.status(401).send('Wrong password. Try again');
        else {
          var payload = user.toObject();
          var token = jwt.sign(payload, config.secretKey, {expiresIn: 3600});
          res.status(200).json({
            token: token
          });
        }
      }
      else res.status(401).send('User not found');
    });
  }
};
