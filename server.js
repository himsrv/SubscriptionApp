  
const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
app.use(cors);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/subs.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});