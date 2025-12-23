import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTranslation } from 'react-i18next';
function Info() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [task, setTask] = useState([]);
  const [data, setData] = useState({ status: "" });
  const [co, setCo] = useState([]);
const { t,i18n } = useTranslation();
      const lng=i18n.language;
  const handleData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 const deletes=(id)=>{
    if (id == null) {
      console.error("ID is null or undefined");
      return;
    }
   axios.delete(`https://backend-deployment-wkbv.onrender.com/leave/del10/${id}`)
   .then(res=>{
    console.log("delete record",res.data);
   }).catch(err=>{
    console.log(err);
   })
  }
 
  const handleSubmit = async () => {
    if (!data.status) {
      alert("Please select a status");
      return;
    }

    const newTask = {
      date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`, // YYYY-MM-DD
      status: data.status
    };

    try {
      // Send to backend
      const res = await axios.post("https://backend-deployment-wkbv.onrender.com/leave/create10", newTask);
      console.log(res.data);

      // Update local task list
      setTask([...task, newTask]);

      // Reset status
      setData({ status: "" });
    } catch (err) {
      console.error("Error inserting task:", err);
    }
  };

  useEffect(() => {
  // Fetch counts once
  axios.get("https://backend-deployment-wkbv.onrender.com/count/allData")
    .then(res =>{ setCo(res.data)
         localStorage.setItem("sch1", JSON.stringify(res.data));
    })
    .catch(err =>{ console.log(err)
const cached = localStorage.getItem("sch1");
   setData(JSON.parse(cached));

    });

  // Function to fetch tasks
  const fetchData = () => {
    axios.get("https://backend-deployment-wkbv.onrender.com/leave/get10")
      .then(res => {setTask(res.data)
          localStorage.setItem("s1", JSON.stringify(res.data));
      })
      .catch(err =>{ console.log(err)
        const cached = localStorage.getItem("s1");
   setData(JSON.parse(cached));

      });
  };

  // Initial fetch
  fetchData();

  // Polling every 1 second
  const interval = setInterval(fetchData, 1000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, []);


  return (
    <div>
      <div className="grids1">
        <div style={{ backgroundColor: "#AB47BC" }}>
          <h4>{lng==='te'?"మొత్తం అమ్మకాలు":"Total Sales"}</h4>
          <p>Rs{co.userTotalPrice}</p>
        </div>
        <div style={{ backgroundColor: "#3B7080" }}>
          <h4>{lng==='te'?"మొత్తం స్టాక్":"Total Stock"}</h4>
          <p>{co.pestTotalPrice}kg</p>
        </div>
        <div style={{ backgroundColor: "#F26522" }}>
          <h4>{lng==='te'?"మొత్తం పథకాలు":"Total Scheme"}</h4>
          <p>{co.schemaCount}</p>
        </div>
        <div style={{ backgroundColor: "#FD3995" }}>
          <h4>{lng==='te'?"మొత్తం సందేశాలు":"Total Message"}</h4>
          <p>{co.messageCount}</p>
        </div>
      </div>

     

      <div className="info-grid">
        
        <div className="calen">
          <p style={{backgroundColor:"orange",color:"white"}}>{t('holiday')}</p>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            style={{ marginLeft: "20px", position: "relative" }}
          />

          <p>
            {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()} 
            <select name="status" value={data.status} onChange={handleData}>
              <option value="">
    {lng === 'te' ? "ఎంచుకోండి" : "Select"}
  </option>
  <option value="holiday">
    {lng === 'te' ? "సెలవు " : "Holiday"}
  </option>
  <option value="leave">
    {lng === 'te' ? "లీవ్" : "Leave"}
  </option>
            </select>
          </p>

          <button className="taskbut" onClick={handleSubmit}>{lng==='te'?"సమర్పించండి":"Submit"}</button>
        </div>

        <div className="calender">
          <p style={{ backcolor: "orange", fontSize: "20px" }}>{lng==='te'?"జాబితా":"Status list"}</p>
          <table>
            <thead>
              <tr>
                <th>{lng==='te'?"తేదీ":"Date"}</th>
                <th>{lng==='te'?"స్థితి":"Status"}</th>
                <th>{lng==='te'?"సవరించు":"edit"}</th>
              </tr>
            </thead>
            <tbody>
              {task.map((data, index) => (
                <tr key={index}>
                  <td>{data.date}</td>
                  <td>
  {data.status === "leave"
    ? (lng === 'te' ? "లీవ్" : "Leave")
    : data.status === "holiday"
      ? (lng === 'te' ? "సెలవు " : "Holiday")
      : data.status}
</td>
                  <td><MdOutlineDeleteOutline onClick={()=>{deletes(data._id)}}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Info;
 /*<p style={{ marginLeft: "50px", fontSize: "20px", color: "orange", backgroundColor: "white", borderBottom: "1px solid #eee", width: "860px", padding: "10px" }}>
        Leaves Update
      </p>*/
/*import React,{useState,useEffect} from "react";
import Calendar from 'react-calendar';
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
function Info(){
    const[set,reset]=useState(new Date())
    const[task,settask]=useState([])
    const[data,setdata]=useState({
        status:""
    })
    const[co,setco]=useState([]);
        const handledata=(e)=>{
      setdata((prev)=>{
        return {...prev,[e.target.name]:e.target.value}
      })
    }
      const handle = () => {
        settask([ ...task,
      {
        date: set.getDate(),
        day:set.getDay(),
        year:set.getFullYear(),
        status: data.status
      },]);
  };
useEffect(()=>{
axios.get("http://localhost:3307/count/allData")
.then(res=>{
 
  setco(res.data)
  console.log(res.data)
  
}).catch(err=>{
  console.log(err);
})
  },[])
  const handlesubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3307/leave/create10",{
        date:data.name,
       day:data.type,
        year:data.price,
        status:data.quantity
    })
    .then(res=>{
    console.log(res.data)
    }).catch(err=>{
        console.log(err);
    })
  }
    return(<>
    <div>
    <div className="grids1">
      
      <div style={{ backgroundColor: "#AB47BC" }}>
            <h3>Total Sales</h3>
            <p>{co.userTotalPrice}</p>
          </div>
          <div style={{ backgroundColor: "#3B7080" }}>
            <h3>Total Stock</h3>
            <p>{co.pestTotalPrice}</p>
          </div>
          <div style={{ backgroundColor: "#F26522" }}>
            <h3>Total Scheme</h3>
            <p>{co.schemaCount}</p>
          </div>
          <div style={{ backgroundColor: "#FD3995" }}>
            <h3>Total Message</h3>
            <p>{co.messageCount}</p>
          </div>
    </div>
    
    <p style={{marginLeft:"50px",fontSize:"20px",color:"orange",backgroundColor:"white",borderBottom:"1px solid #eee",width:"860px",padding:"10px"}}>Leaves Update</p>
  <div className="info-grid">


        <div className="calen">
            <Calendar onChange={reset} value={set}
            
            style={{marginLeft:"20px",position:"relative" }}/>
            
        <p>{set.getDate()}/{set.getMonth()}/{set.getFullYear()} 
             <select name="status" value={data.status} onChange={handledata}>
                <option>select</option>
                <option>weekend</option>
                <option>holiday</option>
                <option>leave</option>
            </select></p>
          <button className="taskbut" onClick={handle}>submit</button>
            
</div>
        <div className="calender">
          <p style={{color:"orange",fontSize:"20px"}}>Status list</p>
          <table>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>edit</th>
            </tr>  
          {task.map((data)=>(
          <tr>
              <td>{data.date}</td>
           <td>{data.status}</td> 
           <td>delete</td>
           </tr>))}
           </table>
        </div>


</div>
    </div>
    </>)
}
export default Info;
  /* const handle=()=>{
        settask([...task,set.getDate()])
        setstatus([...status,data.status])
    }*/