import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

function ApplyDoctor({ userId }) {
   const [doctor, setDoctor] = useState({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      specialization: '',
      experience: '',
      fees: '',
      timings: '',
   });

   const handleTimingChange = (value) => {
   if (value && value.length === 2) {
      const formatted = value.map((time) => time.format('HH:mm'));
      setDoctor({ ...doctor, timings: formatted });
   }
};


   const handleChange = (e) => {
      setDoctor({ ...doctor, [e.target.name]: e.target.value });
   };

   const handleSubmit = async () => {
      try {
         const res = await axios.post(
            'http://localhost:8001/api/users/registerdoc',
            { doctor, userId: userId },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         );
         if (res.data.success) {
            message.success(res.data.message);
         } else {
            message.error(res.data.message);
         }
      } catch (error) {
         console.log(error);
         message.error('Something went wrong');
      }
   };

   return (
      <Container className="mt-4 p-4 shadow-sm rounded bg-white">
         <h2 className="text-center mb-4 text-primary">Apply as Doctor</h2>
         <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="p-3"
            style={{ fontSize: '16px' }}
         >
            <h5 className="text-secondary mb-3">Personal Details</h5>
            <Row gutter={[16, 16]}>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Full Name"
                     name="fullName"
                     rules={[{ required: true, message: 'Please enter full name' }]}
                  >
                     <Input
                        name="fullName"
                        value={doctor.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Phone"
                     name="phone"
                     rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                     <Input
                        name="phone"
                        value={doctor.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Enter phone number"
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Email"
                     name="email"
                     rules={[{ required: true, message: 'Please enter email' }]}
                  >
                     <Input
                        name="email"
                        value={doctor.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter email"
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={12}>
                  <Form.Item
                     label="Address"
                     name="address"
                     rules={[{ required: true, message: 'Please enter address' }]}
                  >
                     <Input
                        name="address"
                        value={doctor.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                     />
                  </Form.Item>
               </Col>
            </Row>

            <h5 className="text-secondary my-4">Professional Details</h5>
            <Row gutter={[16, 16]}>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Specialization"
                     name="specialization"
                     rules={[{ required: true, message: 'Please enter specialization' }]}
                  >
                     <Input
                        name="specialization"
                        value={doctor.specialization}
                        onChange={handleChange}
                        placeholder="e.g. Cardiologist"
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Experience (in years)"
                     name="experience"
                     rules={[{ required: true, message: 'Please enter experience' }]}
                  >
                     <Input
                        name="experience"
                        value={doctor.experience}
                        onChange={handleChange}
                        type="number"
                        placeholder="e.g. 5"
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Fees (₹)"
                     name="fees"
                     rules={[{ required: true, message: 'Please enter fees' }]}
                  >
                     <Input
                        name="fees"
                        value={doctor.fees}
                        onChange={handleChange}
                        type="number"
                        placeholder="e.g. 500"
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12} lg={8}>
                  <Form.Item
                     label="Timings"
                     name="timings"
                     rules={[{ required: true, message: 'Please select timings' }]}
                  >
                     <TimePicker.RangePicker
                        format="HH:mm"
                        onChange={handleTimingChange}
                        style={{ width: '100%' }}
                     />
                  </Form.Item>
               </Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
               <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                     padding: '8px 24px',
                     fontSize: '16px',
                     borderRadius: '8px',
                     transition: 'all 0.3s ease-in-out',
                  }}
               >
                  Submit
               </button>
            </div>
         </Form>
      </Container>
   );
}

export default ApplyDoctor;
