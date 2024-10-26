// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaCheckCircle } from 'react-icons/fa'; 

// function AdminSignIn() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const [succmess, setsuccmess] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();

//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const foundUser = storedUsers.find((user) => user.username === username && user.password === password && user.role === 'admin');

//     if (foundUser) {
//       // alert('Admin sign-in successful!');
//       // Redirect to admin dashboard
//       setsuccmess('Sign-In successful');
//       setTimeout(() => {
//         navigate('/admin-dashboard');
//       }, 2000);
//     } else {
//       alert('Invalid credentials!');
//     }
//   };

//   return (
//     <div className="container mt-5 arima-font card p-3">
//         {succmess && (
//               <div className="text-center mt-3">
//                 <span className="text-success">
//                   <FaCheckCircle /> {succmess}
//                 </span>
//               </div>
//             )}
//       <h2 className="text-center mb-4">Admin Sign In</h2>
//       <form onSubmit={handleSignIn} className=" p-2 rounded ">
//         <div className="mb-3">
//           <label className="form-label">Username:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default AdminSignIn;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  // Import Axios
import { FaCheckCircle } from 'react-icons/fa'; 

function AdminSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [succmess, setsuccmess] = useState('');
  const [errMess, setErrMess] = useState(''); // Error message state

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     // Make API call to the backend for admin sign-in
  //     const response = await axios.post('http://localhost:5000/api/admin/login', {
  //       username,
  //       password
  //     });

  //     if (response.status === 200) {
  //       // Sign-in successful
  //       setsuccmess('Sign-In successful');
  //       setErrMess(''); // Clear any previous error message

  //       // Store the JWT token in session storage or local storage
  //       sessionStorage.setItem('adminToken', response.data.token);

  //       // Redirect to admin dashboard
  //       setTimeout(() => {
  //         navigate('/admin-dashboard');
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       setErrMess('Invalid credentials'); // Handle invalid credentials
  //     } else {
  //       setErrMess('Error occurred during sign-in.');
  //     }
  //   }
  // };


  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      // Make API call to the backend for admin sign-in
      const response = await axios.post('https://therapybackend.onrender.com/api/admin/login', {
        username,
        password
      });
  
      if (response.status === 200) {
        // Sign-in successful
        setsuccmess('Sign-In successful');
        setErrMess(''); // Clear any previous error message
  
        // Store the JWT token in session storage or local storage
        sessionStorage.setItem('adminToken', response.data.token);
  
        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        // Check for specific error messages
        if (error.response.status === 404 && error.response.data.message === 'User not found') {
          setErrMess("You don't have an account. Please create one.");
          // Redirect to the sign-up page after 2 seconds
          setTimeout(() => {
            navigate('/admin-signup');
          }, 2000);
        } else if (error.response.status === 400) {
          setErrMess('Invalid credentials'); // Handle invalid credentials
        } else {
          setErrMess('Error occurred during sign-in.');
        }
      }
    }
  };
  
  return (
    <div className="container mt-5 arima-font card p-3">
      {succmess && (
        <div className="text-center mt-3">
          <span className="text-success">
            <FaCheckCircle /> {succmess}
          </span>
        </div>
      )}
      {errMess && (
        <div className="text-center mt-3">
          <span className="text-danger">{errMess}</span>
        </div>
      )}
      <h2 className="text-center mb-4">Admin Sign In</h2>
      <form onSubmit={handleSignIn} className="p-2 rounded">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
}

export default AdminSignIn;
