//subs --> subscription

module.exports = app => {
    const subs = require("../controllers/subs.controller.js");
  
    // Create a new subscription
    app.post("/subscription/", subs.create);
  
    // Retrieve subscription with validity
    app.get("/subscription/:username/:input_date*?", subs.findOne);
  
  };
  