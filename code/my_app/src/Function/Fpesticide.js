import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useTranslation } from 'react-i18next';
function Fpesticide(){
    const { t} = useTranslation();
    const[data1,setdata1]=useState([]);

    
   useEffect(()=>{
axios.get("https://backend-deployment-wkbv.onrender.com/app/getall")
.then(res=>{
  if(res.data.length>0){
  setdata1(res.data)
     localStorage.setItem("appData", JSON.stringify(res.data));
         console.log("databse")
  console.log(res.data)
  }
}).catch(err=>{
   const cached = localStorage.getItem("appData");
   setdata1(JSON.parse(cached));
   console.log("cache");
  console.log(err);
})
  },[])
   return( <>
    
         <div className="speech-info" style={{margin:"20px",whiteSpace: 'pre-line'}} >
   {t('in2')}
  </div>
         <div className="seeds">
            <div><Link to="/Fdashboard/Fdisplay"  className="link" style={{color:"black"}} state={{ seedData: data1,name:t("nSeed")}}><div >{t("nSeed")}</div></Link> </div>
            <div ><Link to="/Fdashboard/Fdisplay"  className="link" style={{color:"black"}} state={{fertilizer: data1 ,name1:t("nFert")}}><div >{t("nFert")}</div></Link></div>
            <div><Link to="/Fdashboard/Fdisplay"  className="link" style={{color:"black"}} state={{pesticide: data1,name2:t("nPest") }}><div >{t("nPest")}</div></Link></div>   
         </div>
         
    </>);
}
export default Fpesticide;
/*import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Fpesticide() {
  const [data1, setData1] = useState(() => {
    // Initialize from localStorage if available
    const cached = localStorage.getItem("appData");
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://backend-deployment-wkbv.onrender.com/app/getall"
        );

        if (res.data.length > 0) {
          setData1(res.data);
          // Save to localStorage
          localStorage.setItem("appData", JSON.stringify(res.data));
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="speech-info" style={{ margin: "20px" }}>
        ఇక్కడ విత్తనాలు, ఎరువులు, పురుగుమందుల గురించి సమాచారం ఉంది.
        <br />
        ప్రతి దానిపై క్లిక్ చేసి వివరాలను చూడండి.
      </div>

      <div className="seeds">
        <div>
          <Link
            to="/Fdashboard/Fdisplay"
            className="link"
            style={{ color: "black" }}
            state={{ seedData: data1, name: "విత్తనం" }}
          >
            <div>విత్తనాలు</div>
          </Link>
        </div>
        <div>
          <Link
            to="/Fdashboard/Fdisplay"
            className="link"
            style={{ color: "black" }}
            state={{ fertilizer: data1, name1: "ఎరువులు" }}
          >
            <div>ఎరువులు</div>
          </Link>
        </div>
        <div>
          <Link
            to="/Fdashboard/Fdisplay"
            className="link"
            style={{ color: "black" }}
            state={{ pesticide: data1, name2: "పురుగుమందుల" }}
          >
            <div>పురుగుమందుల</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Fpesticide;*/
