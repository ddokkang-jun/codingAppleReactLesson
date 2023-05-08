import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <Navbar bg='light'>
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}>
          Goodping
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Link className='nav-link' to='/'>
            Home
          </Link>
          <Link className='nav-link' to='/cart'>
            위시리스트
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
