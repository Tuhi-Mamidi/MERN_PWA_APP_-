import React from "react";
import {Link,useLocation} from 'react-router-dom';
import { TbPackages } from "react-icons/tb";
import { MdDirectionsWalk } from "react-icons/md";
import { TiMessageTyping } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
function Sidebar(props){
  const location=useLocation();
     const {t}=useTranslation()
 
  const currentpath=location.pathname;
    return (props.trigger)?(<>
   <div className="outer100">
      <div className="sidebar">
        <div style={{float:"end",position:"relative",top:"10px",right:"10px"}}><IoClose  onClick={()=>{props.setTrigger(false)}} /></div>
       
<div className={currentpath==="/Fdashboard/*"?"nav":""}  onClick={()=>{props.setTrigger(false)}}><Link to="/Fdashboard/*" className="link"><TbPackages />{t('welcome')}</Link></div>
<div className={currentpath==="/Fdashboard/Fpesticide"?"nav":""}  onClick={()=>{props.setTrigger(false)}}><Link to="/Fdashboard/Fpesticide" className="link"><TbPackages />{t("fertilizer")} </Link></div>
<div className={currentpath==="/Fdashboard/Fschema"?"nav":""}  onClick={()=>{props.setTrigger(false)}}><Link to="/Fdashboard/Fschema"  className="link"><MdDirectionsWalk />{t('schema')}</Link></div>
<div className={currentpath==="/Fdashboard/Adminpest"?"nav":""}  onClick={()=>{props.setTrigger(false)}}><Link to="/Fdashboard/Adminpest"  className="link"><TiMessageTyping />{t("request")}</Link></div>
        
        </div>
      </div>
    </>):"";
}
export default Sidebar;
/*<div><Link to="/Dashboard/Booking">booking</Link></div>*/