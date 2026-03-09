const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    location: String,
    organizer: String
});

module.exports = mongoose.model("Event", eventSchema);