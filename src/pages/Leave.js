import React, { useEffect, useState, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import Base from "../components/Base";
import "../styles/dashboard.css";
import "../styles/leaveApplication.css";

import { Toaster, toast } from "sonner";

import { Button, Modal, Box } from "@mui/material";

import axios from "axios";

const Leave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const token = localStorage.getItem("token");
  const employeeName = localStorage.getItem("employeeName");
  const employeeId = localStorage.getItem("employeeId");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employeeName) {
      document.title = `Leave | ${employeeName}`;
    } else {
      document.title = "Leave | ESS";
    }

    fetchLeaveDetails();
  }, []);

  const fetchLeaveDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/auth/user/leaves/getAllLeave",
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
        setLeaveData(data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(message || "Couldn't load leave data");
      }
    } catch (error) {
      setLoading(false)
      toast.error("Error loading leave details: " + error.message);
    }
  };

  // const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 10;

  // const pageCount = Math.ceil(leaveData.length / itemsPerPage);

  // const handlePageChange = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  // const displayedData = leaveData.slice(
  //   currentPage * itemsPerPage,
  //   (currentPage + 1) * itemsPerPage
  // );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    fontFamily: "'Poppins', sans-serif",
    top: "50%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    width: "calc(80% - 30px)",
    bgcolor: "var(--form-bg)",
    boxShadow: 24,
    borderRadius: ".5rem",
    p: 4,
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--light)",
    color: "var(--blue)",
    fontFamily: "'Poppins', sans-serif",
    padding: "0.5rem 1.5rem",
    borderRadius: ".5rem",
    fontWeight: 600,
    transition: "0.3s",
    fontSize: "20px",
    border: "none",
    "&:hover": {
      color: "var(--light)",
      backgroundColor: "var(--blue)",
      cursor: "pointer",
      fill: "var(--light)",
    },
  };

  const modalStyle = {
    border: "none",
    outline: "none",
    borderRadius: "10px",
  };

  const [formData, setFormData] = useState({
    employeeId: employeeId,
    leaveReason: "",
    leaveFrom: "",
    leaveTo: "",
    leaveType: "",
    leaveCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setDaysCountAvailable(false);

    // Check if leaveFrom and leaveTo dates are the same
    if (name === "leaveFrom" || name === "leaveTo") {
      const from = name === "leaveFrom" ? value : formData.leaveFrom;
      const to = name === "leaveTo" ? value : formData.leaveTo;

      if (from && to && from === to) {
        setDaysCountAvailable(false);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          leaveCount: "",
        }));
        setDaysCountAvailable(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/auth/user/leaves/applyLeave",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success, message } = response.data;
      // console.log(response.data);

      if (success) {
        toast.success(message);
        setFormData({
          employeeId: employeeId,
          leaveReason: "",
          leaveFrom: "",
          leaveTo: "",
          leaveType: "",
          leaveCount: "",
        });
        setSubmitSuccess(true);
        setLoading(false);
      } else {
        setLoading(false)
        toast.error(message || "Leave Application Failed!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchLeaveDetails();
  }, [submitSuccess]);

  const [daysCountAvailable, setDaysCountAvailable] = useState(true);

  const columns = React.useMemo(
    () => [
      {
        Header: "Applied On",
        accessor: "appliedOn",
        Cell: ({ value }) => formatDate(value),
      },
      { Header: "Reason", accessor: "reason" },
      {
        Header: "Absence From",
        accessor: "from",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Absence To",
        accessor: "to",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ value }) => (
          <span className={`type ${value.toLowerCase()}`}>{value}</span>
        ),
      },
      { Header: "Overflow", accessor: "overflow" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={`status ${value.toLowerCase()}`}>{value}</span>
        ),
      },
    ],
    []
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Fallback value if date is missing

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }

    // Format the date as desired (DD/MM/YYYY)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data: leaveData,
    },
    useFilters
  );

  return (
    <>
      <Base page="leave" />
      <div id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Your Leave Applications</h3>
                <Button sx={buttonStyle} onClick={handleOpen}>
                  Apply For Leave
                </Button>
                <Modal
                  sx={modalStyle}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form className="leave-form" onSubmit={handleSubmit}>
                      <div class="addLeaveParent">
                        <div class="div1">
                          <h2>Leave Application</h2>
                        </div>
                        <div class="div2">
                          <button onClick={handleClose}>
                            <svg
                              className="bx"
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                            >
                              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                          </button>
                        </div>
                        <div class="div3">
                          <span>Leave Reason</span>
                          <input
                            type="text"
                            id="leaveReason"
                            name="leaveReason"
                            onChange={handleChange}
                            value={formData.leaveReason}
                          />
                        </div>
                        <div class="div4">
                          <span>Leave Type</span>
                          <select
                            id="leaveType"
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                          >
                            <option value="">Select Leave Type</option>
                            <option value="PRIVILEGE">Privilege Leave</option>
                            <option value="MATERNITY">Maternity Leave</option>
                            <option value="PATERNITY">Paternity Leave</option>
                          </select>
                        </div>
                        <div class="div5">
                          <span>Absence From</span>
                          <input
                            type="date"
                            id="leaveFrom"
                            name="leaveFrom"
                            onChange={handleChange}
                            value={formData.leaveFrom}
                          />
                        </div>
                        <div class="div6">
                          <span>Absence To</span>
                          <input
                            type="date"
                            id="leaveTo"
                            name="leaveTo"
                            onChange={handleChange}
                            value={formData.leaveTo}
                          />
                        </div>
                        <div
                          className={
                            daysCountAvailable ? "div7 disabled" : "div7"
                          }
                        >
                          <span>
                            Day Count{" "}
                            <span className="innerText">
                              (only for leaves of day &lt;= 1)
                            </span>
                          </span>
                          <input
                            step={0.5}
                            min={0}
                            type="number"
                            id="leaveCount"
                            name="leaveCount"
                            onChange={handleChange}
                            disabled={daysCountAvailable}
                            value={formData.leaveCount}
                          />
                        </div>
                        <div class="div8">
                          <button type="submit">APPLY</button>
                        </div>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
              <input
                className="table-filter-search-field"
                type="text"
                placeholder="Search By Reason"
                onChange={(e) => setFilter("reason", e.target.value)}
              />
              <div className="table-div">
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {leaveData.length === 0 ? (
                      <tr>
                        <td className="noDataFound" colSpan={columns.length}>
                          No leave applications found
                        </td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <tr>
                        <td className="noDataFound" colSpan={columns.length}>
                          No data found
                        </td>
                      </tr>
                    ) : (
                      rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {/* <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              /> */}
            </div>
          </div>
        </main>
        <Toaster richColors />
      </div>
    </>
  );
};

export default Leave;
