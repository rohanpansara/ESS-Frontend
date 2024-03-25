import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import Base from "../components/Base";
import "../styles/adduser.css";
import axios from "axios";
import Base from "../components/Base";

const AddUser = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Add Employee | Admin`;
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    emergencyMobile: "",
    gender: "",
    bloodGroup: "",
    birthdate: "",
    designation: "",
    team: "",
    dateOfJoining: "",
    roles: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = (name === 'team' || name === 'designation') ? parseInt(value, 10) : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/addNewEmployee",
        formData
      );
      const { success, message } = response.data;
      console.log(response.data);

      if (success) {
        toast.success(message);
        setFormData({
          firstname: "",
          middlename: "",
          lastname: "",
          email: "",
          password: "",
          mobile: "",
          emergencyMobile: "",
          gender: "",
          bloodGroup: "",
          birthdate: "",
          designation: "",
          team: "",
          dateOfJoining: "",
          roles: "",
        });
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(message || "Couldn't Add Employee!");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle specific error cases here (network error, server error, etc.)
      setLoading(false);
      toast.error(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  return (
    <>
      <Base />
      <div id="content">
        <main>
          <div class="table-data">
            <div class="order">
              <form onSubmit={handleSubmit}>
                <div className="parentAddEmployee">
                  <div className="div1">
                    <h2>Employee Details</h2>
                  </div>
                  <div className="div2">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div3">
                    <label htmlFor="middlename">Middle Name</label>
                    <input
                      type="text"
                      id="middlename"
                      name="middlename"
                      value={formData.middlename}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div4">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div5">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div6">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div7">
                    <label htmlFor="mobile">Mobile No.</label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div8">
                    <label htmlFor="designation">Designation</label>
                    <select
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                    >
                      <option value="">Select Designation</option>
                      <option value="1">Manager</option>
                      <option value="2">Tech Lead</option>
                      <option value="3">Sr. Developer</option>
                      <option value="4">Jr. Developer</option>
                      <option value="5">Intern</option>
                    </select>
                  </div>
                  <div className="div9">
                    <label htmlFor="team">Team</label>
                    <select
                      id="team"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                    >
                      <option value="">Select Team</option>
                      <option value="1">Java</option>
                      <option value="2">MERN</option>
                      <option value="3">Python</option>
                      <option value="4">Android</option>
                      <option value="5">PHP</option>
                    </select>
                  </div>

                  <div className="div10">
                    <label htmlFor="emergencyMobile">
                      Emergency Contact No.
                    </label>
                    <input
                      type="text"
                      id="emergencyMobile"
                      name="emergencyMobile"
                      value={formData.emergencyMobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div11">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="div12">
                    <label htmlFor="blood_group">Blood Group</label>
                    <select
                      id="blood_group"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="div13">
                    <label htmlFor="roles">Role</label>
                    <select
                      id="roles"
                      name="roles"
                      value={formData.roles}
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      <option value="ROLE_USER">User</option>
                      <option value="ROLE_ADMIN,ROLE_USER">Admin</option>
                    </select>
                  </div>
                  <div className="div15">
                    <label htmlFor="birthdate">Birthdate</label>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div16">
                    <label htmlFor="date_of_joining">Joining Date</label>
                    <input
                      type="date"
                      id="date_of_joining"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div14">
                    <button type="submit">ADD</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Toaster richColors />
        </main>
      </div>
    </>
  );
};

export default AddUser;
