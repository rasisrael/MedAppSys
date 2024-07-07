import React, { useEffect, useState } from 'react';
  import { Toast } from 'react-bootstrap';
  interface Notification {
      id: number;
      doctor_username: string;
      message: string;
      is_read: boolean;
      created_at: string;
  }
  const NotificationList: React.FC = () => {
      const [notifications, setNotifications] = useState<Notification[]>([]);
      const [error, setError] = useState<string | null>(null);
      useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/notifications', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Notification[] = await response.json();
                setNotifications(data);
            } catch (error) {
                setError('Something went wrong while fetching notifications.');
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    if (notifications.length === 0) {
        return <div>No notifications available.</div>;
    }
    return (
 <div>
            {notifications.map((notification) => (
 <Toast key={notification.id}>
 <Toast.Header>
 <strong className="me-auto">Notification</strong>
 <small>{new Date(notification.created_at).toLocaleString()}</small>
 </Toast.Header>
 <Toast.Body>{notification.message}</Toast.Body>
 </Toast>
            ))}
 </div>
    );
 };
 export default NotificationList;
//           const fetchNotifications = async () => {
//               const token = localStorage.getItem('token');
//               const response = await fetch('http://localhost:3000/notifications', {
//                 credentials: 'include',
    
//               headers: {
//                       'Content-Type': 'application/json',
//                       Authorization: `Bearer ${token}`,
//                   },
//               });
//               const data = await response.json();
//               setNotifications(data);
//           };
//           fetchNotifications();
//       }, []);
//       return (
// <div>
//               {notifications.map((notification) => (
// <Toast key={notification.id}>
// <Toast.Header>
// <strong className="me-auto">Notification</strong>
// <small>{new Date(notification.created_at).toLocaleString()}</small>
// </Toast.Header>
// <Toast.Body>{notification.message}</Toast.Body>
// </Toast>
//               ))}
// </div>
//       );
//   };
//   export default NotificationList;