
import React, { useState, useRef, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BrowserRouter as Redirect } from 'react-router-dom'

import { withRouter } from 'react-router-dom';
import icon from '../login/user.png'

const url = 'http://localhost:5000/api/v1/user/register'

const Register = (props) => {
    const [error, setError] = useState(null)
    const emailContainer = useRef(null)
    const passwordContainer = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('ermm')
        const email = emailContainer.current.value
        const password = passwordContainer.current.value
        const data = { email: email, password: password }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const status = await response.status
        if (status === 200) {
            console.log(status)
            props.history.push('/')

        }
        else {
            console.log(status)
            setError('Something went wrong, email may already exist')
        }
        console.log('ermm')

    }



    return (
        <>
            <Container className='mt-5'>
                <Row className="justify-content-md-center">
                    <Col md="auto" className='text-center'>
                        <img className='icon' src={icon} alt="login icon" />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address: </Form.Label>
                                <Form.Control type="email" placeholder="Email@address.com" ref={emailContainer} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPasswod">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="*********" ref={passwordContainer} />
                                {error && <p >{error}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">

                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
            <div className='hmm'>
                <p>Created by Husein Sharif , Web API Module: 6003CEM <br></br> ID: 7110908</p>
            </div>
        </>
    )
}

export default withRouter(Register)