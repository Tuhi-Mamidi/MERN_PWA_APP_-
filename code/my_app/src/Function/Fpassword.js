import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logoo.jpeg";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

function Fpassword() {
  const navigate = useNavigate();
  const [click, setclick] = useState(true);
  const [click1, setclick1] = useState(true);
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

    if (!data.username) errors.username = "దయచేసి మీ వినియోగదారుని పేరు నమోదు చేయండి";
    if (!data.newPassword) errors.newPassword = "మీ కొత్త పాస్‌వర్డ్‌ను నమోదు చేయండి";
    else if (data.newPassword.length < 10)
      errors.newPassword = "పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి";

    if (data.confirmPassword !== data.newPassword)
      errors.confirmPassword = "ధృవీకరణ పాస్‌వర్డ్ కొత్త పాస్‌వర్డ్‌తో సరిపోలాలి";

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
        navigate("/Flogin");
      } catch (err) {
        console.error(
          "Error:",
          err.response ? err.response.data : err.message
        );
        alert(err.response?.data?.message || "పాస్‌వర్డ్ మార్చడంలో విఫలమైంది");
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
          <p className="p1">పాస్‌వర్డ్ మర్చిపోయారా?</p>
          <p className="p2">
     పాస్‌వర్డ్ మర్చిపోయారా? <br />
  దాన్ని రీసెట్ చేయండి.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="textbox">
              <label htmlFor="username">వినియోగదారుని ఫోన్ నంబర్</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handledata}
              />
              <div className="error">{error.username}</div>
            </div>

            {click ? (
              <div className="textbox">
                <label htmlFor="newPassword">కొత్త పాస్‌వర్డ్</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
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
                    float: "right",
                  }}
                >
                  <GoEyeClosed onClick={() => setclick(!click)} />
                </span>
                <div className="error">{error.newPassword}</div>
              </div>
            ) : (
              <div className="textbox">
                <label htmlFor="newPassword">కొత్త పాస్‌వర్డ్</label>
                <input
                  type="text"
                  name="newPassword"
                  id="newPassword"
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
                    float: "right",
                  }}
                >
                  <RxEyeOpen onClick={() => setclick(!click)} />
                </span>
                <div className="error">{error.newPassword}</div>
              </div>
            )}

            {click1 ? (
              <div className="textbox">
                <label htmlFor="confirmPassword"> నిర్ధారించండి</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
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
                    float: "right",
                  }}
                >
                  <GoEyeClosed onClick={() => setclick1(!click1)} />
                </span>
                <div className="error">{error.confirmPassword}</div>
              </div>
            ) : (
              <div className="textbox">
                <label htmlFor="confirmPassword"> నిర్ధారించండి</label>
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
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
                    float: "right",
                  }}
                >
                  <RxEyeOpen onClick={() => setclick1(!click1)} />
                </span>
                <div className="error">{error.confirmPassword}</div>
              </div>
            )}

            <button type="submit">సమర్పించండి</button>

            <div className="reg" style={{ marginTop: "15px" }}>
              తిరిగి{" "}
              <span>
                <Link to="/Flogin" className="link">
                  సైన్ ఇన్ చేయండి
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Fpassword;

