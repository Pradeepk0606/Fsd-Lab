const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

app.post("/save", (req, res) => {
    let data = [];

    if (fs.existsSync("data.json")) {
        data = JSON.parse(fs.readFileSync("data.json"));
    }

    data.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.send("Data Stored Successfully");
});

app.get("/display", (req, res) => {
    let data = [];

    if (fs.existsSync("data.json")) {
        data = JSON.parse(fs.readFileSync("data.json"));
    }

    res.send(data);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
