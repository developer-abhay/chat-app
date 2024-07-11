const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true },
  password_hash: { type: String, required: true },
  // avatar: String,
  bio: String,
  created_at: Date,
});

const User = mongoose.model("user", UserSchema);

module.exports = { User };
