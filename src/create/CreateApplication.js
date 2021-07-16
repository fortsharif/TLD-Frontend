import React, { useRef, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './CreateApplication.css'
import { withRouter } from 'react-router-dom';

const url = 'http://localhost:5000/api/v1/applications'

const CreateApplication = (props) => {

    const nameContainer = useRef(null)
    const addressContainer = useRef(null)
    const numberContainer = useRef(null)
    const occupationContainer = useRef(null)

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    console.log(email)

    const handleSubmit = async (e) => {
        e.preventDefault()


        const data = { name: nameContainer.current.value, address: addressContainer.current.value, occupation: occupationContainer.current.value, number: numberContainer.current.value }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        const status = await response.status
        if (status === 400) {
            console.log('bad')
        }
        else if (status === 200) {
            props.history.push('/dashboard')
        }
    }

    useEffect(() => {
        if (!email) {
            props.history.push('/login')
        }
    }, [])


    return <>
        {<Container className='mt-5'>
            <Row className="justify-content-md-center">
                <Col md="auto" className='text-center'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control type="text" placeholder="Firstname Surname" ref={nameContainer} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" placeholder="Address e.g CV1 5FB" ref={addressContainer} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Number:</Form.Label>
                            <Form.Control type="text" placeholder="Mobile e.g 07599999999" ref={numberContainer} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Occupation:</Form.Label>
                            <Form.Control type="text" placeholder="Occupation e.g Chemist" ref={occupationContainer} />

                        </Form.Group>



                        <Button variant="dark" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >}
    </>
}

export default withRouter(CreateApplication)