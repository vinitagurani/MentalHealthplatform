// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // function AdminLogin() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     // Hardcoded admin credentials
// //     if (username === 'admin' && password === 'password') {
// //       navigate('/admin-dashboard');
// //     } else {
// //       alert('Invalid credentials!');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Admin Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <label>Username: </label>
// //         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br/>
// //         <label>Password: </label>
// //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AdminLogin;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './App.css'; // Optional for any custom styles

// function AdminLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Hardcoded admin credentials
//     if (username === 'admin' && password === 'password') {
//       navigate('/admin-dashboard');
//     } else {
//       alert('Invalid credentials!');
//     }
//   };

//   return (
//     <div className="container mt-5 arima-font">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4">
//             <h2 className="text-center mb-4">Admin Login</h2>
//             <form onSubmit={handleLogin}>
//               <div className="form-group">
//                 <label htmlFor="username">Username:</label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group mt-3">
//                 <label htmlFor="password">Password:</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;


// AdminLogin.js
// AdminLogin.js
import { Link } from 'react-router-dom';

function AdminLogin() {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Admin Login</h2>
      <Link to="/admin-signin">
        <button className="btn btn-primary mx-2">Admin Sign In</button>
      </Link>
      <Link to="/admin-signup">
        <button className="btn btn-primary mx-2">Admin Sign Up</button>
      </Link>
    </div>
  );
}

export default AdminLogin;
