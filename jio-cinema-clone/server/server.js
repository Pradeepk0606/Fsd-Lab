const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/jiocinema")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String
});

// Signup API
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json("User exists");

  const hashed = await bcrypt.hash(password, 10);

  await new User({
    name,
    email,
    password: hashed
  }).save();

  res.json("Signup success");
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("No user");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  res.json("Login success");
});

// Get all users
app.get("/api/users", async (req, res) => {
  res.json(await User.find());
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));