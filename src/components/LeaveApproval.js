import React from 'react'

const LeaveApproval = ({ data, columns, columnRenderers, handleAccept, handleReject }) => {
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
                                                {column === 'appliedOn' || column === 'from' || column === 'to'
                                                    ? `${("0" + item[column][2]).slice(-2)}/${("0" + item[column][1]).slice(-2)}/${item[column][0]}`
                                                    : column === 'status' && columnRenderers && columnRenderers[column]
                                                        ? columnRenderers[column](item[column])
                                                        : column === 'accept'
                                                            ? <button className='table-button acceptButton' onClick={() => handleAccept(item.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg></button>
                                                            : column === 'reject'
                                                                ? <button className='table-button rejectButton' onClick={() => handleReject(item.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
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
    )
}

export default LeaveApproval