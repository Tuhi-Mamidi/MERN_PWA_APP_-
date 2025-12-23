import React,{useState,useEffect} from "react";

import { useTranslation } from 'react-i18next';
import { IoClose } from "react-icons/io5";
import axios from "axios";
function Message(){
const { i18n } = useTranslation();
      const lng=i18n.language;
const[meg,setmeg]=useState([]);
   useEffect(() => {
      const fetchData = () => {
        axios.get("https://backend-deployment-wkbv.onrender.com/mess/getm")
          .then(res =>{ setmeg(res.data)
             localStorage.setItem("message", JSON.stringify(res.data));
          })
          .catch(err =>{ console.log(err)
             const cached = localStorage.getItem("message");
   setmeg(JSON.parse(cached));
          });
      };
  
      fetchData(); 
      const interval = setInterval(fetchData, 1000); 
  
      return () => clearInterval(interval); 
    }, []);
    const deletes=(id)=>{
    if (id == null) {
      console.error("ID is null or undefined");
      return;
    }
   axios.delete(`https://backend-deployment-wkbv.onrender.com/mess/delm/${id}`)
   .then(res=>{
    console.log("delete record",res.data);
   }).catch(err=>{
    console.log(err);
   })
 
  }
    return (<>
    
      
     <div className="ca">
    {meg.map((data, index) => (
    <div
      key={data._id}
      className="ca-inner"
    >
      <p><strong>{lng==='te'?"రైతు ఫోన్ నంబర్":"Farmer Phone Number"}{data.phone}</strong></p>
      {data.meg}
      <div><IoClose onClick={()=>{deletes(data._id)}}/></div>
    </div>
  ))}
      </div>

      
    </>)
}
export default Message;
/*
       <div className="gr">
       <div className="grdiv">
        <h4>Today Request</h4>
       <VscRequestChanges size={50}  style={{top:"-10px",position:"relative"}}/>
    
    
       </div>
       <div className="grdiv" >
        <h4>Total Request</h4>
        <MdPendingActions size={50} style={{top:"-10px",position:"relative"}}/>
       </div>
       <div className="grdiv">
        <h4>Pending</h4>
        <VscGitPullRequestNewChanges size={50} style={{top:"-10px",position:"relative"}}/>
       </div>
    </div>
    <table className="tab" >
        <tr>
          <th>Phone</th>
          <th>request</th>
          <th>Date</th>
          
          <th>Update/Delete</th>

        </tr>
        <tr>
          <td>9440359301</td>
          <td>నాకు యూరియా ఇరువలని తెప్పించాను</td>
          <td>20/9/2025</td>
           <td><select>
            <option>Pending</option>
            <option>Complete</option>
            </select></td>
        </tr>
       </table>
    */