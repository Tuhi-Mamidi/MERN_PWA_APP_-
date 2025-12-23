import React,{useState} from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import axios from "axios";
function Seedpop(props){
  const[data,setdata]=useState({
    name:"",
    type:"",
    namet:"",
    price:"",
    quantity:""

  });
  const close= ()=>{props.setTrigger(false)}
  const handledata=(e)=>{
    setdata((prev)=>{
return{...prev,[e.target.name]:e.target.value}
    })
    console.log(data)
  }
  const { t,i18n } = useTranslation();
          const lng=i18n.language;
  const handlesubmit=(e)=>{
    e.preventDefault();
    axios.post("https://backend-deployment-wkbv.onrender.com/api/create",{
        seedName:data.name,
       type:data.type,
       name:data.namet,
        price:data.price,
        quantity:data.quantity
    })
    .then(res=>{
    console.log(res.data)
    }).catch(err=>{
        console.log(err);
    })
    close()
  }
    return(props.trigger)?(<>
    <div className="outer1">
<div className="inner2">
    <p style={{textAlign:"center",fontSize:"20px"}}>{lng==='te'?"అమ్మకాల వివరాలను జోడించండి":"Add Sells Details"}<span><IoClose onClick={()=>{props.setTrigger(false)}} /></span></p>
    <div className="sub-inner">
      <form onSubmit={handlesubmit}>
       <div className='textbox1'>

      <input type="text" name="name" id="username" value={data.name} onChange={handledata} placeholder={lng==='te'?"రైతు పేరు":"Farmer Name"}/>
     </div>
      <div className='textbox1'>
      
       <input type="text" name="namet" id="username" value={data.namet} onChange={handledata} placeholder={t('product')}/>
     </div>
      
       <div className='textbox1'>
      
       <input type="text" name="type" id="username" value={data.type} onChange={handledata} placeholder={lng==='te'?"వర్గం":"Category"}/>
     </div>
     
      
       <div className='textbox1'>
       
   <input type="text" name="price" id="name" value={data.price} onChange={handledata} placeholder={t('price')}/>
     </div>
     
      <div className='textbox1'>
      
 <input type="text" name="quantity" id="name" value={data.quantity} onChange={handledata} placeholder={t('size')}/>
     </div>
     
    <button type="submit">{lng==='te'?"సమర్పించండి":"Submit"}</button>
       </form>
   </div>
    </div>
    </div>
    </>):"";
}
export default Seedpop;
/*  <div className="inner">
       <button onClick={()=>{props.setTrigger(false)}}>hello</button>
     </div> */