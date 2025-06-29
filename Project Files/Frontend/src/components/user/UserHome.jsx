import React, { useEffect, useState } from 'react';
import { Badge, Row } from 'antd';
import Notification from '../common/Notification';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Container } from 'react-bootstrap';

import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';

const menuItems = [
  { key: 'home', label: 'Home', icon: <CalendarMonthIcon /> },
  { key: 'userappointments', label: 'Appointments', icon: <CalendarMonthIcon /> },
  { key: 'applyDoctor', label: 'Apply Doctor', icon: <MedicationIcon />, condition: user => !user.isdoctor },
];

const UserHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [userdata, setUserData] = useState({});
  const [active, setActive] = useState('home');

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUserData(user);
    }
  };

  const getUserData = async () => {
    try {
      await axios.post('http://localhost:8001/api/users/getuserdata', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getDoctorData = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/users/getalldoctorsu', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getUserData();
    getDoctorData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: '#5A67D8',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        padding: 20,
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 40 }}>MediCareBook</h2>
        {menuItems.map(item => {
          if (item.condition && !item.condition(userdata)) return null;
          const isActive = active === item.key;
          return (
            <div key={item.key}
              onClick={() => setActive(item.key)}
              style={{
                marginBottom: 20,
                padding: '12px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                background: isActive ? '#fff' : 'transparent',
                color: isActive ? '#5A67D8' : '#fff',
                display: 'flex',
                alignItems: 'center',
                transition: '0.3s',
              }}>
              <span style={{ marginRight: 8 }}>{item.icon}</span> {item.label}
            </div>
          );
        })}
        <div onClick={logout} style={{
          marginTop: 'auto',
          padding: '12px 16px',
          borderRadius: 8,
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          transition: '0.3s',
        }}>
          <LogoutIcon style={{ marginRight: 8 }} /> Logout
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, background: '#f7f8fc', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          background: '#fff',
          padding: '12px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Badge count={userdata.notification?.length || 0}
            onClick={() => setActive('notifications')}
            style={{ background: '#805AD5', cursor: 'pointer' }}>
            <NotificationsIcon style={{ fontSize: 28, color: '#805AD5' }} />
          </Badge>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            {userdata.isdoctor ? `Dr. ${userdata.fullName}` : userdata.fullName}
          </div>
        </header>

        {/* Page Body */}
        <div style={{ flexGrow: 1, padding: 24, overflowY: 'auto' }}>
          {active === 'notifications' && <Notification />}
          {active === 'userappointments' && <UserAppointments />}
          {active === 'applyDoctor' && <ApplyDoctor userId={userdata._id} />}
          {active === 'home' && (
            <>
              <h2 className="text-center p-2">Welcome!</h2>
              {!userdata.isdoctor && (
                <Row gutter={[16, 16]}>
                  {doctors.map((doctor, i) => {
                    let notifyDoc = doctor.userId;
                    return (
                      <DoctorList
                        key={i}
                        userDoctorId={notifyDoc}
                        doctor={doctor}
                        userdata={userdata}
                      />
                    );
                  })}
                </Row>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserHome;
