import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SideCart from './SideCart';
import '../App.css'

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (token) {
            setShow(true)
        } else {
            navigate("/login")
        }

    };

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }
    const getPurchases = () => {
        if (token) {
            navigate("/purchases")
        } else {
            navigate("/login")
        }
    }

    return (
        <>
            <Navbar className='navbar bg-primary' fixed="top" bg="bg-primary" expand="sm">
                <Container className="container-fluid">
                    <Navbar.Brand className="text-light" as={Link} to={"/"}><img src="./store.png" alt='store' /> E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to={"/"}><i className='bx bxs-home-alt-2'></i> Home</Nav.Link>
                            <Nav.Link as={Link} to={"/login"}><i className='bx bxs-user'></i> User</Nav.Link>
                            <Nav.Link onClick={() => getPurchases()}><i className='bx bxs-shopping-bag-alt'> Purshases</i></Nav.Link>
                            {

                            }
                            <Nav.Link onClick={handleShow}><i className='bx bxs-cart-alt'> Cart</i></Nav.Link>
                            {token &&
                                <Nav.Link onClick={() => logout()}><i className='bx bx-log-out bx-sm'></i></Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SideCart show={show} handleClose={handleClose} />
        </>
    );
};

export default NavBar;