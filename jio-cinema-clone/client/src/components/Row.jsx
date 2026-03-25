import Card from "./Card";
export default function Row({title,data}){
return(
 <>
 <h3 style={{paddingLeft:"20px"}}>{title}</h3>
 <div className="row">{data.map((item,i)=><Card key={i} title={item}/>)}</div>
 </>
); }
