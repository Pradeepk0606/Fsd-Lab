import {useState} from "react";
import axios from "axios";
export default function Login(){
const [email,setEmail]=useState(""),[password,setPassword]=useState("");
const handleLogin=async()=>{
 try{
 await axios.post("http://localhost:5000/api/login",{email,password});
 localStorage.setItem("loggedIn",true);
 window.location.href="/";
 }catch{alert("Login failed");}
};
return(
 <div className="auth">
 <h1>Welcome to Jio-movies</h1><h2>Login</h2>
 <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
 <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
 <button onClick={handleLogin}>Login</button>
 <p style={{textAlign:"center"}}>New user? <a href="/signup" style={{color:"red"}}>Signup</a></p>
 </div>
);
}
