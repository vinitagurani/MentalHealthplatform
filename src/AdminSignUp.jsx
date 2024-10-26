// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// function AdminSignUp() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const userExists = storedUsers.find((user) => user.username === username);

//     if (userExists) {
//       navigate('/admin-signin');
//       alert('User already exists!');
//     } else {
//       const newUser = { username, password, role: 'admin' };
//       storedUsers.push(newUser);
//       localStorage.setItem('users', JSON.stringify(storedUsers));

//       alert('Admin sign-up successful!');
//       setUsername('');
//       setPassword('');
//       setConfirmPassword('');
//       navigate('/admin-signin');
//     }
//   };

//   return (
//     <div className="container mt-5 arima-font card p-3">
//       <h2 className="text-center mb-4">Admin Sign Up</h2>
//       <form onSubmit={handleSignUp} className=" p-2 rounded ">
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
//         <div className="mb-3">
//           <label className="form-label">Confirm Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default AdminSignUp;

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import { FaCheckCircle } from 'react-icons/fa'; 


function AdminSignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // For error messages
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      // Make the API call to signup
      const response = await axios.post('https://therapybackend.onrender.com/api/admin/signup', {
        username,
        password,
      });

      if (response.status === 201) {
        // Signup successful
        // alert('Admin sign-up successful!');
        setSuccessMessage('Admin sign-up successful!')
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/admin-signin');
        }, 2000);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Admin already exists or other validation error
        if (error.response.data.message === 'Admin already exists' ) {
          setErrorMessage(error.response.data.message);
          setTimeout(() => {
            navigate('/admin-signin')
          }, 2000);
        }
        setErrorMessage(error.response.data.message);
      } else {
        // Other server errors
        setErrorMessage('Error occurred during sign-up.');
      }
    }
  };

  return (
    <div className="container mt-5 arima-font card p-3">
       {successMessage && (
        <div className="text-center mt-3">
          <span className="text-success">
            <FaCheckCircle /> {successMessage}
          </span>
        </div>
      )}

      {errorMessage && (
        <div className="text-center mt-3">
          <span className="text-danger">{errorMessage}</span>
        </div>
      )}
      <h2 className="text-center mb-4">Admin Sign Up</h2>
      <form onSubmit={handleSignUp} className="p-2 rounded">
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
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignUp;
