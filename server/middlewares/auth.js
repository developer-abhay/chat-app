const bcrypt = require("bcrypt");
const { User } = require("../db");
const jwt = require("jsonwebtoken");

// Authentication
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized Access" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login
const loginMiddleware = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = await User.findOne({ username });
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
          _id: data._id,
          name: data.name,
          username: data.username,
          avatar: data.avatar,
          bio: data.bio,
          friends: data.friends,
          created_at: data.created_at,
        };
        next();
      } else
        res.status(401).send("Passwords do not match! Authentication failed.");
    });
  }
};

const signupMiddleware = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const saltRounds = 10;

  try {
    const userExist = await User.findOne({ username });

    if (userExist) {
      res.status(400).json({ message: "User already exist" });
    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
        }

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({ message: "Something went wrong" });
          }
          req.hashedPassword = hash;
          next();
        });
      });
    }
  } catch (err) {
    console.log({ error: "Somewent wrong" });
  }
};

module.exports = { isAuthenticated, signupMiddleware, loginMiddleware };
