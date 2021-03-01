const Subs = require("../models/subs.model.js");

// Create and Save a new Subscription
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Input can not be empty!"
    });
  }



  /*  This function accepts a starting date and 
      plan id. It calculates and returns end date
      of the subscribed plan.
  
  */
  function addDate(start_date,plan_id){
      let daysToAdd=0;
    switch (plan_id) {
      case 'FREE':
        daysToAdd=0;
        break;
      case 'TRIAL':
        daysToAdd=7;
        break;
      case 'LITE_1M':
        daysToAdd=30;
        break;
      case 'PRO_1M':
        daysToAdd=30;
        break;
      case 'LITE_6M':
        daysToAdd=180;
        break;
      case 'PRO_6M':
        daysToAdd=180;
        break;
      default:
        daysToAdd=0;
  }

  let validTill=new Date(start_date);
  validTill.setDate(validTill.getDate()+daysToAdd);
  return validTill;
}

  // Create a Subscription
  const sub = new Subs({
    username: req.body.user_name,
    plan_id:req.body.plan_id,
    start_date:req.body.start_date,
    valid_till: addDate(req.body.start_date,req.body.plan_id)
  });

  // Save User in the database
  Subs.create(sub, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the subscription."
      });
    else res.send(data);
  });
};

// Find a single User with name
exports.findOne = (req, res) => {
  Subs.findByName(req.params.username,req.params.input_date, (err, data) => {
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


