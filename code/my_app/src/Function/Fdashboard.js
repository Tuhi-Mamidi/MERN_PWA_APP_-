import {React,useState} from "react";
import Fsidebar from "./Fsidebar";
import { FaHome } from "react-icons/fa";
import Fpesticide from "./Fpesticide";
import Finfo from "./Finfo";
import Fschema from "./Fschema";
import Adminpest from "./Adminpest";
import Fdisplay from "./Fdisplay";
import {Route,Routes} from 'react-router-dom';
/*import { IoReorderThreeOutline } from "react-icons/io5";*/
import {Link,useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { IoIosArrowRoundBack } from "react-icons/io";
function Fdashboard(){
    const location=useLocation();
  
  const[toggle,settoggle]=useState(false);
   const {t,i18n}=useTranslation()
    const changeLanguage=(lng)=>{
      i18n.changeLanguage(lng)
    }
  const fun=()=>{
    settoggle(!toggle);
  }
  const routeHeadings = {
 " /Fdashboard/*":t('welcome'),
    "/Fdashboard/Fpesticide": t("fertilizer"),
  "/Fdashboard/Fschema":t('schema'),
  "/Fdashboard/Adminpest":t("request"),
  "/Fdashboard/Fdisplay":t("fertilizer")

    
  };
  const heading = routeHeadings[location.pathname] || t('welcome');
    return (<>
    
    <div className="container">
      <Fsidebar trigger={toggle} setTrigger={settoggle}/>
    <div className="outer">
      
      <div className="content">
      
        <div className="header" ><IoIosArrowRoundBack size="25px" className="icon" onClick={fun} />
         <p className="header-title">{heading}</p>
         <select className="lng" onClick={(e)=>changeLanguage(e.target.value)}>
            <option value='te' >తెలుగు</option>
    <option value='en'>English</option>
  
  </select>
        <Link to="/Fdashboard/*" className="link"><FaHome className="icon1" size="22px" /></Link>
        
        </div>
        <div className="sub-content">
        <Routes>
          <Route path="/Finfo" element={<Finfo />}/>
          <Route path="/Adminpest" element={<Adminpest />} />
          <Route path="/Fpesticide" element={<Fpesticide/>}/>
          <Route path="/Fschema" element={<Fschema/>}/>
          <Route path="/Fdisplay" element={<Fdisplay/>}/>
          <Route path="*" element={<Finfo/>}/>
        </Routes>
        </div>
      </div>
      </div>
    </div>
    </>)
}
export default Fdashboard;