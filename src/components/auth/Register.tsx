import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Register: React.FC = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState('patient');
   const navigate = useNavigate();
   const handleRegister = async () => {
       const response = await fetch('http://localhost:3000/register', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ username, password, role }),
       });
       if (response.ok) {
           const data = await response.json();
           console.log("Successful Registration", data);
           //added
           localStorage.setItem('user', JSON.stringify({ username: data.username, role: data.role }));
           navigate('/login');
       } else {
           console.error('Registration failed');
       }
   };
   return (
<Form className="mt-5">
<Form.Group controlId="formUsername">
<Form.Label>Username</Form.Label>
<Form.Control
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
               />
</Form.Group>
<Form.Group controlId="formPassword">
<Form.Label>Password</Form.Label>
<Form.Control
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
               />
</Form.Group>
<Form.Group controlId="formRole">
<Form.Label>Role</Form.Label>
<Form.Control
                   as="select"
                   value={role}
                   onChange={(e) => setRole(e.target.value)}
>
<option value="patient">Patient</option>
<option value="doctor">Doctor</option>
</Form.Control>
</Form.Group>
<Button variant="primary" className="mt-3" onClick={handleRegister}>
               Register
</Button>
</Form>
   );
};
export default Register;


// import { useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// const Register: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const handleRegister = async () => {
//         const response = await fetch('http://localhost:3000/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });
//         if (response.ok) {
//             const data = await response.json();
//             console.log("Successful Registration",data)
//             navigate('/login');
//         } else {
//             console.error('Registration failed');
//         }
//     };
//     return (
//         <Form className="mt-5">
//             <Form.Group controlId="formUsername">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </Form.Group>
//             <Button variant="primary" className="mt-3" onClick={handleRegister}>
//                 Register
//             </Button>
//         </Form>
//     );
// };
// export default Register;