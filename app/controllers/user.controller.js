const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.params) {
    res.status(400).send({
      message: "Input can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username: req.params.username,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User with name
exports.findOne = (req, res) => {
  User.findByName(req.params.username, (err, data) => {
    if (err) {
      //not found error
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with name ${req.params.username}.`
        });
      }
      //other errors 
      else {
        res.status(500).send({
          message: "Error retrieving User with name " + req.params.username
        });
      }
    } else res.send(data);
  });
};


