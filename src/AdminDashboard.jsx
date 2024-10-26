// import { useState, useEffect } from 'react';
// import './App.css'; // Optional for custom styles

// function AdminDashboard() {
//   const [therapistRequests, setTherapistRequests] = useState([]);

//   useEffect(() => {
//     const storedRequests = JSON.parse(localStorage.getItem('therapistRequests')) || [];
//     setTherapistRequests(storedRequests);
//   }, []);

//   const handleApprove = (index) => {
//     const updatedRequests = [...therapistRequests];
//     updatedRequests[index].status = 'approved';
//     setTherapistRequests(updatedRequests);
//     localStorage.setItem('therapistRequests', JSON.stringify(updatedRequests));
//   };

//   const handleReject = (index) => {
//     const updatedRequests = [...therapistRequests];
//     updatedRequests[index].status = 'rejected';
//     setTherapistRequests(updatedRequests);
//     localStorage.setItem('therapistRequests', JSON.stringify(updatedRequests));
//   };

//   return (
//     <div className="container mt-5 arima-font">
//       <h2 className="text-center mb-4">Therapist Requests</h2>
//       {therapistRequests.length > 0 ? (
//         <table className="table table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Qualification</th>
//               <th>Speciality</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {therapistRequests.map((request, index) => (
//               <tr key={index}>
//                 <td>{request.name}</td>
//                 <td>{request.age}</td>
//                 <td>{request.qualification}</td>
//                 <td>{request.speciality}</td>
//                 <td>{request.status}</td>
//                 <td>
//                   <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(index)}>
//                     Approve
//                   </button>
//                   <button className="btn btn-danger btn-sm" onClick={() => handleReject(index)}>
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center">No requests available.</p>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;


import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional for custom styles

function AdminDashboard() {
  const [therapistRequests, setTherapistRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // http://localhost:5000/api/admin/requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://therapybackend.onrender.com/api/admin/requests'); // Adjust the URL based on your backend setup
        if (response.data.success) {
          setTherapistRequests(response.data.requests);
        } else {
          console.error('Failed to fetch requests:', response.data.message);
        }
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to fetch requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (index) => {
    const requestId = therapistRequests[index]._id; // Get the ID of the request to approve
    try {
      const response = await axios.put(`https://therapybackend.onrender.com/api/admin/request/${requestId}/approve`);
      if (response.data.success) {
        const updatedRequests = [...therapistRequests];
        updatedRequests[index].status = 'approved'; // Update the local status
        setTherapistRequests(updatedRequests);
      } else {
        console.error('Failed to approve request:', response.data.message);
      }
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  const handleReject = async (index) => {
    const requestId = therapistRequests[index]._id; // Get the ID of the request to reject
    try {
      const response = await axios.put(`https://therapybackend.onrender.com/api/admin/request/${requestId}/reject`);
      if (response.data.success) {
        const updatedRequests = [...therapistRequests];
        updatedRequests[index].status = 'rejected'; // Update the local status
        setTherapistRequests(updatedRequests);
      } else {
        console.error('Failed to reject request:', response.data.message);
      }
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  if (loading) return <p className="text-center">Loading requests...</p>; 
  if (error) return <p className="text-center text-danger">{error}</p>; 

  return (
    <div className="container mt-5 arima-font">
      <h2 className="text-center mb-4">Therapist Requests</h2>
      {therapistRequests.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Qualification</th>
              <th>Speciality</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapistRequests.map((request, index) => (
              <tr key={request._id}>
                <td>{request.therapist.username}</td>
                <td>{request.age}</td>
                <td>{request.qualification}</td>
                <td>{request.speciality}</td>
                <td>{request.status}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(index)}>
                    Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(index)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No requests available.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
