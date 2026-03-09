import React, { useState } from "react";
import "./App.css";
function App() {
 const [height, setHeight] = useState("");
 const [weight, setWeight] = useState("");
 const [bmi, setBmi] = useState(null);
 const [category, setCategory] = useState("");
 const calculateBMI = () => {
 const h = parseFloat(height) / 100; // convert cm to meter
 const w = parseFloat(weight);
 if (h > 0 && w > 0) {
 const bmiValue = (w / (h * h)).toFixed(2);
 setBmi(bmiValue);
 if (bmiValue < 18.5)
 setCategory("Underweight");
 else if (bmiValue >= 18.5 && bmiValue < 24.9)
 setCategory("Normal Weight");
 else if (bmiValue >= 25 && bmiValue < 29.9)
 setCategory("Overweight");
 else
 setCategory("Obese");
 } else {
 alert("Please enter valid values");
 }
 };
 return (
 <div className="container">
 <h2>BMI Calculator</h2>
 <input
 type="number"
 placeholder="Enter Height (in cm)"
 value={height}
 onChange={(e) => setHeight(e.target.value)}
 />
 <input
 type="number"
 placeholder="Enter Weight (in kg)"
 value={weight}
 onChange={(e) => setWeight(e.target.value)}
 />
 <button onClick={calculateBMI}>Calculate BMI</button>
 {bmi !== null && (
 <div>
 <h3>Your BMI: {bmi}</h3>
 <h3>Category: {category}</h3>
 </div>
 )}
 </div>
 );
}
export default App;