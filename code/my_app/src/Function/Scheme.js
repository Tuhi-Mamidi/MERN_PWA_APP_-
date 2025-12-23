/*import React, { useState,useEffect } from "react";
import Schemapop from "./Schemapop";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Schemadelete from "./Schemadelete";
import Schemaedit from "./Schemaedit";
import axios from "axios";
import { GoPlus } from "react-icons/go";
function Scheme() {
  // clearer state variable names
  const [isCenter, setIsCenter] = useState(false);
  const [isState, setIsState] = useState(true);
  const[data,setdata]=useState([]);
  const[pop,setpop]=useState(false);
  const[pop1,setpop1]=useState(false);
  const[pop2,setpop2]=useState(false);
  const[select,setselect]=useState(null);
  const [expandedCard, setExpandedCard] = useState(null); 
  const popup=()=>{
    setpop(!pop);
  }
    const popup1=(id)=>{
    setpop1(!pop1);
    setselect(id);
  }
    const popup2=(id)=>{
    setpop2(!pop2);
    setselect(id);
  }
  // toggle functions
  const toggleCenter = () => {
    setIsCenter(!isCenter);
    setIsState(false); // when center is on, turn off state
  };

  const toggleState = () => {
    setIsState(!isState);
    setIsCenter(false); // when state is on, turn off center
  };
  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  useEffect(() => {
    const fetchData = () => {
      axios.get("https://backend-deployment-wkbv.onrender.com/apip/get2")
        .then(res => setdata(res.data))
        .catch(err => console.log(err));
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []);
  // Dummy schema data
  
  const filteredSchemes = data.filter((s) =>
    isCenter ? s.classs === "Central" : isState ? s.classs === "State" : false
  );
  return (
    <>
      
 <button className="fab" onClick={popup}><GoPlus/></button>
      <div className="add2" style={{marginTop:"10px"}}>
       
      </div>
<Schemapop trigger={pop} setTrigger={setpop}></Schemapop>

   {pop2 && select && (
 <Schemadelete trigger={pop2} setTrigger={setpop2} id={select}/>
)}
    {pop1 && select && (
 <Schemaedit trigger={pop1} setTrigger={setpop1} id={select}/>
)}
      <div className="add2">
        <button
          className="b3"
          style={{ backgroundColor: isState ? "orange" : "" }}
          onClick={toggleState}
        >
          State Schema
        </button>
        <button
          className="b3"
          style={{ backgroundColor: isCenter ? "orange" : "" }}
          onClick={toggleCenter}
        >
          Centeral Schema
        </button>
      </div>
     

         <div className="cen">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedCard === scheme._id;
          return (
            <div
              className="card"
              key={scheme._id}
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => toggleCard(scheme._id)}
            >
              <h3>{scheme.names}<span><MdOutlineModeEdit onClick={() => popup1(data._id)}/><MdOutlineDeleteOutline onClick={() => popup2(data._id)}/></span></h3>
             

              {isExpanded && (
                <>
                  <h4>Eligibility</h4>
                  <li>{scheme.landholder}</li>
                  <li>{scheme.Identity}</li>

                  <h4>Benefits</h4>
                  <p>Give the value up to  {scheme.price}</p>
                  <h4>Application Date </h4> <p> Application Start date{scheme.sdate} <br/> Application End date{scheme.edate} </p>
                </>
              )}

              <p style={{color:"#ccc" ,marginTop: "5px" }}>
                {isExpanded ? "less details>>" : "more details>>"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Scheme;*/
import React, { useState, useEffect } from "react";
import Schemapop from "./Schemapop";
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import Schemadelete from "./Schemadelete";
import Schemaedit from "./Schemaedit";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import { useTranslation } from 'react-i18next';
function Scheme() {
  const [isCenter, setIsCenter] = useState(false);
  const [isState, setIsState] = useState(true);
  const [data, setData] = useState([]);
  const [pop, setPop] = useState(false);
  const [pop1, setPop1] = useState(false);
  const [pop2, setPop2] = useState(false);
  const [select, setSelect] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const { t,i18n } = useTranslation();
  const lng=i18n.language;
  const popup = () => setPop(!pop);
  const popup1 = (id) => {
    setPop1(!pop1);
    setSelect(id);
  };
  const popup2 = (id) => {
    setPop2(!pop2);
    setSelect(id);
  };

  const toggleCenter = () => {
    setIsCenter(!isCenter);
    setIsState(false);
  };

  const toggleState = () => {
    setIsState(!isState);
    setIsCenter(false);
  };

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://backend-deployment-wkbv.onrender.com/apip/get2")
        .then((res) =>{ setData(res.data)
           localStorage.setItem("schemes1", JSON.stringify(res.data));
        })
        .catch((err) =>{ console.log(err)
          const cached = localStorage.getItem("schemes1");
   setData(JSON.parse(cached));
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredSchemes = data.filter((s) =>
    isCenter ? s.classs === "Central" : isState ? s.classs === "State" : false
  );

  return (
    <>
      <button className="fab" onClick={popup}>
        <GoPlus />
      </button>

      <Schemapop trigger={pop} setTrigger={setPop} />

      {pop2 && select && <Schemadelete trigger={pop2} setTrigger={setPop2} id={select} />}
      {pop1 && select && <Schemaedit trigger={pop1} setTrigger={setPop1} id={select} />}

      <div className="add2">
        <button
          className="b3"
          style={{ backgroundColor: isState ? "orange" : "" }}
          onClick={toggleState}
        >
           {t("s")}
        </button>
        <button
          className="b3"
          style={{ backgroundColor: isCenter ? "orange" : "" }}
          onClick={toggleCenter}
        >
         {t('c')}
        </button>
      </div>

      <div className="cen">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedCard === scheme._id;
          return (
            <div className="card" key={scheme._id} style={{ padding: "10px" }}>
              <h3>
                {lng==='te'?scheme.names_te:scheme.names}{" "}
                <span>
                  <MdOutlineModeEdit onClick={() => popup1(scheme._id)} />{" "}
                  <MdOutlineDeleteOutline onClick={() => popup2(scheme._id)} />
                </span>
              </h3>

              {isExpanded && (
                <>
                  <h4>{lng==='te'?"అర్హత":"Eligibility"}</h4>
                  <li>{lng==='te'?"ఎకరాల సంఖ్య":"number of acres"}:{scheme.landholder}</li>
                  <li>{lng==='te'?scheme.Identity_te:scheme.Identity}</li>

                  <h4>{lng==='te'?"ఉపయోగాలు":"Benifits"}</h4>
                  <p>{lng==='te'?"మంజూరు మొత్తం":"sanction amount"} :{scheme.price}</p>

                  <h4>{lng==='te'?"అప్లికేషన్ పెట్టే తేదీలు":"Application Date"}</h4>
                  <p>
                   {lng==='te'?"మొదలయ్యేది తేదీ":"Start Date"}{scheme.sdate}  <br /> {lng==='te'?"చివరి తేదీ":"End Date"} {scheme.edate}
                  </p>
                </>
              )}

              {/* ✅ Toggle only when clicking this text */}
              <p
                style={{ color: "#ccc", marginTop: "5px", cursor: "pointer" }}
                onClick={() => toggleCard(scheme._id)}
              >
               {isExpanded ? (lng === 'te' ? "తక్కువ వివరాలు>>" : "less details>>") 
               : (lng === 'te' ? "మరిన్ని వివరాలు>>" : "more details>>")}

         
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Scheme;

/*<Schemapop trigger={pop} setTrigger={setpop}></Schemapop>

  {isCenter &&
        Schem.map((data) => (
          <div className="card" key={data.id}>
            <h3>{data.name}<span><MdOutlineModeEdit onClick={() => popup1(data._id)}/><MdOutlineDeleteOutline onClick={() => popup2(data._id)}/></span></h3>

            <h4>Eligibility</h4>
            <li>{data.landlord}</li>
            <li>{data.cards}</li>

            <h4>Benefits</h4>
            <p>Give the value up to {data.price}</p>

            <h4>Application Date</h4>
            <p>
              Application Start date {data.start} | Application End date{" "}
              {data.end}
            </p>
          </div>
        ))}

      

     
      {isState &&
        Schem1.map((data) => (
          <div className="card" key={data._id}>
            <h3>{data.name}<span><MdOutlineModeEdit onClick={() => popup1(data._id)}/><MdOutlineDeleteOutline onClick={() => popup2(data._id)}/></span></h3>

            <h4>Eligibility</h4>
            <li>{data.landlord}</li>
            <li>{data.cards}</li>

            <h4>Benefits</h4>
            <p>Give the value up to {data.price}</p>

            <h4>Application Date</h4>
            <p>
              Application Start date {data.start} | Application End date{" "}
              {data.end}
            </p>
          </div>
        ))}
          const Schem = [
    {
      id: "pm-kisan",
      name: "PM-KISAN Samman Nidhi",
      price: 100000,
      landlord: "10-20",
      cards: "ration/passbook",
      start: "12/9/8",
      end: "23/5/7",
    },
    {
      id: "ayushman-bharat",
      name: "Ayushman Bharat PM-JAY",
      price: 10000,
      landlord: "10-20",
      cards: "ration/passbook",
      start: "12/9/8",
      end: "23/5/7",
    },
  ];

  const Schem1 = [
    {
      id: "pm-kisan",
      name: "PM-KISAN Samman Nidhi",
      price: 100000,
      landlord: "10-20",
      cards: "ration/passbook",
      start: "12/9/8",
      end: "23/5/7",
    },
  ];
*/