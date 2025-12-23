import React,{useState,useEffect} from "react";
import { useTranslation } from 'react-i18next';
import Seedpop from "./Seedpop";
import Seededit from "./Seededit";
import Seeddelete from "./Seeddelete";
import axios from "axios";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GoPlus } from "react-icons/go";
function Seed(){
  const[pop,setpop]=useState(false);
  const[pop1,setpop1]=useState(false);
   const[pop2,setpop2]=useState(false);
  const[data,setdata]=useState([]);
  const[select,setselect]=useState(null);
  const { t,i18n } = useTranslation();
        const lng=i18n.language;
  const fun=()=>{
    setpop(!pop);
  }
  const fun1=(id)=>{
    setpop1(!pop1);
    setselect(id)
  }
  const fun2=(id)=>{
   setpop2(!pop2);
   setselect(id)
  }
 
  /*useEffect(()=>{
axios.get("http://localhost:3307/api/get")
.then(res=>{
  if(res.data.length>0){
  setdata(res.data)
  console.log(res.data)
  }
}).catch(err=>{
  console.log(err);
})
  },[])*/
  useEffect(() => {
    const fetchData = () => {
      axios.get("https://backend-deployment-wkbv.onrender.com/api/get")
        .then(res =>{ setdata(res.data)
            localStorage.setItem("sales", JSON.stringify(res.data));
        })
        .catch(err =>{ console.log(err)
             const cached = localStorage.getItem("sales");
   setdata(JSON.parse(cached));
        });
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []);
    return (<>
 
    
      <div className="button">
        
        <button className="fab" onClick={fun}><GoPlus /></button>
        
      </div>
    <Seedpop trigger={pop} setTrigger={setpop} ></Seedpop>
 
    {pop2 && select && (
 <Seeddelete trigger={pop2} setTrigger={setpop2} id={select}/>
)}
    {pop1 && select && (
  <Seededit trigger={pop1} setTrigger={setpop1} id={select} />
)}
   <div className="sales">
    {data.map((d,index)=>(
            <div className="sales_inner" key={d._id}>
              <p>{lng==='te'?"రైతు పేరు":"Farmer Name"}:{lng==='te'?d.seedName_te:d.seedName}<span><MdOutlineModeEdit onClick={() => fun1(d._id)}/><MdOutlineDeleteOutline onClick={() => fun2(d._id)}/></span></p>
              <p>{t('product')}: {lng==='te'?d.name_te:d.name}</p>
              <p>{lng==='te'?"వర్గం":"Category"}: {lng==='te'?d.type_te:d.type}</p>
              <p>{t('price')}: {d.price}</p>
              <p>{t('size')}: {d.quantity}</p>
            </div>  
          ))}
   </div>
    
    </>)
}
export default Seed;
  /*<Seedpop trigger={pop} setTrigger={setpop} ></Seedpop>*/