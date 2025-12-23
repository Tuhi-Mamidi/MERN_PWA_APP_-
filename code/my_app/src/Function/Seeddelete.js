import React from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useTranslation } from 'react-i18next';
function Seeddelete(props){
  const close= ()=>{props.setTrigger(false)}
     const { i18n } = useTranslation();
      const lng=i18n.language;
   const deletes=(id)=>{
    if (id == null) {
      console.error("ID is null or undefined");
      return;
    }
   axios.delete(`https://backend-deployment-wkbv.onrender.com/api/del/${id}`)
   .then(res=>{
    console.log("delete record",res.data);
   }).catch(err=>{
    console.log(err);
   })
   close();
  }
    
    return(props.trigger)?(<>
    <div className="outer1">
<div className="inner2" style={{width:"400px"}}>
    <p style={{textAlign:"center",fontSize:"20px"}}>{lng==='te'?"వివరాలను తొలగించండి":"Delete  Details"}<span><IoClose onClick={()=>{props.setTrigger(false)}} /></span></p>

    <div className="sub-inner">

  <div className='down1'><div ><button style={{borderRadius: "20px"}} 
onClick={()=>{deletes(props.id)}}>{lng==='te'?"తొలగించు":"Delete"}</button></div>
  <div><button  style={{borderRadius: "20px"}} 
onClick={()=>{props.setTrigger(false)}}>{lng==='te'?"రద్దు":"cancel"}</button></div></div>
   
     
   

   </div>
    </div>
    </div>
    </>):"";
}
export default Seeddelete;