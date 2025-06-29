import { Tabs, message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUser = () => {
    const userdata = JSON.parse(localStorage.getItem('userData'));
    if (userdata) {
      setUser(userdata);
    }
  };

  const handleAllMarkRead = async () => {
    try {
      const res = await axios.post('http://localhost:8001/api/users/markallasread',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      if (res.data.success) {
        const updatedUser = {
          ...user,
          notification: [],
          seennotification: [...user.seennotification, ...user.notification],
        };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        message.success(res.data.message);
        setUser({ ...user, notification: [] });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handledeleteAllMark = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/users/deleteallnotification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setUser({ ...user, seennotification: [] });
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Tab content using new `items` API
  const tabItems = [
    {
      key: '1',
      label: 'Unread',
      children: (
        <>
          <div className="d-flex justify-content-end mb-3">
            <h5
              onClick={handleAllMarkRead}
              style={{
                cursor: 'pointer',
                color: '#805AD5',
                fontWeight: '500',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#4C51BF')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#805AD5')}
            >
              Mark all as read
            </h5>
          </div>

          {user?.notification.length === 0 ? (
            <p className="text-center text-muted">No new notifications</p>
          ) : (
            user?.notification.map((notificationMsg, index) => (
              <div
                key={index}
                className="p-3 mb-3 shadow-sm rounded"
                style={{
                  background: '#F7FAFC',
                  borderLeft: '5px solid #5A67D8',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onClick={() => navigate(notificationMsg.onClickPath)}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ fontWeight: 500, color: '#2D3748' }}>{notificationMsg.message}</div>
              </div>
            ))
          )}
        </>
      )
    },
    {
      key: '2',
      label: 'Read',
      children: (
        <>
          <div className="d-flex justify-content-end mb-3">
            <h5
              onClick={handledeleteAllMark}
              style={{
                cursor: 'pointer',
                color: '#805AD5',
                fontWeight: '500',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#4C51BF')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#805AD5')}
            >
              Delete all
            </h5>
          </div>

          {user?.seennotification.length === 0 ? (
            <p className="text-center text-muted">No seen notifications</p>
          ) : (
            user?.seennotification.map((notificationMsg, index) => (
              <div
                key={index}
                className="p-3 mb-3 shadow-sm rounded"
                style={{
                  background: '#EDF2F7',
                  borderLeft: '5px solid #A0AEC0',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onClick={() => navigate(notificationMsg.onClickPath)}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ fontWeight: 500, color: '#4A5568' }}>{notificationMsg.message}</div>
              </div>
            ))
          )}
        </>
      )
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4" style={{
        color: '#5A67D8',
        borderBottom: '2px solid #805AD5',
        display: 'inline-block',
        paddingBottom: '6px'
      }}>
        Notifications
      </h2>

      <Tabs
        centered
        items={tabItems}
        tabBarStyle={{
          fontWeight: '600',
          fontSize: '16px',
          color: '#5A67D8'
        }}
      />
    </div>
  );
};

export default Notification;
