import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {
  const [dateTime, setDateTime] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [show, setShow] = useState(false);

  const currentDate = new Date().toISOString().slice(0, 16);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleDocumentChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const formattedDateTime = dateTime.replace('T', ' ');
      const formData = new FormData();
      formData.append('image', documentFile);
      formData.append('date', formattedDateTime);
      formData.append('userId', userDoctorId);
      formData.append('doctorId', doctor._id);
      formData.append('userInfo', JSON.stringify(userdata));
      formData.append('doctorInfo', JSON.stringify(doctor));

      const res = await axios.post('http://localhost:8001/api/users/getappointment', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
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
      <Card
        style={{
          width: '100%',
          maxWidth: '320px',
          margin: '1rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: 'none',
          transition: 'transform 0.3s ease',
        }}
        className="hover-shadow"
      >
        <Card.Body>
          <Card.Title className="fw-bold mb-2 text-primary">Dr. {doctor.fullName}</Card.Title>
          <Card.Text>
            <b>Phone:</b> {doctor.phone}
          </Card.Text>
          <Card.Text>
            <b>Address:</b> {doctor.address}
          </Card.Text>
          <Card.Text>
            <b>Specialization:</b> {doctor.specialization}
          </Card.Text>
          <Card.Text>
            <b>Experience:</b> {doctor.experience} Yrs
          </Card.Text>
          <Card.Text>
            <b>Fees:</b> ₹{doctor.fees}
          </Card.Text>
          <Card.Text>
            <b>Timing:</b> {doctor.timings[0]} - {doctor.timings[1]}
          </Card.Text>
          <div className="d-grid">
            <Button variant="outline-primary" onClick={handleShow} style={{ transition: 'all 0.3s ease' }}>
              Book Appointment
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Form onSubmit={handleBook}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold text-primary">Book Appointment with Dr. {doctor.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-4">
              <Col md={{ span: 10, offset: 1 }}>
                <Form.Group controlId="appointmentDate">
                  <Form.Label>Select Date & Time</Form.Label>
                  <Form.Control
                    name='date'
                    type="datetime-local"
                    min={currentDate}
                    value={dateTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3" controlId="documentUpload">
                  <Form.Label>Upload Document (if any)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={handleDocumentChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DoctorList;
