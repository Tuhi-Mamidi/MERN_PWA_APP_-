import './App.css';
/*import Calculator from "./Function/Calculator";*/
import 'react-calendar/dist/Calendar.css';
import "./Asserts/Info.css";
import "./Asserts/login.css";
import "./Asserts/Dashboard.css";
import "./Asserts/Seedpop.css";
import "./Asserts/Seed.css";
import "./Asserts/Message.css";
import "./Asserts/Scheme.css";
import "./Asserts/Pesticide.css";
import "./Asserts/Adminpest.css";
import "./Asserts/Enter.css";
import "./Asserts/Fpesticide.css";
import "./Asserts/Fschema.css";
import Logins from "./Function/Logins";
import Flogin from "./Function/Flogin";
import Register from "./Function/Register";
import Fregister from "./Function/Fregister";
import Password from "./Function/Password";
import Fpassword from "./Function/Fpassword";
import Enter from "./Function/Enter";
import Dashboard from "./Function/Dashboard";
import Fdashboard from "./Function/Fdashboard";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <>
    <div  className='app'>
      <BrowserRouter>
      <Routes>
        <Route path="/Dashboard/*" element={<Dashboard/>} />
        <Route path="/Fdashboard/*" element={<Fdashboard/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/Fregister" element={<Fregister/>}/>
        <Route path="/password" element={<Password/>}/>
        <Route path="/Fpassword" element={<Fpassword/>}/>
        <Route path="/Logins" element={<Logins/>} />
        <Route path="/Flogin" element={<Flogin/>} />
        <Route path="/" element={<Enter/>}/>
      </Routes>
      </BrowserRouter>
   
      </div>
 </>
  );
}

export default App;
