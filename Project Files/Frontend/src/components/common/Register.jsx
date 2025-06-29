import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import p2 from '../../images/p2.png';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '', email: '', password: '', phone: '', type: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/api/users/register', user);
      if (res.data.success) {
        message.success('Registered Successfully');
        navigate('/login');
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
          <MDBRow className='g-0'>
            <MDBCol md='6' className="d-flex align-items-center">
              <MDBCardBody className='p-5'>
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ 
                    color: '#5A67D8',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Create Your Account
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
                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: '#555' }}>Full Name</label>
                    <MDBInput
                      name='fullName'
                      value={user.fullName}
                      onChange={handleChange}
                      type='text'
                      size='lg'
                      className='mb-3'
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: '#555' }}>Email</label>
                    <MDBInput
                      name='email'
                      value={user.email}
                      onChange={handleChange}
                      type='email'
                      size='lg'
                      className='mb-3'
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: '#555' }}>Password</label>
                    <MDBInput
                      name='password'
                      value={user.password}
                      onChange={handleChange}
                      type='password'
                      size='lg'
                      className='mb-3'
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: '#555' }}>Phone</label>
                    <MDBInput
                      name='phone'
                      value={user.phone}
                      onChange={handleChange}
                      type='tel'
                      size='lg'
                      className='mb-3'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium d-block" style={{ color: '#555' }}>Account Type</label>
                    <div className="d-flex gap-4">
                      <MDBRadio
                        name='type'
                        id='admin'
                        checked={user.type === 'admin'}
                        value='admin'
                        onChange={handleChange}
                        label='Admin'
                      />
                      <MDBRadio
                        name='type'
                        id='user'
                        checked={user.type === 'user'}
                        value='user'
                        onChange={handleChange}
                        label='User'
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-100 py-3"
                    style={{
                      background: 'linear-gradient(to right, #5A67D8, #805AD5)',
                      border: 'none',
                      fontWeight: '600',
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
                    Register
                  </Button>
                </Form>

                <p className="mt-4 text-center" style={{ color: '#666' }}>
                  Already have an account?{' '}
                  <Link to={'/login'} style={{ 
                    color: '#5A67D8', 
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}>
                    Login here
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md='6' className="d-none d-md-flex position-relative" style={{ minHeight: '70vh' }}>
              <MDBCardImage
                src={p2}
                alt="Register illustration"
                className='w-100 h-100'
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%'
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(90, 103, 216, 0.1) 0%, rgba(128, 90, 213, 0.1) 100%)'
              }}></div>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;