/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logoo.jpeg";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
function Logins() {
  const navigate = useNavigate();
  const [click,setclick]=useState(true);
  const [data, setdata] = useState({
    username: "",
    password: "",
  });
  const [error, seterror] = useState({});

  const handledata = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!data.username) errors.username = "Enter the phone number";
    if (!data.password) errors.password = "Enter the password";
    else if (data.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    seterror(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://backend-deployment-wkbv.onrender.com/visit/login",
          {
            username: data.username,
            password: data.password,
            role:"RSK"
          }
        );

        console.log("Login Response:", response.data);

       
        navigate("/Dashboard/*"); // redirect after login
      } catch (err) {
        console.error(
          "Error:",
          err.response ? err.response.data : err.message
        );
        alert(err.response?.data?.message || "Login failed");
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
          <p className="p1">Sign In</p>
          <p className="p2">Please enter your details to sign in</p>

          <form onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handledata}
                placeholder="phone number"
              />
              <div className="error">{error.username}</div>
            </div>

            {click?(<div className="textbox">
              <input
                type="password"
                name="password"
                id="text"
                value={data.password}
                onChange={handledata}
                placeholder="password"
                 
                />
                <span style={{
          position: "absolute",
          right: "-80px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          float:"right"
        }}
      >
        <GoEyeClosed onClick={()=>{setclick(!click)}} />
      </span>
              <div className="error">{error.password}</div>
              
            </div>):
            (<div className="textbox">
              <input
                type="text"
                name="password"
                id="password"
                value={data.password}
                onChange={handledata}
                placeholder="password"
              /><span style={{
          position: "absolute",
          right: "-80px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          float:"right"
        }}
      >
        <RxEyeOpen onClick={()=>{setclick(!click)}} />
      </span>
              <div className="error">{error.password}</div>
            </div>)}

            <div className="fp">
              <Link to="/password" className="link">
                Forget Password?
              </Link>
            </div>

            <button type="submit">Sign In</button>
            <div className="reg">
              Don't have an account?{" "}
              <span>
                <Link to="/register" className="link">
                  Create Account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logins;*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logoo.jpeg";
import { useTranslation } from "react-i18next";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

function Logins() {
  const navigate = useNavigate();
  const [click, setclick] = useState(true);

  const [data, setdata] = useState({
    username: "",
    password: "",
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
        lng === "te" ? "ఫోన్ నంబర్‌ని నమోదు చేయండి" : "Enter the phone number";

    if (!data.password)
      errors.password =
        lng === "te" ? "పాస్‌వర్డ్‌ను నమోదు చేయండి" : "Enter the password";
    else if (data.password.length < 8)
      errors.password =
        lng === "te"
          ? "పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి"
          : "Password must be at least 8 characters";

    seterror(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://backend-deployment-wkbv.onrender.com/visit/login",
          {
            username: data.username,
            password: data.password,
            role: "RSK",
          }
        );

        console.log("Login Response:", response.data);

        localStorage.setItem("username", data.username);

        navigate("/Dashboard/*");
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
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
            {lng === "te" ? "ఆర్ఎస్కే సైన్ ఇన్" : "RSK Staff Sign In"}
          </p>
          <p className="p2">
            {lng === "te" ? (
              <>
                సైన్ ఇన్ చేయడానికి దయచేసి<br />మీ వివరాలను నమోదు చేయండి
              </>
            ) : (
              "Please enter your details to sign in"
            )}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="textbox">
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handledata}
                placeholder={lng === "te" ? "ఫోన్ నంబర్" : "Phone Number"}
              />
              <div className="error">{error.username}</div>
            </div>

            {/* Password */}
            {click ? (
              <div className="textbox" style={{ position: "relative" }}>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handledata}
                  placeholder={lng === "te" ? "పాస్‌వర్డ్" : "Password"}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <GoEyeClosed onClick={() => setclick(!click)} />
                </span>
                <div className="error">{error.password}</div>
              </div>
            ) : (
              <div className="textbox" style={{ position: "relative" }}>
                <input
                  type="text"
                  name="password"
                  value={data.password}
                  onChange={handledata}
                  placeholder={lng === "te" ? "పాస్‌వర్డ్" : "Password"}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <RxEyeOpen onClick={() => setclick(!click)} />
                </span>
                <div className="error">{error.password}</div>
              </div>
            )}

            {/* Forget password */}
            <div className="fp">
              <Link to="/password" className="link">
                {lng === "te"
                  ? "పాస్‌వర్డ్ మర్చిపోయారా?"
                  : "Forget Password?"}
              </Link>
            </div>

            {/* Submit button */}
            <button type="submit">
              {lng === "te" ? "సైన్ ఇన్ చేయండి" : "Sign In"}
            </button>

            {/* Register */}
            <div className="reg">
              {lng === "te" ? "ఖాతా లేదా?" : "Don't have an account?"}{" "}
              <span>
                <Link to="/register" className="link">
                  {lng === "te" ? "ఖాతా సృష్టించండి" : "Create Account"}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logins;

