const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
};

User.create = (newUser, result) => {
  console.log(newUser);
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByName = (username, result) => {
  console.log(username)
  sql.query(`SELECT username,DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
              FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the name specified
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
