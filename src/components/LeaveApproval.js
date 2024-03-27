import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const LeaveApproval = ({ data, columns, columnRenderers, handleUpdate }) => {
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Pending Leave Applications</h3>
        </div>
        <div className="table-div">
          <table>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td className="noDataFound" colSpan={columns.length}>
                    No Pending Leave Applications
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex}>
                        {column === "appliedOn" ||
                        column === "from" ||
                        column === "to" ? (
                          `${("0" + item[column][2]).slice(-2)}/${(
                            "0" + item[column][1]
                          ).slice(-2)}/${item[column][0]}`
                        ) : column === "status" &&
                          columnRenderers &&
                          columnRenderers[column] ? (
                          columnRenderers[column](item[column])
                        ) : column === "accept" ? (
                          <button
                            className="table-button acceptButton"
                            onClick={() => handleUpdate(item.id, "APPROVED")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                            >
                              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                            </svg>
                          </button>
                        ) : column === "reject" ? (
                          <button
                            className="table-button rejectButton"
                            onClick={() => handleUpdate(item.id, "REJECTED")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                            >
                              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                          </button>
                        ) : column === "employee" ? ( // Render fullname column
                          `${item.employee.firstname} ${item.employee.lastname}`
                        ) : (
                          item[column]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApproval;
