import React, { useState, useEffect } from "react";
function App() {
 const [name, setName] = useState("");
 const [empId, setEmpId] = useState("");
 const [employees, setEmployees] = useState([]);
 useEffect(() => {
 fetch("http://localhost:5000/employees")
 .then(res => res.json())
 .then(data => setEmployees(data))
 .catch(err => console.log(err));
 }, []);
 const addEmployee = () => {
 if (!name || !empId) return;
 const newEmployee = { name, empId };
 fetch("http://localhost:5000/employees", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(newEmployee)
 }).then(() => {
 setEmployees([...employees, newEmployee]);
 setName("");
 setEmpId("");
 });
 };
 return (
 <div style={{ textAlign: "center" }}>
 <h2>Employee Details App</h2>
 <input
 placeholder="Enter Employee Name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 />
 <br /><br />
 <input
 placeholder="Enter Employee ID"
 value={empId}
 onChange={(e) => setEmpId(e.target.value)}
 /> <br /><br />
 <button onClick={addEmployee}>Add Employee</button>
 <h3>Employee List</h3>
 <table border="1" style={{ margin: "auto" }}>
 <thead>
 <tr>
 <th>Name</th>
 <th>Employee ID</th>
 </tr>
 </thead>
 <tbody>
 {employees.map((employee, index) => (
 <tr key={index}>
 <td>{employee.name}</td>
 <td>{employee.empId}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ); }export default App;