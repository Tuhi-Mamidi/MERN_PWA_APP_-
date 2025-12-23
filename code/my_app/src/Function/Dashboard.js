import {React,useState} from "react";
import { FaHome } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Seed from "./Seed";
import Pesticide from "./Pesticide";
import Info from "./Info";
import Scheme from "./Scheme";
import Message from "./Message";
import Adminpest from "./Adminpest";
import {Link,useLocation} from 'react-router-dom';
import {Route,Routes} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n';
/*import { IoReorderThreeOutline } from "react-icons/io5";*/
import { IoIosArrowRoundBack } from "react-icons/io";
function Dashboard(){
  const location=useLocation();

 
   const {t,i18n}=useTranslation()
    const changeLanguage=(lng)=>{
      i18n.changeLanguage(lng)
    }
  const[toggle,settoggle]=useState(false);
   const fun=()=>{
    settoggle(!toggle);
  }
    const routeHeadings = {
    "/Dashboard/* ":t("home"),
    "/Dashboard/Seed": t("sales"),
  "/Dashboard/Pesticide":t("stock"),
  "/Dashboard/Scheme":t('schema'),
   "/Dashboard/Message":t("far-request")
    
  };
  const heading = routeHeadings[location.pathname] || t("home");
    return (<>
    <div className="container">
      <Sidebar trigger={toggle} setTrigger={settoggle}/>
    <div className="outer">
    
      <div className="content">
        <div className="header" ><IoIosArrowRoundBack size="25px" className="icon" onClick={fun} />
         <h3 className="header-title" style={{fontSize:"15px"}}>{heading}</h3>
         <select className="lng" onClick={(e)=>changeLanguage(e.target.value)}>
            <option value='te' >తెలుగు</option>
    <option value='en'>English</option>
  
  </select>
        <Link to="/Dashboard/*" className="link"><FaHome className="icon1" size="22px" /></Link>
        </div>
        <div className="sub-content">
        <Routes>
          <Route path="/Seed" element={<Seed/>}/>
          <Route path="/Info" element={<Info/>}/>
          <Route path="/Adminpest" element={<Adminpest/>} />
          <Route path="/Pesticide" element={<Pesticide/>}/>
          <Route path="/Scheme" element={<Scheme/>}/>
          <Route path="/Message" element={<Message/>}/>
          <Route path="*" element={<Info/>}/>
        </Routes>
        </div>
      </div>
    </div>
    </div>
    </>)
}
export default Dashboard;