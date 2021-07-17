import React, { useRef, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './CreateApplication.css'
import { withRouter } from 'react-router-dom';

const url = 'http://localhost:5000/api/v1/applications'

const CreateApplication = (props) => {

    const nameContainer = useRef(null)
    const addressContainer = useRef(null)
    const numberContainer = useRef(null)
    const occupationContainer = useRef(null)
    const imageContainer = useRef(null)
    const [image, setImage] = useState(null)
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    console.log(email)

    const fileHandler = (e) => {

        setImage(e.target.files[0])


    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        var formData = new FormData()
        console.log(image)

        formData.append('name', nameContainer.current.value)
        formData.append('address', addressContainer.current.value)
        formData.append('occupation', occupationContainer.current.value)
        formData.append('number', numberContainer.current.value)
        formData.append('image', image, `${email}.jpg`)

        /* const data = { name: nameContainer.current.value, address: addressContainer.current.value, occupation: occupationContainer.current.value, number: numberContainer.current.value, image: imageContainer } */

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
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
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Property Image:</Form.Label>
                            <Form.Control type="file" onChange={fileHandler} ref={imageContainer} />

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