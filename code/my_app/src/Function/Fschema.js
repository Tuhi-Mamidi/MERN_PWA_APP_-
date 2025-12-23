import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
function Fschema() {
  const [isCenter, setIsCenter] = useState(false);
  const [isState, setIsState] = useState(true);
  const [data, setData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); 
  const { t,i18n } = useTranslation();
  const lng=i18n.language;
  // Toggle Center / State
  const toggleCenter = () => {
    setIsCenter(!isCenter);
    setIsState(false);
  };

  const toggleState = () => {
    setIsState(!isState);
    setIsCenter(false);
  };

  // Fetch data
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://backend-deployment-wkbv.onrender.com/apip/get2")
        .then((res) => {setData(res.data)
        localStorage.setItem("schemes", JSON.stringify(res.data));
      
          console.log("databse")
      }
      )
        .catch((err) =>{ console.log(err)
           const cached = localStorage.getItem("schemes");
   setData(JSON.parse(cached));
   console.log("cache");

        });
      
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter schemes
  const filteredSchemes = data.filter((s) =>
    isCenter ? s.classs === "Central" : isState ? s.classs === "State" : false
  );

  // Toggle individual card expand/collapse
  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      <div className="speech-info" style={{ margin: "20px" }}>
        {t('in3')}
      </div>

      <div className="add2" style={{ marginBottom: "20px" }}>
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
            <div
              className="card"
              key={scheme._id}
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => toggleCard(scheme._id)}>
              <h3>{lng==='te'?scheme.names_te:scheme.names}</h3>
              {isExpanded && (
                <>
                  <h4>{lng==='te'?"అర్హత":"Eligibility"}</h4>
                  <li>{lng==='te'?"ఎకరాల సంఖ్య":"number of acres"}:{scheme.landholder}</li>
                  <li>{lng==='te'?scheme.Identity_te:scheme.Identity}</li>

                  <h4>{lng==='te'?"ఉపయోగాలు":"Benifits"}</h4>
                  <p>{lng==='te'?"మంజూరు మొత్తం":"sanction amount"} :{scheme.price}</p>
                  <h4>{lng==='te'?"అప్లికేషన్ పెట్టే తేదీలు":"Application Date"}</h4> <p> {lng==='te'?"మొదలయ్యేది తేదీ":"Start Date"}{scheme.sdate} <br/>{lng==='te'?"చివరి తేదీ":"End Date"} {scheme.edate} </p>
                </>
              )}

              <p style={{color:"#ccc" ,marginTop: "5px" }}>
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

export default Fschema;
/*import React, { useState, useEffect } from "react";
import axios from "axios";

function Fschema() {
  const [isCenter, setIsCenter] = useState(false);
  const [isState, setIsState] = useState(true);
  const [data, setData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  // Toggle Center / State
  const toggleCenter = () => {
    setIsCenter(!isCenter);
    setIsState(false);
  };

  const toggleState = () => {
    setIsState(!isState);
    setIsCenter(false);
  };

  // Fetch data with offline fallback
  useEffect(() => {
    // ✅ Load cached data first (from localStorage)
    const cachedData = localStorage.getItem("schemes");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    }

    // ✅ Function to fetch from backend
    const fetchData = () => {
      axios
        .get("https://backend-deployment-wkbv.onrender.com/apip/get2")
        .then((res) => {
          setData(res.data);
          localStorage.setItem("schemes", JSON.stringify(res.data)); // store for offline
        })
        .catch((err) => {
          console.log("Fetch failed (possibly offline):", err);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s (reduce from 1s)
    return () => clearInterval(interval);
  }, []);

  // Filter schemes
  const filteredSchemes = data.filter((s) =>
    isCenter ? s.classs === "Central" : isState ? s.classs === "State" : false
  );

  // Toggle individual card expand/collapse
  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      <div className="speech-info" style={{ margin: "20px" }}>
        ఇక్కడ విత్తనాలు, ఎరువులు, పురుగుమందుల గురించి సమాచారం ఉంది.
        <br />
        ప్రతి దానిపై క్లిక్ చేసి వివరాలను చూడండి.
      </div>

      <div className="add2" style={{ marginBottom: "20px" }}>
        <button
          className="b3"
          style={{ backgroundColor: isState ? "orange" : "" }}
          onClick={toggleState}
        >
          రాష్ట్రం
        </button>
        <button
          className="b3"
          style={{ backgroundColor: isCenter ? "orange" : "" }}
          onClick={toggleCenter}
        >
          కేంద్రం
        </button>
      </div>

      <div className="cen">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedCard === scheme._id;
          return (
            <div
              className="card"
              key={scheme._id}
              style={{
                padding: "10px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "10px",
                marginBottom: "10px",
                backgroundColor: "#fff",
              }}
              onClick={() => toggleCard(scheme._id)}
            >
              <h3>{scheme.names_te}</h3>

              {isExpanded && (
                <>
                  <h4>అర్హత</h4>
                  <li>{scheme.landholder}</li>
                  <li>{scheme.Identity}</li>

                  <h4>ఉపయోగాలు</h4>
                  <p>రుణమాఫీ {scheme.price}</p>

                  <h4>అప్లికేషన్ పెట్టే తేదీలు</h4>
                  <p>
                    మొదలయ్యేది తేదీ: {scheme.sdate} <br /> చివరి తేదీ: {scheme.edate}
                  </p>
                </>
              )}

              <p
                style={{
                  color: "#777",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                {isExpanded ? "తక్కువ వివరాలు >>" : "మరిన్ని వివరాలు >>"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Fschema;*/

