import React,{useState,useEffect} from "react"; function App(){
const [n,setN]=useState(""); const [t,setT]=useState(""); const [p,setP]=useState([]); const [s,setS]=useState([]); function load(){
fetch("http://localhost:5000/posts")

.then(r=>r.json())

.then(setP); fetch("http://localhost:5000/stories")
.then(r=>r.json())

.then(setS);

}

function add(){ fetch("http://localhost:5000/post",{ method:"POST",
headers:{"Content-Type":"application/json"}, body:JSON.stringify({name:n,text:t})
 
}).then(load);

}

function like(id){ fetch("http://localhost:5000/like",{ method:"POST",
headers:{"Content-Type":"application/json"}, body:JSON.stringify({id})
}).then(load);

}

useEffect(load,[]);

return(

<div style={{padding:"20px",fontFamily:"Arial"}}>

<h2>Mini Instagram Feed</h2>

<h3>Stories</h3>

<div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>

{s.map((x,i)=>

<div key={i} style={{ width:"80px", height:"80px", borderRadius:"50%",
background:"linear-gradient(pink,orange)", display:"flex",
alignItems:"center", justifyContent:"center", color:"white", fontWeight:"bold", fontSize:"14px",
 
boxShadow:"0 0 5px gray"

}}>

{x.user}

</div>

)}

</div>

<hr/>

<input placeholder="Name"
onChange={e=>setN(e.target.value)}

/><br/><br/>

<input placeholder="Write post"
onChange={e=>setT(e.target.value)}

/>

<br/><br/>

<button onClick={add}>Post</button>

<hr/>

{p.map(x=>

<div key={x._id}>

<b>{x.name}</b> : {x.text}

<br/>

<button onClick={()=>like(x._id)}>Like</button> Likes:{x.likes}
<hr/>

</div>

)}</div>);} export default App;
