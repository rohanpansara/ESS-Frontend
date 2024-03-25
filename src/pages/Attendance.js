import React, { useEffect } from 'react'
import Base from "../components/Base";

const Attendance = () => {

    useEffect(() => {
        if (localStorage.getItem("employeeName") === null || localStorage.getItem("employeeName") === undefined) {
            document.title = `Attendance | ESS`;
        } else {
            document.title = `Attendance | ${localStorage.getItem("employeeName")}`;
        }
    })

    return (
        <>
            <Base page="attendance" />
            <div id="content">
                <main>
                    
                </main>
            </div>
        </>
    )
}

export default Attendance