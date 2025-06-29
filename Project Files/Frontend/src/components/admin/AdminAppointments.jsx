import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';

const AdminAppointments = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/admin/getallAppointmentsAdmin', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setAllAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <Container className="mt-4 p-4 shadow-sm rounded bg-white">
        <h2 className="text-center mb-4 text-primary">All Appointments - Admin Panel</h2>
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table responsive bordered hover className="align-middle">
            <thead className="table-primary">
              <tr>
                <th>Appointment ID</th>
                <th>User Name</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments.length > 0 ? (
                allAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment._id}</td>
                    <td>{appointment.userInfo.fullName}</td>
                    <td>{appointment.doctorInfo.fullName}</td>
                    <td>{appointment.date}</td>
                    <td>{getStatusBadge(appointment.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Alert variant="info" className="text-center mb-0">
                      No Appointments to show
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default AdminAppointments;
