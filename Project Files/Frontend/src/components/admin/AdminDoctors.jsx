import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/admin/getalldoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId, userId) => {
    try {
      const res = await axios.post('http://localhost:8001/api/admin/getapprove', {
        doctorId,
        status: 'approved',
        userid: userId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Refresh list
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleReject = async (doctorId, userId) => {
    try {
      const res = await axios.post('http://localhost:8001/api/admin/getreject', {
        doctorId,
        status: 'rejected',
        userid: userId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Refresh list
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge bg="warning" text="dark">Pending</Badge>;
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Container className="mt-4 p-4 shadow-sm bg-white rounded">
      <h2 className="text-center mb-4 text-primary">Doctor Applications</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table responsive striped bordered hover className="align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc._id}</td>
                  <td>{doc.fullName}</td>
                  <td>{doc.email}</td>
                  <td>{doc.phone}</td>
                  <td>{renderStatusBadge(doc.status)}</td>
                  <td className="text-center">
                    {doc.status === 'pending' ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline-success"
                          className="me-2"
                          onClick={() => handleApprove(doc._id, doc.userId)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleReject(doc._id, doc.userId)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-muted">No Actions</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Alert variant="info" className="text-center mb-0">
                    No doctors found.
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDoctors;
