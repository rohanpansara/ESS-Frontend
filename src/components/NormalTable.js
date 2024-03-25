// DataTable.js

import React from 'react';
import '../styles/dashboard.css';

const DataTable = ({ data, columns, columnRenderers }) => {
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Your Notifications</h3>
        </div>
        <div className="table-div">
          <table>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td className="noDataFound" colSpan={columns.length}>
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex}>
                        {column === 'appliedOn'
                          ? `${("0" + item.appliedOn[2]).slice(-2)}/${("0" + item.appliedOn[1]).slice(-2)}/${item.appliedOn[0]}`
                          : column === 'status' && columnRenderers && columnRenderers[column]
                            ? columnRenderers[column](item[column])
                            : column === 'type' && columnRenderers && columnRenderers[column]
                              ? columnRenderers[column](item[column])
                              : item[column]}
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

export default DataTable;
