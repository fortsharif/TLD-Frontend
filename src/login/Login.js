import React, { useState, useRef, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BrowserRouter as Redirect } from 'react-router-dom'

import { withRouter } from 'react-router-dom';
import icon from './user.png'
import './Login.css'

const url = 'http://localhost:5000/api/v1/user/login'

const LoginForm = (props) => {
    //const history = useHistory()
    const emailContainer = useRef(null)
    const passwordContainer = useRef(null)

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { email: emailContainer.current.value, password: passwordContainer.current.value }
        console.log(JSON.stringify(data))
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)

        })
        console.log(response)
        const status = await response.status
        if (status === 500) {
            const error = await response.json()
            console.log(error)
            setError("Something went wrong, couldn't log you in. Please try again")
        }
        else if (status === 200) {
            const data = await response.json()
            console.log(data.token)
            console.log(data.type)
            console.log(data.email)

            localStorage.setItem("token", "Bearer " + data.token)
            localStorage.setItem("email", data.email)
            localStorage.setItem("type", data.type)
            props.history.push('/dashboard')
        }

    }



    useEffect(() => {


        if (localStorage.getItem("token")) {
            props.history.push('/dashboard')
        }


    }, [])

    return <>
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
                            Log in
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
        <div className='hmm'>
            <p>Created by Husein Sharif , Web API Module: 6003CEM <br></br> ID: 7110908</p>
        </div>
    </>

    {/* <form className='form' onSubmit={handleSubmit}>
                <div className='form-input'>
                    <lable htmlFor='email'>Email:</lable>
                    <input type='text' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='form-input'>
                    <lable htmlFor='password'>Password:</lable>
                    <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <Button type='submit'>Login</Button>
            </form> */}

}

export default withRouter(LoginForm)