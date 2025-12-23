import React from "react";
import { Link} from 'react-router-dom';
function Enter(){
    return(<>
    <div className="first">
        <p>కిసాన్ కనెక్ట్</p>
    <div className="enter1">
        <Link to="/Logins" style={{color:"green",textDecoration:"none"}} ><div>రైతు సేవ కేంద్రం</div></Link>
        <Link to="/Flogin" style={{color:"green",textDecoration:"none"}} ><div>రైతు</div></Link>
        
        
    </div>
    </div>
    </>)
}
export default Enter;