/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logoo.jpeg";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
function Password() {
  const navigate = useNavigate();
   const [click,setclick]=useState(true);
    const [click1,setclick1]=useState(true);
  const [data, setdata] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState({});

  const handledata = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!data.username) errors.username = "Enter your username";
    if (!data.newPassword) errors.newPassword = "Enter your new password";
    else if (data.newPassword.length <10)
      errors.newPassword = "Password must be at least 8 characters";

    if (data.confirmPassword !== data.newPassword)
      errors.confirmPassword = "Confirm password should match new password";

    seterror(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://backend-deployment-wkbv.onrender.com/visit/changePassword",
          {
            username: data.username,
            newPassword: data.newPassword,
          }
        );

        console.log("Change Password Response:", response.data);
 
        navigate("/Logins"); // redirect to login
      } catch (err) {
        console.error(
          "Error:",
          err.response ? err.response.data : err.message
        );
        alert(err.response?.data?.message || "Failed to change password");
      }
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <div className="icon">
                  <img src={logo} alt="" width="100px" height="100px" />
                </div>
        <div className="form">
          <p className="p1">Forgot Password?</p>
          <p className="p2">If you forgot your password<br/>
           instructions to reset your password.n</p>

          <form onSubmit={handleSubmit}>
            <div className="textbox">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handledata}
              />
              <div className="error">{error.username}</div>
            </div>

            

            {click?(<div className="textbox">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={data.newPassword}
                onChange={handledata}
              />
              <span style={{
                  position: "absolute",
              right: "-80px",
                    top: "70%",
                transform: "translateY(-50%)",
                cursor: "pointer",
               float:"right"
                 }}
               >
           <GoEyeClosed onClick={()=>{setclick(!click)}} />
                                    </span>
              <div className="error">{error.newPassword}</div>
            </div>):
            
           ( <div className="textbox">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="text"
                name="newPassword"
                id="newPassword"
                value={data.newPassword}
                onChange={handledata}
              />
              <span style={{
               position: "absolute",
               right: "-80px",
                 top: "70%",
                 transform: "translateY(-50%)",
                 cursor: "pointer",
                   float:"right"}}
             >
         <RxEyeOpen onClick={()=>{setclick(!click)}} />
                                    </span>
              <div className="error">{error.newPassword}</div>
            </div>)
            }

            {click1?(<div className="textbox">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handledata}
              />
       <span style={{
       position: "absolute",
   right: "-80px",
      top: "70%",
        transform: "translateY(-50%)",
        cursor: "pointer",
            float:"right" }} >
               <GoEyeClosed onClick={()=>{setclick1(!click1)}} />
    </span>       
              <div className="error">{error.confirmPassword}</div>
            </div>):
              
            (<div className="textbox">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handledata}
              />
                  <span style={{
                          position: "absolute",
                          right: "-80px",
                          top: "70%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          float:"right"
                        }}
                      >
                     <RxEyeOpen onClick={()=>{setclick1(!click1)}} />
                      </span>


              <div className="error">{error.confirmPassword}</div>
            </div> ) }




            <button type="submit">Submit</button>
            <div className="reg">
              Return to{" "}
              <span>
                <Link to="/Logins" className="link">
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logoo.jpeg";
import { useTranslation } from "react-i18next";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

function Password() {
  const navigate = useNavigate();
  const [click, setclick] = useState(true);
  const [click1, setclick1] = useState(true);

  const [data, setdata] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { i18n } = useTranslation();
  const lng = i18n.language;

  const [error, seterror] = useState({});

  const handledata = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!data.username)
      errors.username =
        lng === "te" ? "మీ యూజర్ నేమ్ ను నమోదు చేయండి" : "Enter your username";

    if (!data.newPassword)
      errors.newPassword =
        lng === "te"
          ? "మీ కొత్త పాస్‌వర్డ్‌ను నమోదు చేయండి"
          : "Enter your new password";
    else if (data.newPassword.length < 8)
      errors.newPassword =
        lng === "te"
          ? "పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి"
          : "Password must be at least 8 characters";

    if (data.confirmPassword !== data.newPassword)
      errors.confirmPassword =
        lng === "te"
          ? "కన్ఫర్మ్ పాస్‌వర్డ్ కొత్త పాస్‌వర్డ్‌తో సరిపోలాలి"
          : "Confirm password should match new password";

    seterror(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post(
          "https://backend-deployment-wkbv.onrender.com/visit/changePassword",
          {
            username: data.username,
            newPassword: data.newPassword,
          }
        );

        navigate("/Logins");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to change password");
      }
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <div className="icon">
          <img src={logo} alt="" width="100px" height="100px" />
        </div>

        <div className="form">
          <p className="p1">
            {lng === "te" ? "పాస్‌వర్డ్ మర్చిపోయారా?" : "Forgot Password?"}
          </p>

          <p className="p2">
            {lng === "te" ? (
              <>
                మీ పాస్‌వర్డ్ మర్చిపోయుంటే<br />
                దాన్ని రీసెట్ చేసేందుకు సూచనలు ఇక్కడ ఉన్నాయి.
              </>
            ) : (
              <>
                If you forgot your password,
                <br />
                here are instructions to reset it.
              </>
            )}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="textbox">
              <label htmlFor="username">
                {lng === "te" ? "యూజర్ నేమ్" : "Username"}
              </label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handledata}
              />
              <div className="error">{error.username}</div>
            </div>

            {/* New Password */}
            {click ? (
              <div className="textbox" style={{ position: "relative" }}>
                <label htmlFor="newPassword">
                  {lng === "te" ? "కొత్త పాస్‌వర్డ్" : "New Password"}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handledata}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <GoEyeClosed onClick={() => setclick(!click)} />
                </span>
                <div className="error">{error.newPassword}</div>
              </div>
            ) : (
              <div className="textbox" style={{ position: "relative" }}>
                <label htmlFor="newPassword">
                  {lng === "te" ? "కొత్త పాస్‌వర్డ్" : "New Password"}
                </label>
                <input
                  type="text"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handledata}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <RxEyeOpen onClick={() => setclick(!click)} />
                </span>
                <div className="error">{error.newPassword}</div>
              </div>
            )}

            {/* Confirm Password */}
            {click1 ? (
              <div className="textbox" style={{ position: "relative" }}>
                <label htmlFor="confirmPassword">
                  {lng === "te" ? "పాస్‌వర్డ్‌ను నిర్ధారించండి" : "Confirm Password"}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handledata}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <GoEyeClosed onClick={() => setclick1(!click1)} />
                </span>
                <div className="error">{error.confirmPassword}</div>
              </div>
            ) : (
              <div className="textbox" style={{ position: "relative" }}>
                <label htmlFor="confirmPassword">
                  {lng === "te" ? "పాస్‌వర్డ్‌ను నిర్ధారించండి" : "Confirm Password"}
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handledata}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <RxEyeOpen onClick={() => setclick1(!click1)} />
                </span>
                <div className="error">{error.confirmPassword}</div>
              </div>
            )}

            {/* Submit */}
            <button type="submit">
              {lng === "te" ? "సబ్మిట్ చేయండి" : "Submit"}
            </button>

            {/* Return to login */}
            <div className="reg">
              {lng === "te" ? "తిరిగి వెళ్ళండి " : "Return to "}{" "}
              <span>
                <Link to="/Logins" className="link">
                  {lng === "te" ? "సైన్ ఇన్" : "Sign In"}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
