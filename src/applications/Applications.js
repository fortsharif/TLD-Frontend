import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button, ListGroup, ListGroupItem, CardGroup, Row, Col, Container, Form } from 'react-bootstrap'
import './Applications.css'

const Applications = (props) => {


    /* const [admin, setAdmin] = useState(false) */
    const [url, setUrl] = useState('http://localhost:5000/api/v1/applications')
    const [applications, setApplications] = useState([])
    const [image, setImage] = useState(null)
    const [current, setCurrent] = useState(0)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [loading, setLoaded] = useState(false)
    const token = localStorage.getItem('token')
    const [update, setUpdate] = useState(null)
    const [occupation, setOccupation] = useState(null)
    const updateContainer = useRef(null)
    const userContainer = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(update)

    }

    const filterApplications = async (e) => {
        e.preventDefault()


        let url = `http://localhost:5000/api/v1/applications?occupation=${occupation}`
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

        setTotal(() => applications.total_results)
        setLoaded(() => true)
        setCurrent(() => applications.current_item)
        setApplications(() => applications.applications)

    }

    const sortApplications = async (e) => {
        e.preventDefault()
        console.log(update)

        let url = `http://localhost:5000/api/v1/applications?status=${update}`
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

        setTotal(() => applications.total_results)
        setLoaded(() => true)
        setCurrent(() => applications.current_item)
        setApplications(() => applications.applications)

    }

    const getApplications = async (page) => {
        let url = `http://localhost:5000/api/v1/applications?page=${page}`
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


        setTotal(() => applications.total_results)
        setLoaded(() => true)
        setCurrent(() => applications.current_item)
        setApplications(() => applications.applications)


        console.log(total)
        console.log(current)


    }



    useEffect(() => {
        setLoaded(() => false)
        getApplications(page)


    }, [page])




    return (
        <>
            <Container >
                <Form onSubmit={sortApplications}>
                    <Form.Text>
                        Sort by New, Pending, Accepted or Rejected
                    </Form.Text>
                    <Form.Group >


                        <Form.Label>Sort by:  </Form.Label><br />
                        <Form.Check onChange={(e) => setUpdate(e.target.value)} name='sort' value="new" label="New" inline type="radio" />

                        <Form.Check onChange={(e) => setUpdate(e.target.value)} name='sort' value="pending" label="Pending" inline type="radio" />

                        <Form.Check onChange={(e) => setUpdate(e.target.value)} name='sort' value="accepted" label="Accepted" inline type="radio" />

                        <Form.Check onChange={(e) => setUpdate(e.target.value)} name='sort' value="pending" label="Rejected" inline type="radio" />

                    </Form.Group>


                    <Button variant="dark" type="submit">
                        Sort
                    </Button>


                </Form>

                <Form onSubmit={filterApplications}>
                    <Form.Text>
                        Filter by Occupation
                    </Form.Text>
                    <Form.Group >
                        <Form.Label>Occupation:</Form.Label>
                        <Form.Control type="text" placeholder="E.g Rapper" onChange={(e) => setOccupation(e.target.value)} />


                    </Form.Group>


                    <Button variant="dark" type="submit">
                        Filter
                    </Button>


                </Form>
            </Container>

            <br></br>
            <Container>
                <Row xs={2} md={4} >
                    {applications ? applications.map((application) => {

                        return <Col>
                            <Card border='dark' style={{ width: '18rem' }}>
                                <Card.Header>{application.status.toUpperCase()}</Card.Header>
                                <Card.Img variant="top" src={`http://localhost:5000/${application.user_id}.jpg`} height='200px' width='100px' />
                                <Card.Body>
                                    <Card.Title>Status of this application:</Card.Title>
                                    <Form onSubmit={() => handleSubmit()}>
                                        <Form.Group className="mb-3" controlId="formBasicPasswod">
                                            <Form.Label>Pending</Form.Label>
                                            <Form.Check type="radio" onChange={(e) => setUpdate(e.target.value)} name="radio" value="pending" />

                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPasswod">
                                            <Form.Label>Accepted</Form.Label>
                                            <Form.Check type="radio" onChange={(e) => setUpdate(e.target.value)} name="radio" value="accepted" />

                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPasswod">
                                            <Form.Label>Rejected</Form.Label>
                                            <Form.Check type="radio" onChange={(e) => setUpdate(e.target.value)} name="radio" value="rejected" />

                                        </Form.Group>
                                        <Button variant="dark" type="submit">
                                            Update
                                        </Button>
                                    </Form>
                                    <Card.Text>

                                        This is {application.name}'s application, its current status is; {application.status}. You can update the status of this application...
                                    </Card.Text>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Occupation: {application.occupation}</ListGroupItem>
                                        <ListGroupItem>Number: {application.number}</ListGroupItem>
                                        <ListGroupItem>Address: {application.address}</ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer className="text-muted">{!loading ? < Card.Text > loading </Card.Text> : <Card.Text> Submitted on {application.date.slice(0, 10)} </Card.Text>}</Card.Footer>
                            </Card>
                        </Col>
                    }) : <h1>No Applications</h1>}
                </Row>
                {
                    page > 0 ?
                        <Button variant='dark' className='back' onClick={() => {
                            setPage((page) => page - 1)
                            //getApplications(page)


                        }}>Back</Button> : <Button variant='dark' className="back" disabled>Back</Button>

                }
                {
                    current - total <= 0 ?
                        <Button variant='dark' className='next' onClick={() => {
                            setPage((page) => page + 1)
                            //getApplications(page)


                        }}>Next</Button> : <Button variant='dark' className="next" disabled>Next</Button>
                }
            </Container>



        </>
    )

}

export default withRouter(Applications)