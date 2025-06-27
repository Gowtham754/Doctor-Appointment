import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import { FiDownload } from 'react-icons/fi';

const UserAppointments = () => {
  const [userid, setUserId] = useState();
  const [type, setType] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      const { _id, isdoctor } = user;
      setUserId(_id);
      setType(isdoctor);
    } else {
      alert('No user to show');
    }
  };

  const getUserAppointment = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8001/api/users/getuserappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: userid,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setUserAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const getDoctorAppointment = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8001/api/doctors/getdoctorappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: userid,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setDoctorAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (userid, appointmentId, status) => {
    try {
      const res = await axios.post('http://localhost:8001/api/doctors/handlestatus', {
        userid,
        appointmentId,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getDoctorAppointment();
        getUserAppointment();
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleDownload = async (url, appointId) => {
    try {
      const res = await axios.get('http://localhost:8001/api/doctors/getdocumentdownload', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        params: { appointId },
        responseType: 'blob'
      });
      if (res.data) {
        const fileUrl = window.URL.createObjectURL(new Blob([res.data], { "type": "application/pdf" }));
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute("href", fileUrl);
        const fileName = url.split("/").pop();
        downloadLink.setAttribute("download", fileName);
        downloadLink.style.display = "none";
        downloadLink.click();
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userid) {
      if (type === true) {
        getDoctorAppointment();
      } else {
        getUserAppointment();
      }
    }
  }, [type, userid]);

  return (
    <div>
      <h2 className='text-center mt-4 mb-3' style={{ color: '#4B0082' }}>Your Appointments</h2>
      <Container>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : type === true ? (
          <Table responsive striped bordered hover className="shadow-sm rounded">
            <thead style={{ background: '#4B0082', color: 'white' }}>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Phone</th>
                <th>Document</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.length > 0 ? (
                doctorAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo.fullName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.userInfo.phone}</td>
                    <td>
                      {appointment.document ? (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleDownload(appointment.document.path, appointment._id)}
                        >
                          <FiDownload className='me-1' />
                          {appointment.document.filename}
                        </Button>
                      ) : (
                        <span className="text-muted fst-italic">No document</span>
                      )}
                    </td>

                    <td>
                      <span className={`badge ${appointment.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      {appointment.status === 'approved' ? (
                        <Button size="sm" variant="secondary" disabled>Approved</Button>
                      ) : (
                        <Button size="sm" variant="success" onClick={() => handleStatus(appointment.userInfo._id, appointment._id, 'approved')}>Approve</Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <Alert variant="info" className="text-center mb-0">
                      No Appointments to show
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <Table responsive striped bordered hover className="shadow-sm rounded">
            <thead style={{ background: '#4B0082', color: 'white' }}>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.length > 0 ? (
                userAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.docName}</td>
                    <td>{appointment.date}</td>
                    <td>
                      <span className={`badge ${appointment.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
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

export default UserAppointments;
