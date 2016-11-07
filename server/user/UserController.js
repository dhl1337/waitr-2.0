var User = require('../models/UserModel');


module.exports = {

  read: function (req, res) {
    User
      .find(req.query)
      .exec(function (err, result) {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
  },

  update: function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, result) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(result);
    });
  },

  delete: function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, result) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(result);
    });
  },

  currentUser: function (req, res) {
    User
      .find({_id: req.params.id})
      .populate('inWaitList')
      .exec(function (err, result) {
        if (err) {
          res.status(500).send('failed to find');
        } else {
          res.json(result);
        }
      });
  },

};
