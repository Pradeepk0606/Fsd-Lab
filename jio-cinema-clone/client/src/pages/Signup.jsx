import {useState} from "react";
import axios from "axios";
export default function Signup(){
const [form,setForm]=useState({});
const handleSignup=async()=>{
 try{
 await axios.post("http://localhost:5000/api/signup",form);
 alert("Signup successful"); window.location.href="/login";
 }catch{alert("Error");}
};
return(
 <div className="auth">
 <h1>Jio-movies</h1><h2>Signup</h2>
 <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
 <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
 <input type="password" placeholder="Password"
onChange={e=>setForm({...form,password:e.target.value})}/>
 <button onClick={handleSignup}>Signup</button>
 <p style={{textAlign:"center"}}>Already have an account? <a href="/login"
style={{color:"red"}}>Login</a></p>
 </div>
);
}