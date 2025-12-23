import React from "react";
import logo from "./logo.jpeg";
import {Link,useLocation} from 'react-router-dom';
import { TbPackages } from "react-icons/tb";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { MdDirectionsWalk } from "react-icons/md";
import { TiMessageTyping } from "react-icons/ti";
function Menu(){
  const location=useLocation();
    const currentpath=location.pathname;
    return (<>
   
      <div className="menu">
     <div className="logo"><img src={logo} alt=""  /></div>
       
       <div className={currentpath==="/Dashboard/*"?"nav":""}><Link to="/Dashboard/*" className="link"><TbPackages /></Link></div>
      <div className={currentpath==="/Dashboard/Seed"?"nav":""}><Link to="/Dashboard/Seed" className="link"><TbPackages /></Link></div>
       <div className={currentpath==="/Dashboard/Pesticide"?"nav":""}><Link to="/Dashboard/Pesticide" className="link"  ><RiStickyNoteAddLine  /></Link></div>
       <div className={currentpath==="/Dashboard/Guids"?"nav":""}><Link to="/Dashboard/Guids"  className="link"><MdDirectionsWalk  /></Link></div>
       <div className={currentpath==="/Dashboard/Message"?"nav":""}><Link to="/Dashboard/Message"  className="link"><TiMessageTyping /></Link></div>
       
         </div>
      
    </>)
}
export default Menu;