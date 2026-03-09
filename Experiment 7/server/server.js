const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const FILE_PATH = "./employees.json";
// Create file if not exists
if (!fs.existsSync(FILE_PATH)) {
 fs.writeFileSync(FILE_PATH, "[]");
}

// serve client files if present
const path = require('path');
const clientDir = path.join(__dirname, '..', 'client');
if (fs.existsSync(clientDir)) {
  app.use(express.static(clientDir));
  app.get('/', (req, res) => {
    res.sendFile(path.join(clientDir, 'index.html'));
  });
}

// Get all employees
app.get("/employees", (req, res) => {
 const data = fs.readFileSync(FILE_PATH, "utf-8");
 res.json(JSON.parse(data));
});
// Add employee
app.post("/employees", (req, res) => {
 const newEmployee = req.body;
 const data = fs.readFileSync(FILE_PATH, "utf-8");
 const employees = JSON.parse(data);
 employees.push(newEmployee);
 fs.writeFileSync(FILE_PATH, JSON.stringify(employees, null, 2));
 res.json({ message: "Employee added successfully" });
});
app.listen(5000, () => {
 console.log("Server running on port 5000");
});
