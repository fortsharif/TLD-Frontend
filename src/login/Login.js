import React, { useState, useRef, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BrowserRouter as Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import icon from './user.png'
import './Login.css'

const url = 'http://localhost:5000/api/v1/user/login'

const LoginForm = () => {
    const history = useHistory()
    const emailContainer = useRef(null)
    const passwordContainer = useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [header, setHeader] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(emailContainer.current.value)
        console.log(passwordContainer.current.value)
        const data = { email: emailContainer.current.value, password: passwordContainer.current.value }
        console.log(JSON.stringify(data))
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)

        })
        console.log(response)
        const status = await response.status
        if (status == 500) {
            console.log('failed login')
            const error = await response.json()
            console.log(error)



        }
        else if (status == 200) {
            console.log('WOOOP LOGGED IN')
            const token = await response.json()
            console.log(token)
            history.push('/')
        }




    }

    useEffect(() => {

        //emailContainer.current.focus()

    })

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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="*********" ref={passwordContainer} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
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

export default LoginForm