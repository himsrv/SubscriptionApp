CREATE DATABASE UserSubscription;

CREATE TABLE users(
  username varchar(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (username)
);

CREATE TABLE subscription(
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50),
  plan_id varchar(10) NOT NULL,
  start_date DATE NOT NULL,
  valid_till DATE,
  PRIMARY KEY (id)
);