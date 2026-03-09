// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// ---- MongoDB Connection ----
mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(() => console.log('MongoDB Connected '))
.catch(err => console.error('MongoDB Connection Error ', err));

// ---- Student Schema ----
const studentSchema = new mongoose.Schema({
name: { type: String, required: true },
regNo: { type: String, required: true },
mark1: { type: Number, required: true },
mark2: { type: Number, required: true },
mark3: { type: Number, required: true },
total: Number,
average: Number
});
const Student = mongoose.model('Student', studentSchema);
// ---- POST Route to add student ----
app.post('/students', async (req, res) => {
try { let { name, regNo, mark1, mark2, mark3 } = req.body;

// Convert marks to numbers
mark1 = Number(mark1);
mark2 = Number(mark2);
mark3 = Number(mark3);
// Validate marks
if ([mark1, mark2, mark3].some(m => isNaN(m) || m < 0 || m > 100)) {
return res.status(400).json({ msg: "Marks must be numbers between 0 and 100" });
}
const total = mark1 + mark2 + mark3;
const average = total / 3;
// Save student
const student = new Student({ name, regNo, mark1, mark2, mark3, total, average });
await student.save();
res.json(student);
} catch (err) {
console.error('Server Error:', err.message);
res.status(500).json({ msg: "Server Error: " + err.message });
}
});

// ---- Start Server ----
app.listen(5000, () => console.log("Server running on port 5000"));