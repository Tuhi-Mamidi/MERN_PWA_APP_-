import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logoo.jpeg";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useTranslation } from "react-i18next";

function Fregister() {
  const navigate = useNavigate();
  const [click, setclick] = useState(true);
  const [click1, setclick1] = useState(true);
  const [data, setdata] = useState({
    name: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const [error, seterror] = useState({});
  const { i18n } = useTranslation();
  const lng = i18n.language;

  const handledata = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!data.username) {
      errors.username =
        lng === "te" ? "ఇమెయిల్‌ను నమోదు చేయండి" : "Enter the email";
    }
    if (!data.password) {
      errors.password =
        lng === "te" ? "పాస్‌వర్డ్‌ను నమోదు చేయండి" : "Enter the password";
    } else if (data.password.length < 10) {
      errors.password =
        lng === "te"
          ? "పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి"
          : "Password must be at least 8 characters";
    }
    if (data.cpassword !== data.password) {
      errors.cpassword =
        lng === "te"
          ? "ధృవీకరణ పాస్‌వర్డ్ పాస్‌వర్డ్‌తో సరిపోవాలి"
          : "Confirm password should match the password";
    }

    seterror(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://backend-deployment-wkbv.onrender.com/visit/register",
          {
            username: data.username,
            password: data.password,
            role:'farmer'
          }
        );

        console.log("API Response:", response.data);

        navigate("/Flogins");
      } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <>
      <div className="outer">
        <div className="inner">
          <div className="icon">
            <img src={logo} alt="" width="100px" height="100px" />
          </div>
          <div className="form">
            <p className="p1">{lng === "te" ? "రైతు సైన్ అప్ " : "Sign Up"}</p>
            
            <p className="p2">
              {lng === "te" ? (
                <>
                  సైన్ అప్ చేయడానికి దయచేసి<br />
                  మీ వివరాలను నమోదు చేయండి
                </>
              ) : (
                "Please enter your details to sign up"
              )}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="textbox">
                <label htmlFor="username">
                  {lng === "te" ? "ఫోన్ నంబర్" : "Phone Number"}
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handledata}
                  placeholder={
                    lng === "te" ? "ఫోన్ నంబర్" : "Phone Number"
                  }
                />
                <div className="error">{error.username}</div>
              </div>

              {click ? (
                <div className="textbox">
                  <label htmlFor="password">
                    {lng === "te" ? "పాస్‌వర్డ్" : "Password"}
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handledata}
                    placeholder={lng === "te" ? "పాస్‌వర్డ్‌ను నమోదు చేయండి" : "Enter password"}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "-80px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      float: "right",
                    }}
                  >
                    <GoEyeClosed onClick={() => setclick(!click)} />
                  </span>
                  <div className="error">{error.password}</div>
                </div>
              ) : (
                <div className="textbox">
                  <label htmlFor="password">
                    {lng === "te" ? "పాస్‌వర్డ్" : "Password"}
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handledata}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "-80px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      float: "right",
                    }}
                  >
                    <RxEyeOpen onClick={() => setclick(!click)} />
                  </span>
                  <div className="error">{error.password}</div>
                </div>
              )}

              {click1 ? (
                <div className="textbox">
                  <label htmlFor="cpassword">
                    {lng === "te" ? " ధృవీకరించండి" : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    value={data.cpassword}
                    onChange={handledata}
                    placeholder={lng === "te" ? "పాస్‌వర్డ్‌ని మళ్ళీ నమోదు చేయండి" : "Re-enter password"}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "-80px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      float: "right",
                    }}
                  >
                    <GoEyeClosed onClick={() => setclick1(!click1)} />
                  </span>
                  <div className="error">{error.cpassword}</div>
                </div>
              ) : (
                <div className="textbox">
                  <label htmlFor="cpassword">
                    {lng === "te" ? " ధృవీకరించండి" : "Confirm Password"}
                  </label>
                  <input
                    type="text"
                    name="cpassword"
                    id="cpassword"
                    value={data.cpassword}
                    onChange={handledata}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "-80px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      float: "right",
                    }}
                  >
                    <RxEyeOpen onClick={() => setclick1(!click1)} />
                  </span>
                  <div className="error">{error.cpassword}</div>
                </div>
              )}

              <button type="submit">
                {lng === "te" ? "సైన్ అప్ చేయండి" : "Sign Up"}
              </button>

              <div className="reg" >
                {lng === "te"
                  ? "ఇప్పటికే ఖాతా ఉందా?"
                  : "Already have an account?"}
                <span >
                  <Link to="/Flogin" className="link">
                    {lng === "te" ? "సైన్ ఇన్ చేయండి" : "Sign In"}
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Fregister;
