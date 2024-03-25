import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fromLogout, setFromLogout] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Login | ESS";
  }, []);

  useEffect(() => {
    if (location.state && location.state.fromLogout) {
      setFromLogout(true);
      toast.error("You need to login first");
    }
    if (token) {
      navigate("/user/dashboard");
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await toast.promise(
        () => axios.post("http://localhost:8080/auth/login", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: 'Verifying Credentials',
          success: (response) => {
            const { token, employee } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("employeeId", employee.id);
            navigate("/user/dashboard");
            return `${employee.id}'s toast has been added.`;
          },
          error: (error) => {
            if (error.response && error.response.status === 403) {
              return "Invalid email or password.";
            } else if (error.code === "ERR_NETWORK") {
              return "Please check your internet connection and try again.";
            } else {
              console.error("An error occurred:", error);
              return "An unexpected error occurred. Please try again.";
            }
          },
        }
      );
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };


  return (
    <div className="loginbody">
      <Toaster richColors />
      <div className="login-container">
        <section className="first-section">
          <img src={require("../images/illustration.webp")} alt="Workplace" />
        </section>
        <section className="second-section">
          <main>
            <form className="login-form" onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>LOG IN</th>
                  </tr>
                  <tr>
                    <th className="login-form-title">
                      [Enter credentials provided to you by the Admin]
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="textInputWrapper">
                        <input
                          placeholder="Enter your email address"
                          className="textInput"
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="textInputWrapper">
                        <input
                          placeholder="Enter your password"
                          className="textInput"
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="animated-button" type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="arr-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <span className="text">L O G I N</span>
                        <span className="circle"></span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="arr-1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </main>
        </section>
      </div>
    </div>
  );
};

export default Login;