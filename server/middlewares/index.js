const bcrypt = require("bcrypt");
const { User } = require("../db");

const loginMiddleware = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "User does not exist" });
    } else {
      let storedHashedPassword = data.password_hash;

      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          res.status(500).send({ message: "Error comparing passwords" });
        }
        if (result) {
          req.userObj = {
            name: data.name,
            username: data.username,
            bio: data.bio,
            avatar: data.avatar,
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

const signupMiddleware = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const saltRounds = 10;

  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(400).send({ message: "User already exist" });
  } else {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong" });
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong" });
        }
        req.hashedPassword = hash;
        next();
      });
    });
  }
};

module.exports = { signupMiddleware, loginMiddleware };
