import React, { useEffect } from 'react'
import Base from "../components/Base";

const About = () => {
    useEffect(() => {
        document.title = "About Us | ESS"
    }, [])

    return (
        <>
            <Base page="about" />
            <div id="content">
                <main>
                    <h1>DRC Systems</h1>
                    <p>DRC Systems India Limited is a renowned name in the field of software development. Our journey began in 2012, with minimal resources in a small space with few technology enthusiast people. In a decade, we have grown into a team of over 300 people and offices located at three locations. The head office is located in GIFT City, Gandhinagar, a space for limitless opportunities, growth exposure, and access to world-class infrastructure. </p> <br />
                    <p>Our team includes experts in many technological domains which empowers us to deliver top-notch solutions on-time to our clients. We offer a complete range of IT solutions which includes mobile app development, website development, AI and automation, enterprise solutions, cloud-based services, digital marketing services, and various others. We are technology partners for our clients, not just one-time solution providers. Our clientele includes institutions, enterprises, government agencies, international brands, industry leaders, and start-ups.</p>
                </main>
            </div>
        </>
    )
}

export default About