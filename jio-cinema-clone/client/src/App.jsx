import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const PrivateRoute=({children})=>localStorage.getItem("loggedIn")?children:<Navigate to="/login"/>;
export default function App(){
return(
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
 <Route path="/login" element={<Login/>}/>
 <Route path="/signup" element={<Signup/>}/>
 </Routes>
 </BrowserRouter>
);
}