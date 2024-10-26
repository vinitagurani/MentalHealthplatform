import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FaCheckCircle } from 'react-icons/fa'; 


function TherapistSignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [succmess, setsuccmess] = useState('');
  const [errMess, setErrMess] = useState(''); // Error message state


  // const handleSignUp = (e) => {
  //   e.preventDefault();

  //   // Check if the passwords match
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }

  //   // Check if the username already exists in localStorage
  //   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  //   const userExists = storedUsers.find((user) => user.username === username);

  //   if (userExists) {
  //     navigate('/therapist-signin');
  //     alert('User already exists!');
  //   } else {
  //     // Save the new user (therapist) in localStorage
  //     const newUser = { username, password, role: 'therapist' };
  //     storedUsers.push(newUser);
  //     localStorage.setItem('users', JSON.stringify(storedUsers));
  //     alert('Sign-up successful! You can now log in.');
  //     setUsername('');
  //     setPassword('');
  //     setConfirmPassword('');
  //     navigate('/therapist-signin');
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setErrMess('Passwords do not match!');
      setsuccmess('')
      return;
    }

    try {
      // Send a POST request to the backend API
      const response = await axios.post('https://therapybackend.onrender.com/api/therapists/signup', {
        username,
        password
      });

      if (response.data.success) {
        setsuccmess('Sign-up successful, you can now log-in');
        setErrMess('')
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/therapist-signin');
        }, 2000);
        
      }
    } catch (error) {
      // Handle error response from the server
      if (error.response) {
        if (error.response.data.message === 'User already exists!') {
          setErrMess(error.response.data.message);
          setTimeout(() => {
            navigate('/therapist-signin')
          }, 2000);
        }
        setErrMess(error.response.data.message);
        setsuccmess('')
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5 arima-font card p-2">
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
      <h2 className="text-center mb-4">Therapist Sign Up</h2>
      <form onSubmit={handleSignUp} className=" p-2 rounded ">
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

export default TherapistSignUp;
