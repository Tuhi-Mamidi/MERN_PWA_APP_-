import React,{useState,useEffect} from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useTranslation } from 'react-i18next';
function Schemapop(props){
  const[data,setdata]=useState({
    classs:"",
    names:"",
    landholder:"",
    Identity:"",
    price:"",
    sdate:"",
    edate:""
  });
const {i18n } = useTranslation();
  const lng=i18n.language;
  const close=()=>{
    props.setTrigger(false);
  }
  const handledata=(e)=>{
    setdata((prev)=>{
return{...prev,[e.target.name]:e.target.value}
    })
    console.log(data)
  }
     useEffect(()=>{
 
axios.get(`https://backend-deployment-wkbv.onrender.com/apip/getone2/${props.id}`)
.then(res=>{

  console.log(res.data)
  setdata(res.data)
  
}).catch(err=>{
  console.log(err);
})
  },[props.id])
  const handlesubmit=(e)=>{
    e.preventDefault();
    axios.put(`https://backend-deployment-wkbv.onrender.com/apip/update2/${props.id}`,data)
    .then(res=>{
    console.log("success")
    }).catch(err=>{
        console.log(err);
    })
    
    close();
  }
    return(props.trigger)?(<>
    <div className="outer1">
<div className="inner3">
    <p style={{textAlign:"center",fontSize:"20px"}}>{lng==='te'?"సవరించు":"Edit Schema Details"}<span><IoClose onClick={()=>{props.setTrigger(false)}} /></span></p>
    <div className="sub-inner">
      <form onSubmit={handlesubmit}>
         <div className='textbox1'>
      
        <select className="class" name="classs" value={data.classs} onChange={handledata}>
           
          <option value="Central">
    {lng === 'te' ? "కేంద్ర పథకం" : "Central"}
  </option>
  <option value="State">
    {lng === 'te' ? "రాష్ట్ర పథకం" : "State"}
  </option>
        </select>
     </div>
       <div className='textbox1'>
       
      <input type="text" name="names" id="username" value={lng==='te'?data.names_te:data.names} onChange={handledata}/>
     </div>
      
      <h4>{lng==='te'?"అర్హత":"Eligibility"}</h4>
       <div className='textbox1'>
    
       <input type="text" name="landholder" id="username" value={data.landholder} onChange={handledata}/>
     </div>
     <div className='textbox1'>
      
       <input type="text" name="Identity" id="username" value={lng==='te'?data.Identity_te:data.Identity} onChange={handledata}/>
     </div>
      <h4>{lng==='te'?"ఉపయోగాలు":"Benifits"}</h4>
       <div className='textbox1'>
       
   <input type="text" name="price" id="name" value={data.price} onChange={handledata}/>
     </div>
     <h4>{lng==='te'?"అప్లికేషన్ పెట్టే తేదీలు":"Application Date"}</h4>
      <div className='textbox1'>
       
 <input type="text" name="sdate" id="name" value={data.sdate} onChange={handledata}/>
     </div>
        <div className='textbox1'>
       
 <input type="text" name="edate" id="name" value={data.edate} onChange={handledata}/>
     </div>
    <button type="submit">{lng==='te'?"సమర్పించండి":"Submit"}</button>
       </form>
   </div>
    </div>
    </div>
    </>):"";
}
export default Schemapop;