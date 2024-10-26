import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 arima-font">Welcome to the Mental Health and Therapy Platform</h1>
      <div className='arima-font'>
        <Link to="/therapist-login">
          <button className="btn btn-primary mx-2">Therapist Portal</button>
        </Link>
        <Link to="/admin-login">
          <button className="btn btn-primary mx-2">Admin Portal</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
