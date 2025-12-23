import React,{useState} from "react";
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
  const { t,i18n } = useTranslation();
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
    const handlesubmit=(e)=>{
    e.preventDefault();
    axios.post("https://backend-deployment-wkbv.onrender.com/apip/create2",{
       names:data.names,
    landholder:data.landholder,
    Identity:data.Identity,
    price:data.price,
    sdate:data.sdate,
    edate:data.edate,
    classs:data.classs
    })
    .then(res=>{
    console.log(res.data)
    }).catch(err=>{
        console.log(err);
    })
    close();
  }
    return(props.trigger)?(<>
    <div className="outer1">
<div className="inner3">
    <p style={{textAlign:"center",fontSize:"20px"}}>{t("add1")}<span><IoClose onClick={()=>{props.setTrigger(false)}} /></span></p>
    <div className="sub-inner">
      <form onSubmit={handlesubmit}>
         <div className='textbox1'>
        <select className="class" name="classs" value={data.classs} onChange={handledata} >
          <option>{lng==='te'?"పథకాలు రకాన్ని ఎంచుకోండి":"Select Schema type"}</option>
          <option value="Central">
    {lng === 'te' ? "కేంద్ర పథకం" : "Central"}
  </option>
  <option value="State">
    {lng === 'te' ? "రాష్ట్ర పథకం" : "State"}
  </option>
        </select>
     </div>
       <div className='textbox1'>
      <input type="text" name="names" id="username" value={data.names} onChange={handledata} placeholder={lng==='te'?"పేరు":"Schema Name"}/>
     </div>
      
      <h4>{lng==='te'?"అర్హత":"Eligibility"}</h4>
       <div className='textbox1'>

       <input type="text" name="landholder" id="username" value={data.landholder} onChange={handledata} placeholder={lng==='te'?"ఎకరాల సంఖ్య":"number of acres"}/>
     </div>
     <div className='textbox1'>

       <input type="text" name="Identity" id="username" value={data.Identity} onChange={handledata} placeholder={lng==='te'?"పత్రం":"document"}/>
     </div>
      <h4>{lng==='te'?"ఉపయోగాలు":"Benifits"}</h4>
       <div className='textbox1'>
     
   <input type="text" name="price" id="name" value={data.price} onChange={handledata} placeholder={lng==='te'?"మంజూరు మొత్తం":"sanction amount"}/>
     </div>
     <h4>{lng==='te'?"అప్లికేషన్ పెట్టే తేదీలు":"Application Date"}</h4>
      <div className='textbox1'>
       
 <input type="text" name="sdate" id="name" value={data.sdate} onChange={handledata} placeholder={lng==='te'?"మొదలయ్యేది తేదీ":"Start Date"}/>
     </div>
        <div className='textbox1'>
      
 <input type="text" name="edate" id="name" value={data.edate} onChange={handledata} placeholder={lng==='te'?"చివరి తేదీ":"End Date"}/>
     </div>
    <button  type="submit">{lng==='te'?"సమర్పించండి":"Submit"}</button>
       </form>
   </div>
    </div>
    </div>
    </>):"";
}
export default Schemapop;