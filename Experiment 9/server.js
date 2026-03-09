const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const Event = require("./models/Event");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// CREATE Event
app.post("/addEvent", async (req, res) => {

    const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        organizer: req.body.organizer
    });

    await newEvent.save();

    res.send("Event Added Successfully");
});


// READ Events
app.get("/events", async (req, res) => {

    const events = await Event.find();

    res.json(events);
});


// UPDATE Event
app.put("/update/:id", async (req, res) => {

    await Event.findByIdAndUpdate(req.params.id, req.body);

    res.send("Event Updated Successfully");
});


// DELETE Event
app.delete("/delete/:id", async (req, res) => {

    await Event.findByIdAndDelete(req.params.id);

    res.send("Event Deleted Successfully");
});


// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});