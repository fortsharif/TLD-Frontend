import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const url = 'http://localhost:5000/api/v1/applications'

const Application = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    const getApplications = async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1c2Vpbl9zaGFyaWZAZ21haWwuY29tIiwiaWF0IjoxNjI2MjcwMDA4LCJleHAiOjE2MjYzMDYwMDh9.cxAU3mPYDFFb1fntdxrmu0A1Xoq512oGxdGUd_5gN5g'
            }

        })
        return response.status
    }

    useEffect(() => {
        if (getApplications() === 200) {
            console.log('its good')
            setLoggedIn(true)
        }
        else if (getApplications() === 401) {
            setLoggedIn(false)
            console.log('hehe')
        }

    })

    if (!loggedIn) {
        return (
            <Redirect to="/login"></Redirect>
        )
    }


    return <>
        <h1>Helloooooo</h1>
    </>
}

export default Application