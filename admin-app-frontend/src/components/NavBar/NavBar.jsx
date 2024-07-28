import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const NavBar = () => { 

    const navigate = useNavigate();

    const handleLogout =() =>{
        console.log("shdjhsbdhasbd");
          localStorage.removeItem("token");
            localStorage.clear();
            navigate("/login");
            alert("Logged out successfully!");
      }
    
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className='ms-3'>MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {localStorage.getItem("token") && <>
          <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
          <Nav.Link as={Link} to="/vendors">Vendors</Nav.Link> 
          </>
            }
        </Nav>
        <Nav className='ms-auto'>
        { !localStorage.getItem("token") ?  
          <Button variant="outline-primary" className="me-2" onClick={()=>navigate("/login")}>Login</Button>
          :
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        }
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
