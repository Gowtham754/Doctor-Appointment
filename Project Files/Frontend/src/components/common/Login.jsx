import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import photo1 from '../../images/photo1.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/users/login", user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const { type } = res.data.userData;

        switch (type) {
          case "admin":
            navigate("/adminHome");
            break;
          case "user":
            navigate("/userhome");
            break;
          default:
            navigate("/Login");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm py-3 sticky-top">
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold fs-3"
            style={{
              background: 'linear-gradient(90deg, #5A67D8, #805AD5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            MediCareBook
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Link
                to="/"
                className="text-decoration-none fw-medium px-3 py-2"
                style={{
                  color: '#333',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#5A67D8')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#333')}
              >
                Home
              </Link>

              <Link to="/login">
                <Button
                  variant="outline-primary"
                  className="fw-semibold px-3 py-1 rounded-3"
                  style={{
                    borderColor: '#5A67D8',
                    color: '#5A67D8',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#5A67D8';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#5A67D8';
                  }}
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  className="fw-semibold px-3 py-1 rounded-3"
                  style={{
                    background: 'linear-gradient(to right, #5A67D8, #805AD5)',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 4px 10px rgba(90, 103, 216, 0.4)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(90, 103, 216, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(90, 103, 216, 0.4)';
                  }}
                >
                  Register
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ 
          border: 'none', 
          boxShadow: '0 15px 35px rgba(90, 103, 216, 0.12)',
          borderRadius: '15px',
          overflow: 'hidden'
        }}>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={photo1}
                alt="Login visual"
                className="w-100 h-100"
                style={{ 
                  objectFit: 'cover',
                  filter: 'brightness(0.95)',
                }}
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="p-5">
                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-3" style={{ 
                    color: '#5A67D8',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Sign in to Your Account
                    <span style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '100%',
                      height: '3px',
                      background: 'linear-gradient(to right, #5A67D8, #805AD5)',
                      borderRadius: '3px'
                    }}></span>
                  </h2>
                </div>

                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-medium" style={{ color: '#555' }}>Email</label>
                    <MDBInput
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      type="email"
                      size="lg"
                      className="mb-3"
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium" style={{ color: '#555' }}>Password</label>
                    <MDBInput
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      type="password"
                      size="lg"
                      className="mb-3"
                      autoComplete="off"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-100 py-3 mt-3"
                    style={{
                      background: 'linear-gradient(to right, #5A67D8, #805AD5)',
                      border: 'none',
                      fontWeight: '600',
                      color: '#fff',
                      boxShadow: '0 4px 15px rgba(90,103,216,0.4)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(90,103,216,0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(90,103,216,0.4)';
                    }}
                  >
                    Login
                  </Button>
                </Form>

                <p className="mt-4 text-center" style={{ color: '#666' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ 
                    color: '#5A67D8', 
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}>
                    Register here
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Login;