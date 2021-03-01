module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.put("/users/:username", users.create);

  // Retrieve a single User with name
  app.get("/users/:username", users.findOne);

};
