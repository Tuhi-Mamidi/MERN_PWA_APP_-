import React,{useState,useEffect} from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useTranslation } from 'react-i18next';
function Pesticideedit(props){

  const[set,reset]=useState({
    product:"",
    type:"",
    price:"",
    quantity:""

  });

 const { i18n } = useTranslation();
       const lng=i18n.language;
  const close= ()=>{props.setTrigger(false)}
  const handledata=(e)=>{
    reset((prev)=>{
return{...prev,[e.target.name]:e.target.value}
    })
    console.log(set)
  }
  useEffect(()=>{
  
axios.get(`https://backend-deployment-wkbv.onrender.com/app/get1/${props.id}`)
.then(res=>{

  console.log(res.data)
  reset(res.data)
  
}).catch(err=>{
  console.log(err);
})
  },[props.id])
  const handlesubmit=(e)=>{
    e.preventDefault();
    axios.put(`https://backend-deployment-wkbv.onrender.com/app/update1/${props.id}`,set)
    .then(res=>{
    console.log("success")
    }).catch(err=>{
        console.log(err);
    })
    
    close();
  }
    
    return(props.trigger)?(<>
    <div className="outer1">
<div className="inner2">
    <p style={{textAlign:"center",fontSize:"20px"}}>{lng==='te'?"సవరించు":"Edit Pesticide Details"}<span><IoClose onClick={()=>{props.setTrigger(false)}} /></span></p>
    <div className="sub-inner">
      <form onSubmit={handlesubmit}>
       <div className='textbox1'>
      
      <input type="text" name="seedName" id="username" value={lng==='te'?set.product_te:set.product} onChange={handledata}/>
     </div>
      
      
       <div className='textbox1'>
        
       <input type="text" name="type" id="username" value={lng==='te'?set.type_te:set.type} onChange={handledata}/>
     </div>
     
      
       <div className='textbox1'>
      
   <input type="text" name="price" id="name" value={set.price} onChange={handledata}/>
     </div>
     
      <div className='textbox1'>
      
 <input type="text" name="quantity" id="name" value={set.quantity} onChange={handledata}/>
     </div>
     
    <button type="submit">{lng==='te'?"సమర్పించండి":"Submit"}</button>
       </form>
   </div>
    </div>
    </div>
    </>):"";
}
export default Pesticideedit;