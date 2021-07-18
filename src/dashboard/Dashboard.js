import React, { useState, useEffect } from "react"
import { BrowserRouter as Redirect, Route } from "react-router-dom"
import CreateApplication from "../create/CreateApplication"
import { withRouter } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './Dashboard.css'
const Dashboard = (props) => {

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('type')
        props.history.push('/')
    }

    const gotoApplications = () => {
        props.history.push('/applications')
    }

    const viewApplication = () => {
        props.history.push('/myapplication')
        {/* < Redirect to="/myapplication" /> */ }
    }

    const CreateApplication = () => {

        props.history.push('/create')
    }

    const [admin, setAdmin] = useState(false)

    const email = localStorage.getItem('email')
    const type = localStorage.getItem('type')

    useEffect(() => {
        if (type == 1) {
            setAdmin(true)
        }
        if (!email) {
            props.history.push('/')
        }

    }, [])

    return (
        <>
            <h1 className='dashboard'>Welcome to The License Department<br></br> <br></br> <br></br>this is your dashboard, you can create new applications here or view your current application</h1>
            <div className='hmm'>
                <h1>Please click the following buttons: {email}</h1>
                {admin ? <div><p>You are an admin, check out the applications</p>
                    <Button className='button' variant='dark' onClick={gotoApplications}>Check applications</Button>
                </div>

                    : <div className='divButton'><Button className='button' variant='dark' onClick={CreateApplication}>Start An Application</Button> < Button className='button' variant='dark' onClick={viewApplication}>View Your Application</Button></div>}


                <br></br>

            </div>
        </>
    )

}

export default withRouter(Dashboard)