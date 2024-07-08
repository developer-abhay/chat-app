const bcrypt = require("bcrypt");
const { User } = require("../db");

const hashPassword = (req, res, next) => {
  const password = req.body.password;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      res.send({ messages: err });
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        res.send({ message: err });
      }

      req.hashedPassword = hash;
      next();
    });
  });
};

const verifyPassword = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "User does not exist" });
    } else {
      let storedHashedPassword = data.password_hash;

      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          res.status(404).send({ "Error comparing passwords:": err });
        }
        if (result) {
          req.user = {
            name: data.name,
            username: data.username,
            bio: data.bio,
          };
          next();
        } else
          res
            .status(401)
            .send("Passwords do not match! Authentication failed.");
      });
    }
  });
};

module.exports = { hashPassword, verifyPassword };
