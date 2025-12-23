import React from "react";
import { IoClose } from "react-icons/io5";
import {Link,useLocation} from 'react-router-dom';
import { TbPackages } from "react-icons/tb";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { MdDirectionsWalk } from "react-icons/md";
import { TiMessageTyping } from "react-icons/ti";
import { useTranslation } from 'react-i18next';
function Sidebar(props){
  const location=useLocation();
  const { t} = useTranslation();
  const currentpath=location.pathname;
    return (props.trigger)?(<>
   <div className="outer100">
      <div className="sidebar">
    
        <div style={{float:"end",position:"relative",top:"10px",right:"10px"}}><IoClose  onClick={()=>{props.setTrigger(false)}} /></div>
<div className={currentpath==="/Dashboard/*"?"nav":""} onClick={()=>{props.setTrigger(false)}}><Link to="/Dashboard/*" className="link"><TbPackages />{t("home")}</Link></div>
<div className={currentpath==="/Dashboard/Seed"?"nav":""} onClick={()=>{props.setTrigger(false)}}><Link to="/Dashboard/Seed" className="link"><TbPackages />{t("sales")}</Link></div>
<div className={currentpath==="/Dashboard/Pesticide"?"nav":""} onClick={()=>{props.setTrigger(false)}}><Link to="/Dashboard/Pesticide" className="link" ><RiStickyNoteAddLine />{t('stock')}</Link></div>
<div className={currentpath==="/Dashboard/Scheme"?"nav":""} onClick={()=>{props.setTrigger(false)}}><Link to="/Dashboard/Scheme"  className="link"><MdDirectionsWalk />{t('schema')}</Link></div>
<div className={currentpath==="/Dashboard/Message"?"nav":""} onClick={()=>{props.setTrigger(false)}}><Link to="/Dashboard/Message"  className="link"><TiMessageTyping />{t("message")}</Link></div>
</div>
        
        </div>
      
    </>):""
}
export default Sidebar;
/*<div><Link to="/Dashboard/Booking">booking</Link></div>*/