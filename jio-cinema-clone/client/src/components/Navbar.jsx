import {useNavigate} from "react-router-dom";
export default function Navbar(){
const navigate=useNavigate();
return(
 <div className="navbar">
 <div className="logo">JioCinema</div>
 <button onClick={()=>{localStorage.removeItem("loggedIn");navigate("/login");}}
 style={{background:"red",color:"white",border:"none",padding:"8px 15px",borderRadius:"5px"}}>
 Logout</button>
 </div>
);
}