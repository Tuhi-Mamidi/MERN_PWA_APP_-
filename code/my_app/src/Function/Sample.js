import React,{useState} from "react";
function Sample(){
   const[data,setdata]=useState([]) ;
   const[set,reset]=useState("") ;
    const handle=(e)=>{
  reset(e.target.value);
    }
    const addtask=()=>{
        setdata([...data,set]);
        reset("");
    }
    return(<>
    
        <div >
        <div>
            <p>TODO LIST</p>
    <form>
        <input type="text" value={set} onChange={handle}/>
    </form>
    <button style={{width:"100px",height:"30px",position:"relative",bottom:"225px",left:"810px",backgroundColor:"orange",borderStyle:"none"}} onClick={addtask}>Add</button>
    </div>
    <div className="list">
{data.map((data)=>(
<li>{data}</li>

))
}
</div>
    </div>
    
    </>);

}
export default Sample;