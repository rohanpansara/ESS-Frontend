import React, { useEffect } from "react";
import Base from "../components/Base";
import "react-calendar/dist/Calendar.css";
import AttendanceCalendar from "../components/AttendanceCalendar";

const Attendance = () => {
  useEffect(() => {
    if (
      localStorage.getItem("employeeName") === null ||
      localStorage.getItem("employeeName") === undefined
    ) {
      document.title = `Attendance | ESS`;
    } else {
      document.title = `Attendance | ${localStorage.getItem("employeeName")}`;
    }
  });

  return (
    <>
      <Base page="attendance" />
      <div id="content">
        <main>
          <ul className="box-info attendance">
            <li className="calendars">
              <span>Your Attendance</span>
              <AttendanceCalendar />
              <div className="calendar-info">
                <div className="info-color present"></div>
                <div className="info-text">Present</div>
              </div>
              <div className="calendar-info">
                <div className="info-color absent"></div>
                <div className="info-text">Absent</div>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default Attendance;
