/*import React,{useState,useEffect} from "react";
import axios from "axios";
function Finfo(){
const[leave,leaves]=useState([]);
const[scrap,setscrap]=useState([]);
useEffect(() => {
    // First API
    axios.get("https://backend-deployment-wkbv.onrender.com/leave/get10")
      .then(res => {
        leaves(res.data);
        console.log("Leaves:", res.data);
        localStorage.setItem("leaveData", JSON.stringify(res.data));
      })
      .catch(err =>{ console.log(err);
          const cachedLeave = localStorage.getItem("leaveData");
          leaves(JSON.parse(cachedLeave));
      });

    // Second API
    axios.get("https://backend-deployment-wkbv.onrender.com/scr/scrap")
      .then(res => {
        setscrap(res.data.data);
        console.log("Scrap:", res.data);
        localStorage.setItem("scrapData", JSON.stringify(res.data.data));
      })
      .catch(err => {console.log(err);
        const cachedScrap = localStorage.getItem("scrapData");
        setscrap(JSON.parse(cachedScrap));
      });
  }, 

[]);
console.log(scrap);
    return (
        <>
          <div className="speech-info" style={{margin:"20px"}}>
            మీకు  సెలవుల సమాచారం మరియు మార్కెట్ ధరలు మా ద్వారా సులభంగా తెలుసుకోవచ్చు.
 ఈరోజు మార్కెట్‌లో పంట ధరలు ఎలా ఉన్నాయో వెంటనే మీకు తెలియజేస్తాం.

   </div>
   <h4 style={{marginLeft:"15px"}}>సెలవులు తేదీలు</h4>
    {leave.map((data)=>(
   <div className="show4">
   
    
    {data.status === 'leave' ? (
        <p>ఈ తేదీన {data.date} ఆఫీస్ కి సెలవా.</p>
      ) : null}
       {data.status === 'holiday' ? (
        <p>ఈ తేదీన {data.date} దీనికి సంబంధించిన అధికారులు సెలవులు ఉన్నారు</p>
      ) : null}
    
   </div>
 ))}
<div className="ftab" >
  <h2>మార్కెట్ ధరలు</h2>
      <table >
        <tr>
        <th>వస్తువు</th>
        <th>గరిష్ట ధర</th>
        <th>సగటు ధర</th>
        <th>కనీస ధర</th>
        </tr>
        {scrap.map((d,index)=>(
            <tr key={d._id}>
                <td>{d.commodity}</td>
                 <td>{d.maxPrice}</td>
                 <td>{d.avgPrice}</td>
                 <td>{d.minPrice}</td>
            </tr>
        ))}
</table>
</div>
  
 
        </>
    )
}
export default Finfo;*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
function Finfo() {
  const [leave, setLeave] = useState([]);
  const [scrap, setScrap] = useState([]);
 const { t,i18n } = useTranslation();
 const lng=i18n.language;
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const [leaveRes, scrapRes] = await Promise.all([
          axios.get("https://backend-deployment-wkbv.onrender.com/leave/get10"),
          axios.get("https://backend-deployment-wkbv.onrender.com/scr/scrap"),
        ]);

        // Update state
        setLeave(leaveRes.data);
        setScrap(scrapRes.data.data);
        console.log(scrapRes.data.data)
       
        // Save latest data in localStorage
        localStorage.setItem("leaveData", JSON.stringify(leaveRes.data));
        localStorage.setItem("scrapData", JSON.stringify(scrapRes.data.data));
      } catch (error) {
        console.log("Fetch error:", error);
         const cachedLeave = localStorage.getItem("leaveData");
    const cachedScrap = localStorage.getItem("scrapData");

    if (cachedLeave) setLeave(JSON.parse(cachedLeave));
    if (cachedScrap) setScrap(JSON.parse(cachedScrap));

      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="speech-info" style={{ margin: "20px" }}>
        {t("in1")}
      </div>

      <h4 style={{ marginLeft: "15px" }}>{t('holiday')}</h4>
      {leave.map((data) => (
       
        <div className="show4" key={data._id}>
          <ul>
          {data.status === "leave" && lng==='te' && <li>ఈ తేదీన {data.date} దీనికి సంబంధించిన అధికారులు సెలవులు ఉన్నారు .</li>}
          {data.status === "leave" && lng==='en' && <li>On this  {data.date} the concern farmer advisor is on leave.</li>}
          {data.status === "holiday" && lng==='te' &&(
            <li>ఈ తేదీన {data.date}  ఆఫీస్ కి సెలవా.</li>
          )}
          {data.status === "holiday" && lng==='en' &&(
            <li>On this {data.date}  office is close.</li>
          )}
          </ul>
        </div>
      ))}

      <div className="ftab">
        <h2>{t('market')}</h2>
        <table>
          <thead>
            <tr>
              <th>{lng==='te'?"వస్తువు":"Product"}</th>
              <th>{lng==='te'?"గరిష్ట ధర":"Maximum Price"}</th>
              <th>{lng==='te'?"సగటు ధర":"Average Price"}</th>
              <th>{lng==='te'?"కనీస ధర":"Minimum Price"}</th>
            </tr>
          </thead>
          <tbody>
            {scrap.map((d) => (
              <tr key={d._id}>
                <td>{lng==='te'?d.commodity:d.comm}</td>
                <td>{d.maxPrice}</td>
                <td>{d.avgPrice}</td>
                <td>{d.minPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Finfo;
