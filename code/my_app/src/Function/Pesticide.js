import React,{useState,useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { FiPlus } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Pesticidedelete from "./Pesticidedelete";
import Pesticideedit from "./Pesticideedit";
import axios from "axios";

function Pesticide() {
  const[tog,settog]=useState(false);
  const[data,setdata]=useState({
      product:"",
      type:"",
      price:"",
      quantity:""
  
    });
    const { t,i18n } = useTranslation();
      const lng=i18n.language;
    const[data1,setdata1]=useState([]);
    const[pop1,setpop1]=useState(false);
       const[pop2,setpop2]=useState(false);
       const[select,setselect]=useState(null);
       const fun1=(id)=>{
    setpop1(!pop1);
    setselect(id)
  }
  const fun2=(id)=>{
   setpop2(!pop2);
   setselect(id)
  }
  const close=()=>{
    settog(false)
  }
    const handledata=(e)=>{
      setdata((prev)=>{
  return{...prev,[e.target.name]:e.target.value}
      })
      console.log(data)
    }
    useEffect(() => {
    const fetchData = () => {
      axios.get("https://backend-deployment-wkbv.onrender.com/app/getall")
        .then(res =>{ setdata1(res.data)
             localStorage.setItem("appData1", JSON.stringify(res.data));
        })
        .catch(err => {console.log(err)
          const cached = localStorage.getItem("appData1");
          setdata1(JSON.parse(cached));
        });
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 
    close();
    return () => clearInterval(interval); 
  }, []);
    const handlesubmit=(e)=>{
    e.preventDefault();
    axios.post("https://backend-deployment-wkbv.onrender.com/app/create1",{
        product:data.product,
       type:data.type,
        price:data.price,
        quantity:data.quantity
    })
    .then(res=>{
    console.log(res.data)
    }).catch(err=>{
        console.log(err);
    })
    
  }
  return (
    <>
       
      <div className="button">
       
        </div>
        <div className="add5">
          <p style={{margin:"0px"}} onClick={()=>{settog(!tog)}}><FiPlus size={20}/> {lng==='te'?"చేర్చు":"ADD"}</p>
        </div>
       {tog?
          <form onSubmit={handlesubmit}><div className="show">
     
         <div> 
            <input type="text" name="product" id="pro" value={data.product} onChange={handledata} placeholder={t("product")} /></div>
           <div>
           
           <select  name="type" value={data.type} onChange={handledata}>
           <option value="">{lng==='te'?"పథకం రకాన్ని ఎంచుకోండి":"Select Type"}</option>
  <option value="Pesticide">{lng==='te'?"పురుగుమందుల":"Pesticide"}</option>
  <option value="Fertilizer">{lng==='te'?"ఎరువు":"Fertilizer"}</option>
  <option value="Seed">{lng==='te'?"విత్తనాలు":"Seeds"}</option>
           </select></div>
          
     <div>
 <input type="text" name="quantity" id="name" value={data.quantity} onChange={handledata} placeholder={t('size')}/></div>
    <div>
            <input type="text" name="price" id="price" value={data.price} onChange={handledata} placeholder={t("price")}/></div>
      <div className="button">
        <button className="b1" style={{marginTop:"0px"}}>{lng==='te'?"సమర్పించండి":"Submit"}</button>
        </div>
          </div></form>:""}
           {pop2 && select && (
 <Pesticidedelete trigger={pop2} setTrigger={setpop2} id={select}/>
)}
    {pop1 && select && (
  <Pesticideedit trigger={pop1} setTrigger={setpop1} id={select} />
)}
   
     
       <div className="sales">
           {data1.map((d,index)=>(
                   <div className="sales_inner" key={d._id}>
                     <p>{t("product")}:{lng==='te'?d.product_te:d.product}<span><MdOutlineModeEdit onClick={() => fun1(d._id)}/><MdOutlineDeleteOutline onClick={() => fun2(d._id)}/></span></p>
                     <p>{lng==='te'?"వర్గం":"Category"}: {lng==='te'?d.type_te:d.type}</p>
                     <p>{t("price")}: {d.price}</p>
                     <p>{t('size')}: {d.quantity}</p>
                   </div>

                 ))}
          </div>
           
    </>
  );
}

export default Pesticide;

/*import React from "react";
function Pesticide(){
    return (<>
   
      <div className="heading" >
         Booking</div>
      
    </>)
}
export default Pesticide;*/
  /*{data.map((d,index)=>(
                  <tr key={d._id}>
                  <td>{d.seedName}</td>
                <td>{d.type}</td>
                <td>{d.price}</td>
                <td>{d.quantity}</td>
                 <td><MdOutlineModeEdit onClick={() => fun1(d._id)}/><MdOutlineDeleteOutline onClick={() => fun2(d._id)}/></td>
                   
                  </tr>
                ))}*/