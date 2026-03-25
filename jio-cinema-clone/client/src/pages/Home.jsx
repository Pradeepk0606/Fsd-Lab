import Navbar from "../components/Navbar";
import Row from "../components/Row";
const trending=["HBO","MTV","Nick","Colors","Peacock"];
const movies=["Action","Drama","Comedy","Romance","Thriller"];
export default function Home(){
return(
 <>
 <Navbar/>
 <Row title="Hot Right Now " data={trending}/>
 <Row title="Movies" data={movies}/>
 </>
);
}