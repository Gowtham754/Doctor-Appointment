import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import p3 from '../../images/p3.webp';

const Home = () => {
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
            <span>MediCareBook</span>
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

      <div
        className="d-flex flex-column flex-md-row align-items-center justify-content-between px-4 px-md-5 py-5 my-4 mx-3 mx-md-5"
        style={{
          background: 'linear-gradient(135deg, #fdfbfb 0%, #eceeff 100%)',
          borderRadius: '16px',
          boxShadow: '0 15px 35px rgba(90, 103, 216, 0.12)',
          minHeight: '70vh'
        }}
      >
        <div className="mb-4 mb-md-0 text-center w-100 w-md-50 d-flex justify-content-center">
          <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px'
          }}>
            <img
              src={p3}
              alt="Doctor"
              className="w-100 h-100"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.4s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(90, 103, 216, 0.1) 0%, rgba(128, 90, 213, 0.1) 100%)'
            }}></div>
          </div>
        </div>
        <div className="text-md-start text-center w-100 w-md-50 px-md-5">
          <h1 className="mb-4" style={{ 
            color: '#5A67D8',
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Your Health. Your Schedule.
          </h1>
          <p className="fs-5 mb-4 text-secondary">
            Appointments made simple,
            <br />
            <span style={{ color: '#805AD5' }}>anytime, anywhere — 2025.</span>
          </p>
          <Button
            as={Link}
            to="/login"
            size="lg"
            className="px-4 py-3 mt-3 rounded-pill border-0"
            style={{
              background: 'linear-gradient(to right, #5A67D8, #805AD5)',
              color: '#fff',
              fontWeight: 'bold',
              transition: 'all 0.3s ease-in-out',
              boxShadow: '0 4px 15px rgba(90, 103, 216, 0.4)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(90, 103, 216, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(90, 103, 216, 0.4)';
            }}
          >
            Book Your Doctor
          </Button>
        </div>
      </div>

      <Container className="py-5">
        <h1 className="text-center mb-4 fw-bold" style={{ 
          color: '#5A67D8',
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          About Us
          <span style={{
            position: 'absolute',
            bottom: '-8px',
            left: '0',
            width: '100%',
            height: '4px',
            background: 'linear-gradient(to right, #5A67D8, #805AD5)',
            borderRadius: '3px'
          }}></span>
        </h1>
        <div
          className="fs-6 lh-lg p-4 p-md-5 rounded-4 mx-3 mx-md-0"
          style={{
            background: '#ffffff',
            boxShadow: '0 8px 30px rgba(90, 103, 216, 0.1)',
            color: '#555',
          }}
        >
          <p className="fs-5">
            <strong>MediCareBook 2025</strong> gives you full control over your health.
            Skip the queues — book appointments instantly with verified doctors and specialists near you.
          </p>
          <p className="fs-5 mt-4">✨ Key Features:</p>
          <ul className="fs-5" style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li className="mb-2">
              <span className="me-2" style={{ color: '#5A67D8' }}>✓</span>
              Instant booking with confirmation
            </li>
            <li className="mb-2">
              <span className="me-2" style={{ color: '#5A67D8' }}>✓</span>
              Top-rated doctors across specialties
            </li>
            <li className="mb-2">
              <span className="me-2" style={{ color: '#5A67D8' }}>✓</span>
              Secure digital health records
            </li>
            <li className="mb-2">
              <span className="me-2" style={{ color: '#5A67D8' }}>✓</span>
              Emergency & same-day appointments
            </li>
            <li className="mb-2">
              <span className="me-2" style={{ color: '#5A67D8' }}>✓</span>
              24/7 support and mobile compatibility
            </li>
          </ul>
          <p className="fs-5 mt-4">
            Trusted by thousands, MediCareBook transforms healthcare into a smooth, digital-first experience.
            <br /><br />
            <strong>Join us today</strong> and put your health first with efficiency, transparency, and care.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Home;