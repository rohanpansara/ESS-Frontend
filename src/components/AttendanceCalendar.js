import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/dashboard.css";

const AttendanceCalendar = (id) => {
  const token = localStorage.getItem("token");

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/auth/user/getAllAttendance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              id: localStorage.getItem("employeeId"),
            },
          }
        );

        const { success, data, message } = response.data;

        if (success) {
          setAttendanceData(data);
          console.log(attendanceData);
          setLoading(false);
        } else {
          toast.error(message || "Couldn't load leave data for the team");
          setLoading(false);
        }
      } catch (error) {
        toast.error(
          "Error loading leave details for the manager: " + error.message
        );
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const tileClassName = ({ date }) => {
    // Custom logic to check if the date matches any attendance record
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday (0) or Saturday (6)
    const hasAttendance = attendanceData.some(
      (attendance) => attendance.date.join("-") === formattedDate
    );
  
    if (isWeekend) {
      return "weekend attendance";
    } else {
      return hasAttendance ? "present-date" : "absent-date";
    }
  };
  

  return (
      <Calendar className="attendance" showNeighboringMonth={false} tileClassName={tileClassName} />
  );
};

export default AttendanceCalendar;
