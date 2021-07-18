import React, { useEffect, useState } from 'react'
import { Card, Button, ListGroup, ListGroupItem, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const NavBar = (props) => {
    const email = localStorage.getItem('email')
    const [auth, setAuth] = useState(false)

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('type')
        props.history.push('/')
    }
    const register = () => {

        props.history.push('/register')
    }

    useEffect(() => {
        if (email) {
            setAuth(true)
        }
    }, [email])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/dashboard">The License Department</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">


                    </Nav>
                    <Nav>
                        {email ? <Nav.Link href="#deets">Logged in as: {email}</Nav.Link> : <></>}

                        {email ? <Nav.Link onClick={logout}>
                            Logout
                        </Nav.Link> : <Nav.Link onClick={register}>
                            Register
                        </Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default withRouter(NavBar)