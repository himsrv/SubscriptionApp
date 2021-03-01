module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new Customer
  app.put("/users/:username", users.create);

  // Retrieve a single Customer with name
  app.get("/users/:username", users.findOne);

};
