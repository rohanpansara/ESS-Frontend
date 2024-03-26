import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";
import { toast } from "sonner";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
// import truflux from '../images/truflux.png'

const Base = ({ page }) => {
  const navigate = useNavigate();

  const fullName = localStorage.getItem("employeeFullName");
  const username = fullName ? fullName : "Unknown"; // Provide a default value if fullName is null

  const darkModePreference = JSON.parse(localStorage.getItem("darkMode"));
  const sideBarHidden = JSON.parse(localStorage.getItem("sidebarHide"));
  const [darkMode, setDarkMode] = useState(darkModePreference || false);
  const [showSidebar, setShowSidebar] = useState(sideBarHidden || false);

  // const [searchFormVisible, setSearchFormVisible] = useState(false);

  useEffect(() => {
    // setting dark mode class to body if darkMode is true
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // storing dark mode toggle in local storage to make it global
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // setting dark mode class to body if darkMode is true
    if (showSidebar) {
      document.body.classList.add("hide");
    } else {
      document.body.classList.remove("hide");
    }
    // storing dark mode toggle in local storage to make it global
    localStorage.setItem("sidebarHide", JSON.stringify(showSidebar));
  }, [showSidebar]);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // const handleToggleSearchForm = () => {
  //   setSearchFormVisible(!searchFormVisible);
  // };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePunch = async (punchType) => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      if (!localStorage.getItem("token")) {
        toast.error("You need to login first");
        navigate(`/dashboard/${employeeId}`)
        return;
      }
      const response = await toast.promise(
        () =>
          axios.post("http://localhost:8080/auth/punch", {
            employeeId,
            punchType,
          }),
        {
          loading: "Adding Punch...",
          success: (responseData) => {
            return responseData.data.message;
          },
          error: "Punch Request Failed!",
        }
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Punch Request Failed!");
    }
  };


  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div id="sidebar" className={showSidebar ? "hide" : ""}>
        {
          page === "project" ? (
            <a href="/" className="brand truflux">
              <svg
                className="bx bxs-detail"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
              </svg>
              <span className="text">Truflux</span>
            </a>
          ) : (
            <a href="/" className="brand">
              <svg
                className="bx bxs-detail"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
              </svg>
              <span className="text">ESS</span>
            </a>
          )
        }

        <ul className="side-menu top">
          <li className={page === "dashboard" ? "active" : ""}>
            <a href="/user/dashboard">
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
              </svg>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={page === "attendance" ? "active" : ""}>
            <a href="/user/attendance">
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
              </svg>
              <span className="text">Attendance</span>
            </a>
          </li>
          <li className={page === "project" ? "active" : ""}>
            <a href="/user/project" onClick={() => setDarkMode(true)}>
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m656-120-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Zm-416-80q17 0 28.5-11.5T280-240q0-17-11.5-28.5T240-280q-17 0-28.5 11.5T200-240q0 17 11.5 28.5T240-200Zm0 80q-50 0-85-35t-35-85q0-50 35-85t85-35q37 0 67.5 20.5T352-284q39-11 63.5-43t24.5-73v-160q0-83 58.5-141.5T640-760h46l-63-63 57-57 160 160-160 160-57-56 63-64h-46q-50 0-85 35t-35 85v160q0 73-47 128.5T354-203q-12 37-43.5 60T240-120Zm-64-480-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Z" />
              </svg>
              <span className="text">Projects</span>
            </a>
          </li>
          <li className={page === "leave" ? "active" : ""}>
            <a href="/user/leave">
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
              </svg>
              <span className="text">Leaves</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li className={page === "account" ? "active" : ""}>
            <a href="/account" className="account">
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" />
              </svg>
              <span className="text">Account</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout" onClick={handleLogout}>
              <svg
                className="bx bxs-logout"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a
              href="#PunchIn"
              className="punches punchIn"
              onClick={() => handlePunch("PunchIn")}
            >
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M130-574q-7-5-8.5-12.5T126-602q62-85 155.5-132T481-781q106 0 200 45.5T838-604q7 9 4.5 16t-8.5 12q-6 5-14 4.5t-14-8.5q-55-78-141.5-119.5T481-741q-97 0-182 41.5T158-580q-6 9-14 10t-14-4ZM594-81q-104-26-170-103.5T358-374q0-50 36-84t87-34q51 0 87 34t36 84q0 33 25 55.5t59 22.5q34 0 58-22.5t24-55.5q0-116-85-195t-203-79q-118 0-203 79t-85 194q0 24 4.5 60t21.5 84q3 9-.5 16T208-205q-8 3-15.5-.5T182-217q-15-39-21.5-77.5T154-374q0-133 96.5-223T481-687q135 0 232 90t97 223q0 50-35.5 83.5T688-257q-51 0-87.5-33.5T564-374q0-33-24.5-55.5T481-452q-34 0-58.5 22.5T398-374q0 97 57.5 162T604-121q9 3 12 10t1 15q-2 7-8 12t-15 3ZM260-783q-8 5-16 2.5T232-791q-4-8-2-14.5t10-11.5q56-30 117-46t124-16q64 0 125 15.5T724-819q9 5 10.5 12t-1.5 14q-3 7-10 11t-17-1q-53-27-109.5-41.5T481-839q-58 0-114 13.5T260-783ZM378-95q-59-62-90.5-126.5T256-374q0-91 66-153.5T481-590q93 0 160 62.5T708-374q0 9-5.5 14.5T688-354q-8 0-14-5.5t-6-14.5q0-75-55.5-125.5T481-550q-76 0-130.5 50.5T296-374q0 81 28 137.5T406-123q6 6 6 14t-6 14q-6 6-14 6t-14-6Zm302-68q-89 0-154.5-60T460-374q0-8 5.5-14t14.5-6q9 0 14.5 6t5.5 14q0 75 54 123t126 48q6 0 17-1t23-3q9-2 15.5 2.5T744-191q2 8-3 14t-13 8q-18 5-31.5 5.5t-16.5.5Z" />
              </svg>
              <span className="text">Punch In</span>
            </a>
          </li>
          <li>
            <a
              href="#PunchOut"
              className="punches punchOut"
              onClick={() => handlePunch("PunchOut")}
            >
              <svg
                className="bx"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M130-574q-7-5-8.5-12.5T126-602q62-85 155.5-132T481-781q106 0 200 45.5T838-604q7 9 4.5 16t-8.5 12q-6 5-14 4.5t-14-8.5q-55-78-141.5-119.5T481-741q-97 0-182 41.5T158-580q-6 9-14 10t-14-4ZM594-81q-104-26-170-103.5T358-374q0-50 36-84t87-34q51 0 87 34t36 84q0 33 25 55.5t59 22.5q34 0 58-22.5t24-55.5q0-116-85-195t-203-79q-118 0-203 79t-85 194q0 24 4.5 60t21.5 84q3 9-.5 16T208-205q-8 3-15.5-.5T182-217q-15-39-21.5-77.5T154-374q0-133 96.5-223T481-687q135 0 232 90t97 223q0 50-35.5 83.5T688-257q-51 0-87.5-33.5T564-374q0-33-24.5-55.5T481-452q-34 0-58.5 22.5T398-374q0 97 57.5 162T604-121q9 3 12 10t1 15q-2 7-8 12t-15 3ZM260-783q-8 5-16 2.5T232-791q-4-8-2-14.5t10-11.5q56-30 117-46t124-16q64 0 125 15.5T724-819q9 5 10.5 12t-1.5 14q-3 7-10 11t-17-1q-53-27-109.5-41.5T481-839q-58 0-114 13.5T260-783ZM378-95q-59-62-90.5-126.5T256-374q0-91 66-153.5T481-590q93 0 160 62.5T708-374q0 9-5.5 14.5T688-354q-8 0-14-5.5t-6-14.5q0-75-55.5-125.5T481-550q-76 0-130.5 50.5T296-374q0 81 28 137.5T406-123q6 6 6 14t-6 14q-6 6-14 6t-14-6Zm302-68q-89 0-154.5-60T460-374q0-8 5.5-14t14.5-6q9 0 14.5 6t5.5 14q0 75 54 123t126 48q6 0 17-1t23-3q9-2 15.5 2.5T744-191q2 8-3 14t-13 8q-18 5-31.5 5.5t-16.5.5Z" />
              </svg>
              <span className="text">Punch Out</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="content">
        <nav>
          <svg
            className="bx bx-menu"
            onClick={handleToggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
          <a href="/about" className={page === "about" ? "nav-link active" : "nav-link"}>
            About Us
          </a>
          <a href="/contact" className={page === "contact" ? "nav-link active" : "nav-link"}>
            Contact Us
          </a>
          <span className="greetings">
            Hello,{" "}
            <span className="greetings-username">
              {localStorage.getItem("employeeName")
                ? localStorage.getItem("employeeName")
                : "User"}
              !
            </span>
          </span>
          <input
            type="checkbox"
            id="switch-mode"
            checked={darkMode}
            onChange={handleToggleDarkMode}
            hidden={true}
          />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <svg
              className="bx bxs-bell"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <InitialsAvatar name={username} className="userInitialsLogo" />
          </a>
        </nav>
      </div>
    </>
  );
};

export default Base;