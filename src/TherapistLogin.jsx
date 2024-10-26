
import { Link } from 'react-router-dom';

function TherapistLogin() {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Therapist Login</h2>
      <Link to="/therapist-signin">
        <button className="btn btn-primary mx-2">Therapist Sign In</button>
      </Link>
      <Link to="/therapist-signup">
        <button className="btn btn-primary mx-2">Therapist Sign Up</button>
      </Link>
    </div>
  );
}

export default TherapistLogin;
