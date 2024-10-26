// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import { FaCheckCircle } from 'react-icons/fa'; 
// import axios from 'axios'; // Import axios

// function TherapistSignIn() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // const handleSignIn = (e) => {
//   //   e.preventDefault();

//   //   // Retrieve stored users from localStorage
//   //   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//   //   const foundUser = storedUsers.find((user) => user.username === username && user.password === password && user.role === 'therapist');

//   //   if (foundUser) {
//   //     // alert('Sign-in successful!');
//   //     // Redirect to therapist dashboard
//   //     sessionStorage.setItem('therapistName', foundUser.username);
//   //     setSuccessMessage('Sign-In successful');
//   //     setTimeout(() => {
//   //       navigate('/therapist-form');
//   //     }, 2000);
//   //   } else {
//   //     alert('Invalid credentials!');
//   //   }
//   // };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       // Send a POST request to the backend API
//       const response = await axios.post('http://localhost:5000/api/therapists/login', {
//         username,
//         password
//       });

//       // Assuming the response contains a token or some identifier
//       if (response.data.token) {
//         sessionStorage.setItem('therapistToken', response.data.token); // Store the token
//         sessionStorage.setItem('therapistName', username); // Store the therapist name
//         sessionStorage.setItem('therapistId', response.id); 
//         setSuccessMessage('Sign-In successful');

//         setTimeout(() => {
//           navigate('/therapist-form');
//         }, 2000);
//       } else {
//         setErrorMessage('Invalid credentials!');
//       }
//     } catch (error) {
//       // Handle error response from the server
//       if (error.response) {
//         setErrorMessage(error.response.data.message); // Show the error message from the server
//       } else {
//         setErrorMessage('An error occurred. Please try again.'); // Fallback error message
//       }
//     }
//   };

//   return (
//     <div className="container mt-5 arima-font card p-3">

//       {successMessage && (
//         <div className="text-center mt-3">
//           <span className="text-success">
//             <FaCheckCircle /> {successMessage}
//           </span>
//           </div>
//       )}

//       {errorMessage && (
//         <div className="text-center mt-3">
//           <span className="text-danger">{errorMessage}</span>
//         </div>
//       )}

//       <h2 className="text-center mb-4">Therapist Sign In</h2>
//       <form onSubmit={handleSignIn} className="p-3 rounded ">
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

// export default TherapistSignIn;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaCheckCircle } from 'react-icons/fa'; 
import axios from 'axios'; // Import axios

function TherapistSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSignIn = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
        // Send a POST request to the backend API
        const response = await axios.post('https://therapybackend.onrender.com/api/therapists/login', {
            username,
            password
        });

        // If the login is successful, store the token and navigate
        if (response.data.token) {
            sessionStorage.setItem('therapistToken', response.data.token); // Store the token
            sessionStorage.setItem('therapistName', username); // Store the therapist name
            sessionStorage.setItem('therapistId', response.data.id); // Correctly retrieve the ID from response.data
            setSuccessMessage('Sign-In successful');

            setTimeout(() => {
                navigate('/therapist-form');
            }, 2000);
        }
    } catch (error) {
        // Handle error response from the server
        if (error.response) {
            // Check for specific error messages
            if (error.response.data.message === "User not found") {
                setErrorMessage("You don't have an account. Create an account.");
                setTimeout(() => {
                    navigate('/therapist-signup'); // Redirect to sign-up page after 2 seconds
                }, 2000);
            } else {
                setErrorMessage(error.response.data.message); // Show the error message from the server
            }
        } else {
            setErrorMessage('An error occurred. Please try again.'); // Fallback error message
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

      <h2 className="text-center mb-4">Therapist Sign In</h2>
      <form onSubmit={handleSignIn} className="p-3 rounded">
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

export default TherapistSignIn;
