// App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import TherapistLogin from './TherapistLogin';
import AdminLogin from './AdminLogin';
import TherapistForm from './TherapistForm';
import AdminDashboard from './AdminDashboard';
import TherapistSignIn from './TherapistSignIn';
import TherapistSignUp from './TherapistSignUp';
import AdminSignIn from './AdminSignIn';
import AdminSignUp from './AdminSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapist-login" element={<TherapistLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/therapist-form" element={<TherapistForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/therapist-signin" element={<TherapistSignIn />} />
        <Route path="/therapist-signup" element={<TherapistSignUp />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
