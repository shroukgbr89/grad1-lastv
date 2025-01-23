import React, { useEffect, useState } from 'react';
import '../assets/Doctorlist.css';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from "../config/firebase"; // Adjust path if needed
import { FaEye } from 'react-icons/fa'; // Import the view profile icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Doctorlist() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const db = getFirestore(app);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Doctors"));
        const doctorsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(doctorsList); // Debugging: Check the fetched data
        setDoctors(doctorsList);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };

    fetchDoctors();
  }, [db]);

  // Function to handle view profile
  const handleViewProfile = (doctorId) => {
    navigate(`/profile/${doctorId}`); // Navigate to the profile page with doctor ID
  };

  // Function to handle delete
  const handleDelete = async (doctorId) => {
    try {
      await deleteDoc(doc(db, "Doctors", doctorId)); // Delete document from Firestore
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId)); // Update local state
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error("Error deleting doctor: ", error);
    }
  };

  return (
    <>
      <section className="doctor-list">
        <div className="controls">
          <button className="btn-all">ALL</button>
          <input type="text" placeholder="Search Doctor Name" />
          <button
            className="btn-add"
            onClick={() => navigate('/add')} // Navigate to Add Doctor page
            style={{ width: '300px', height: '40px' }}
          >
            Add Doctor
          </button>
        </div>
        <div className="cards">
          {doctors.map(doctor => (
            <div className="card" key={doctor.id}>
              <h2>{doctor.fullName}</h2>
              <h5>{doctor.Specialization || "Not specified"}</h5> {/* Display specialization */}
              <p>{doctor.about || "Not specified"}</p> {/* Display about */}
              <p>Days Available: {doctor.Days && Array.isArray(doctor.Days) ? doctor.Days.join(', ') : 'No days specified'}</p>
              <p>Start Time: {doctor.Start || "Not specified"}</p> {/* Display start time */}
              <p>Visits: {doctor.Visits || "Not specified"}</p> {/* Display visits */}
              <div className="actions">
                <button
                  className="edit"
                  onClick={() => navigate(`/Edit/${doctor.id}`)} // Pass doctor.id dynamically
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(doctor.id)} // Handle delete
                >
                  Delete
                </button>
                {/* Add view profile icon */}
                <button
                  className="view-profile"
                  onClick={() => handleViewProfile(doctor.id)} // Navigate to profile page
                >
                  <FaEye size={18} color="#6BC2E5" /> {/* Adjust size and color as needed */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
