import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from 'antd';
import Notification from '../common/Notification';
import AdminUsers from './AdminUsers';
import AdminDoctors from './AdminDoctors';
import AdminAppointments from './AdminAppointments';

const AdminHome = () => {
  const [userdata, setUserData] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const getUserData = async () => {
    try {
      await axios.post('http://localhost:8001/api/users/getuserdata', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUserData(user);
    }
  };

  useEffect(() => {
    getUserData();
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className='admin-container'>
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="admin-logo">
            <h2 style={{
              color: 'white',
              padding: '10px 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              MediCareBook
            </h2>
          </div>
          <div className="admin-menu">
            <div 
              className={`admin-menu-item ${activeMenuItem === 'adminusers' ? 'active' : ''}`} 
              onClick={() => handleMenuItemClick('adminusers')}
            >
              <CalendarMonthIcon className='admin-icon' style={{ color: 'white' }} />
              <span>Users</span>
            </div>
            <div 
              className={`admin-menu-item ${activeMenuItem === 'admindoctors' ? 'active' : ''}`} 
              onClick={() => handleMenuItemClick('admindoctors')}
            >
              <MedicationIcon className='admin-icon' style={{ color: 'white' }} />
              <span>Doctors</span>
            </div>
            <div 
              className="admin-menu-item"
              onClick={logout}
            >
              <LogoutIcon className='admin-icon' style={{ color: 'white' }} />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Header */}
          <div className="admin-header">
            <div className="admin-header-content">
              <Badge 
                className={`admin-notify ${activeMenuItem === 'notification' ? 'active' : ''}`} 
                onClick={() => handleMenuItemClick('notification')} 
                count={userdata?.notification ? userdata.notification.length : 0}
                style={{ 
                  backgroundColor: '#5A67D8',
                  boxShadow: '0 2px 8px rgba(90, 103, 216, 0.4)'
                }}
              >
                <NotificationsIcon className='admin-icon' style={{ color: '#fff' }} />
              </Badge>
              <h3 style={{ 
                color: '#5A67D8',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                fontWeight: '500'
              }}>
                Welcome, {userdata.fullName}
              </h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="admin-body">
            {activeMenuItem === 'notification' && <Notification />}
            {activeMenuItem === 'adminusers' && <AdminUsers />}
            {activeMenuItem === 'admindoctors' && <AdminDoctors />}
            {activeMenuItem !== 'notification' && activeMenuItem !== 'adminusers' && activeMenuItem !== 'admindoctors' && <AdminAppointments />}
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .admin-container {
          height: 100vh;
          background-color: #f5f9ff;
        }
        
        .admin-layout {
          display: flex;
          height: 100%;
        }
        
        .admin-sidebar {
          width: 250px;
          background: #1976d2;
          box-shadow: 4px 0 15px rgba(25, 118, 210, 0.3);
          padding: 20px 0;
          display: flex;
          flex-direction: column;
        }
        
        .admin-logo {
          padding: 0 20px;
          margin-bottom: 30px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 20px;
        }
        
        .admin-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 10px;
        }
        
        .admin-menu-item {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          margin: 5px 0;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          border-radius: 6px;
        }
        
        .admin-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .admin-menu-item.active {
          background-color: rgba(255, 255, 255, 0.2);
          border-left: 4px solid white;
        }
        
        .admin-menu-item span {
          font-size: 15px;
          font-weight: 400;
        }
        
        .admin-icon {
          margin-right: 15px;
          font-size: 20px;
        }
        
        .admin-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .admin-header {
          background: white;
          padding: 15px 30px;
          box-shadow: 0 4px 15px rgba(135, 206, 235, 0.1);
          display: flex;
          justify-content: flex-end;
        }
        
        .admin-header-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .admin-notify {
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 50%;
          background-color: #5A67D8;
        }
        
        .admin-notify:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(90, 103, 216, 0.4) !important;
        }
        
        .admin-body {
          flex: 1;
          padding: 25px;
          overflow-y: auto;
          background-color: #f5f9ff;
        }
      `}</style>
    </div>
  );
};

export default AdminHome;