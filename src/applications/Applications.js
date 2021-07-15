import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'



const Applications = (props) => {

    let url = 'http://localhost:5000/api/v1/applications'
    /* const [admin, setAdmin] = useState(false) */
    const [applications, setApplications] = useState([])

    const token = localStorage.getItem('token')

    const getApplications = async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        const status = await response.status
        if (status === 401) {
            props.history.push('/dashboard')
        }

        const applications = await response.json()
        setApplications(applications.applications)
    }



    useEffect(() => {
        getApplications()

    }, [url])


    return (
        <>
            <ul>
                {applications.map((application) => {
                    return <li key={application._id}>
                        <div>
                            {/* <h4>{application.id}</h4> */}
                            <h4>{application.name}</h4>
                            <h4>{application.occupation}</h4>
                            <h4>{application.address}</h4>
                            <h4>{application.number}</h4>
                            <h4>{application.date}</h4>
                            <h4>{application.status}</h4>
                        </div>

                    </li>
                })}
            </ul>
            <h1>hehe</h1>
        </>
    )

}

export default Applications