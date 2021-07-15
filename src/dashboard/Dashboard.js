import React, { useState, useEffect } from "react"
import { Redirect, Route } from "react-router-dom"



const Dashboard = (props) => {

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('type')
        props.history.push('/login')
    }

    const gotoApplications = () => {
        props.history.push('/applications')
    }

    const [admin, setAdmin] = useState(false)

    const email = localStorage.getItem('email')
    const type = localStorage.getItem('type')

    useEffect(() => {
        if (type == 1) {
            setAdmin(true)
        }
        if (!email) {
            props.history.push('/login')
        }
    }, [])

    return (
        <>
            <h1>Welcome {email}</h1>
            {admin ? <div><p>You are an admin, check out the applications</p>
                <button type='button' onClick={gotoApplications}>Check applications</button>
            </div>

                : <p> you are not an admin</p>}

            <button type='button' onClick={logout}>Logout</button>
        </>
    )

}

export default Dashboard