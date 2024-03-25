import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/landing.css'

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("employeeId") !== undefined || !localStorage.getItem("employeeId")) {
            navigate("/user/dashboard");
        }
        else {
            navigate("/login");
        }
        document.title = `ESS`
    }, [])

    return (
        <div className='landing-body'>Landing</div>
    )
}

export default Landing