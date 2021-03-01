const sql = require("./db.js");

// constructor
const Subs = function(subs) {
  this.username = subs.username;
  this.plan_id=subs.plan_id;
  this.start_date=subs.start_date;
  this.valid_till=subs.valid_till;
};

/* This function returns amount corresponding
   to a plan id which it takes as input.
*/

function getAmount(plan_id){
    let amount=0;
    switch (plan_id) {
      case 'FREE':
        break;
      case 'TRIAL':
        break;
      case 'LITE_1M':
        amount=100;
        break;
      case 'PRO_1M':
        amount=200;
        break;
      case 'LITE_6M':
        amount=500;
        break;
      case 'PRO_6M':
        amount=900;
        break;
      default:
        amount=0;
  }
  return amount;
}

Subs.create = (newSub, result) => {
  console.log(newSub);
  sql.query("INSERT INTO subscription SET ?", newSub, (err, res) => {


    if (err) {
      console.log("error: ", err);
      //Failed to add subscription
      result(err, {"status":"FAILIURE","amount":"+"+getAmount(newSub.plan_id)+".0"});
      return;
    }


    console.log("created sub: ", { id: res.insertId, ...newSub });
    //Subscription added successfully
    result(null, {"status":"SUCCESS","amount":"-"+getAmount(newSub.plan_id)+".0"});
  });
};

Subs.findByName = (username,inp_date, result) => {

  //OPTIONAL PARAMETER (DATE) IS PROVIDED
  if(inp_date){

    sql.query(`SELECT plan_id,DATEDIFF(valid_till,'${inp_date}') as days_left
    FROM subscription WHERE username = '${username}'`, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }

    if (res.length) {
    console.log("found sub: ", res[0]);
    result(null, res[0]);
    return;
    }

    // not found subscription with the name specified
    result({ kind: "not_found" }, null);
    });
    }

  //OPTIONAL PARAMETER (DATE) IS NOT PROVIDED
  else{

    sql.query(`SELECT plan_id,DATE_FORMAT(start_date, '%Y-%m-%d') as start_date,
    DATE_FORMAT(valid_till, '%Y-%m-%d') as valid_till
    FROM subscription WHERE username = '${username}'`, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }

    if (res.length) {
    console.log("found sub: ", res);
    result(null, res);
    return;
    }

    // not found subscription with the name specified
    result({ kind: "not_found" }, null);
    });
    }

};

module.exports = Subs;
