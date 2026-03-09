const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
 secret: "secretkey",
 resave: false,
 saveUninitialized: true
}));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
 username: String,
 password: String
});

const User = mongoose.model("User", userSchema);

// Home Route
app.get("/", (req, res) => {
 res.send(`
 <h2>Signup</h2>
 <form action="/signup" method="POST">
 Username: <input type="text" name="username"/><br>
 Password: <input type="password" name="password"/><br>
 <button type="submit">Signup</button>
 </form>
 <h2>Login</h2>
 <form action="/login" method="POST">
 Username: <input type="text" name="username"/><br>
 Password: <input type="password" name="password"/><br>
 <button type="submit">Login</button>
 </form>
 `);
});

// Signup Route
app.post("/signup", async (req, res) => {
 const { username, password } = req.body;
 const existingUser = await User.findOne({ username });
 if (existingUser) {
 res.send("User already exists!");
 } else {
 const newUser = new User({ username, password });
 await newUser.save();
 res.send("Signup successful!");
 }
});

// Login Route
app.post("/login", async (req, res) => {
 const { username, password } = req.body;
 const user = await User.findOne({ username, password });
 if (user) {
 req.session.username = user.username;
 res.redirect("/dashboard");
 } else {
 res.send("Invalid credentials!");
 }
});

// Dashboard (Protected Route)
app.get("/dashboard", (req, res) => {
 if (req.session.username) {
 res.send(`
 <h2>Welcome ${req.session.username}</h2>
 <a href="/logout">Logout</a>
 `);
 } else {
 res.send("Please login first!");
 }
});

// Logout Route
app.get("/logout", (req, res) => {
 req.session.destroy();
 res.redirect("/");
});

// Server Start
app.listen(3000, () => {
 console.log("Server running on http://localhost:3000");
});
