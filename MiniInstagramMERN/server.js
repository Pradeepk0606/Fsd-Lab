const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/minifeed");

const Post = mongoose.model("Post", { name: String, text: String, likes: Number });

let stories = [{ user: "Pradeep" }, { user: "Kumar" }];

app.post("/post", async (req, res) => {
  await new Post({ name: req.body.name, text: req.body.text, likes: 0 }).save();
  res.json({ msg: "added" });
});

app.get("/posts", async (req, res) => {
  res.json(await Post.find());
});

app.post("/like", async (req, res) => {
  let p = await Post.findById(req.body.id);
  p.likes++;
  await p.save();
  res.json({ msg: "liked" });
});

app.get("/stories", (req, res) => res.json(stories));

app.listen(5000, () => console.log("server running"));
