import React, { useEffect } from 'react'
import Base from "../components/Base";

const Contact = () => {
    useEffect(() => {
        document.title = "Contact Us | ESS"
    }, [])

    return (
        <>
            <Base page="contact" />
            <div id="content">
                <main>
                    Contact Us At DRC Systems, 24th Floor Gift Tower Two, Gift City.
                </main>
            </div>
        </>
    )
}

export default Contact