import React, { useEffect } from "react";
import Base from "../components/Base";

const Project = () => {
  // const token = localStorage.getItem("token");
  const employeeName = localStorage.getItem("employeeName");

  useEffect(() => {
    document.title = employeeName
      ? `Projects | ${employeeName}`
      : "Projects | Truflux";
  }, [employeeName]);

  return (
    <>
      <Base page="project" />
      <div id="content">
        <main>
          <ul className="box-info project">
            <li className="widgets projects total">
              <span className="text">
                <h1>04</h1>
                <p>Total Projects</p>
              </span>
            </li>
          </ul>
          <ul className="box-info project top">
            <li className="widgets projects status new">
              <span className="text">
                <h1>04</h1>
                <p>New</p>
              </span>
            </li>
            <li className="widgets projects status inProgress">
              <span className="text">
                <h1>04</h1>
                <p>In Progress</p>
              </span>
            </li>
            <li className="widgets projects status onHold">
              <span className="text">
                <h1>04</h1>
                <p>On Hold</p>
              </span>
            </li>
          </ul>
          <ul className="box-info project down">
            <li className="widgets projects status completed">
              <span className="text">
                <h1>04</h1>
                <p>Completed</p>
              </span>
            </li>
            <li className="widgets projects status cancelled">
              <span className="text">
                <h1>04</h1>
                <p>Cancelled</p>
              </span>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default Project;
