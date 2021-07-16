import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import './Application.css'

const MyApplication = (props) => {



    const email = localStorage.getItem('email')
    const [application, setApplication] = useState({})
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(process.env.PUBLIC_URL + `/${email}.png`)

    const back = () => {
        props.history.push('/dashboard')
    }

    const getApplication = async () => {
        const url = 'http://localhost:5000/api/v1/applications/status'

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

        const status = await response.status

        if (status === 200) {
            const data = await response.json()
            console.log(data)
            setApplication(data)
            setLoading(false)
        }
        else {
            props.history.push('/dashboard')
        }

    }

    useEffect(() => {
        getApplication()

    }, [])

    return (<>
        {loading ? <div className="hmm"><h1>No applications to see</h1><br></br>
            <Button variant="dark" onClick={back}>Back to dashboard</Button></div> :
            <Card border='dark' className="hmm">
                <Card.Header>{loading ? <h1>hehe</h1> : application.status.toUpperCase()}</Card.Header>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>Status of your application</Card.Title>
                    <Card.Text>
                        Hello, {application.name} your application status is currently; {application.status}. More information about what you submitted with your application can be found below...
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Occupation: {application.occupation}</ListGroupItem>
                        <ListGroupItem>Number: {application.number}</ListGroupItem>
                        <ListGroupItem>Address: {application.address}</ListGroupItem>
                    </ListGroup>


                    <Button variant="dark" onClick={back}>Back to dashboard</Button>

                </Card.Body>
                <Card.Footer className="text-muted">{loading ? < Card.Text > loading </Card.Text> : <Card.Text> Submitted on {application.date.slice(0, 10)} </Card.Text>}</Card.Footer>
            </Card >
        }


    </>
    )



}

export default withRouter(MyApplication)
