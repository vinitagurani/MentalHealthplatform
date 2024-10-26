// import { useState, useEffect } from 'react';
// import './App.css'; 
// function TherapistForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     qualification: '',
//     speciality: ''
//   });
//   const [existingRequest, setExistingRequest] = useState(null);

//   // Retrieve therapist name from session storage
//   useEffect(() => {
//     const therapistName = sessionStorage.getItem('therapistName');
    
//     if (therapistName) {
//       setFormData((prevData) => ({ ...prevData, name: therapistName }));

//       // Check if a request already exists for the current therapist
//       const storedRequests = JSON.parse(localStorage.getItem('therapistRequests')) || [];
//       const therapistRequest = storedRequests.find(req => req.name === therapistName);
      
//       if (therapistRequest) {
//         setExistingRequest(therapistRequest);
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Fetch existing therapist requests
//     const therapistRequests = JSON.parse(localStorage.getItem('therapistRequests')) || [];

//     // Check if a request with the same name already exists
//     const existingRequest = therapistRequests.find(req => req.name === formData.name);
    
//     if (existingRequest) {
//       alert(`A request has already been submitted by ${formData.name}. Status: ${existingRequest.status}`);
//     } else {
//       therapistRequests.push({ ...formData, status: 'pending' });
//       localStorage.setItem('therapistRequests', JSON.stringify(therapistRequests));
//       alert('Request Submitted Successfully!');
//       setExistingRequest({ ...formData, status: 'pending' }); // Update existing request with new data
//       setFormData({ name: '', age: '', qualification: '', speciality: '' }); // Reset form data
//     }
//   };

//   return (
//     <div className="container mt-5 arima-font ">
//       <h2 className="text-center mb-4">Therapist Request Form</h2>

//       {existingRequest ? (
//         <div className="card p-3">
//           <h3>Your Request Status</h3>
//           <p><strong>Name:</strong> {existingRequest.name}</p>
//           <p><strong>Age:</strong> {existingRequest.age}</p>
//           <p><strong>Qualification:</strong> {existingRequest.qualification}</p>
//           <p><strong>Speciality:</strong> {existingRequest.speciality}</p>
//           <p><strong>Status:</strong> {existingRequest.status}</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="card p-4">
//           <div className="form-group">
//             <label htmlFor="name">Name: </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="form-control"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               disabled
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label htmlFor="age">Age: </label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               className="form-control"
//               value={formData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label htmlFor="qualification">Qualification: </label>
//             <input
//               type="text"
//               id="qualification"
//               name="qualification"
//               className="form-control"
//               value={formData.qualification}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label htmlFor="speciality">Speciality: </label>
//             <input
//               type="text"
//               id="speciality"
//               name="speciality"
//               className="form-control"
//               value={formData.speciality}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary btn-block mt-4">Submit Request</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default TherapistForm;


import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './App.css';

function TherapistForm() {
  const [formData, setFormData] = useState({
    therapist: '', // This should hold the therapist ID
    name: '', // This will hold the therapist's name
    age: '',
    qualification: '',
    speciality: ''
  });
  const [existingRequest, setExistingRequest] = useState(null);

  // Retrieve therapist ID and name from session storage
  useEffect(() => {
    const therapistId = sessionStorage.getItem('therapistId'); // Get therapist ID
    const therapistName = sessionStorage.getItem('therapistName'); // Get therapist name

    if (therapistId) {
      setFormData((prevData) => ({ ...prevData, therapist: therapistId })); // Set therapist ID

      // Store the name for display purposes
      if (therapistName) {
        setFormData((prevData) => ({ ...prevData, name: therapistName })); // Set therapist name
      }

      // Check if a request already exists for the current therapist
      fetchExistingRequest(therapistId);
    }
  }, []);

// Function to check if a request already exists
const fetchExistingRequest = async (therapistId) => {
  try {
      // Fetch all requests from the admin endpoint
      const response = await axios.get('https://therapybackend.onrender.com/api/admin/requests'); // Adjust the endpoint as necessary
      const requests = response.data.requests; // Assuming the response contains an array of requests

      // Find the request made by the current therapist
      const existingRequest = requests.find(request => request.therapist._id === therapistId);

      if (existingRequest) {
        const therapistName = sessionStorage.getItem('therapistName');

        // Set the existing request along with the therapist's name
        setExistingRequest({
          ...existingRequest,
          name: therapistName, // Add the name from session storage
        });
      } else {
          setExistingRequest(null); // No existing requests found
      }
  } catch (error) {
      console.error('Error fetching existing request:', error);
      setExistingRequest(null); // Set to null in case of error
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Destructure the necessary fields from formData
        const { therapist, age, qualification, speciality } = formData;

        // Prepare the data to be sent to the API
        const requestData = {
            therapist, // Ensure therapist ID is provided
            age, // Age is required
            qualification, // Qualification is required
            speciality // Speciality is required
        };

        // Make the API call (use full URL if necessary)
        const response = await axios.post('https://therapybackend.onrender.com/api/therapists/request', requestData);

        if (response.data.success) {
            alert('Request Submitted Successfully!');

            // Retrieve the therapist's name from session storage
            const therapistName = sessionStorage.getItem('therapistName');

            // Update existing request with the name and status
            setExistingRequest({
                ...response.data.request,
                name: therapistName, // Add the name from session storage
                status: 'pending' // Keep the status as pending
            });

            // Reset form data
            setFormData({ therapist: '', age: '', qualification: '', speciality: '' });
        } else {
            alert(`Failed to submit request: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Error submitting request:', error);
        alert('An error occurred while submitting the request.');
    }
};

  return (
    <div className="container mt-5 arima-font">
      <h2 className="text-center mb-4">Therapist Request Form</h2>

      {existingRequest ? (
        <div className="card p-3">
          <h3>Your Request Status</h3>
          <p><strong>Name:</strong> {existingRequest.name}</p>
          <p><strong>Age:</strong> {existingRequest.age}</p>
          <p><strong>Qualification:</strong> {existingRequest.qualification}</p>
          <p><strong>Speciality:</strong> {existingRequest.speciality}</p>
          <p><strong>Status:</strong> {existingRequest.status}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-4">
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              readOnly // Make it read-only if you don't want it to be editable
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="qualification">Qualification: </label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              className="form-control"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="speciality">Speciality: </label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              className="form-control"
              value={formData.speciality}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-4">Submit Request</button>
        </form>
      )}
    </div>
  );
}

export default TherapistForm;
