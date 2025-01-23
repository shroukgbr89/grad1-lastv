import React, { useEffect, useState } from 'react';
import '../assets/Doctorlist.css';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../config/firebase"; // Adjust path if needed

export default function Doctorlist() {
  const [doctors, setDoctors] = useState([]);

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

  return (
    <>
      <section className="doctor-list">
        <div className="controls">
          <button className="btn-all">ALL</button>
          <input type="text" placeholder="Search Doctor Name" />
          <button
            className="btn-add"
            onClick={() => window.location.href = 'Add.html'}
            style={{ width: '700px', height: '40px' }}
          >
            Add Doctor
          </button>
        </div>
        <div className="cards">
          {doctors.map(doctor => (
            <div className="card" key={doctor.id}>
              {/* <img src={doctorImage} alt="Doctor" /> */}
              <h2>{doctor.fullName}</h2>
              <p>Specialization: {doctor.Specialization || "Not specified"}</p> {/* Display specialization */}
              <p>Days Available: {doctor.Days && Array.isArray(doctor.Days) ? doctor.Days.join(', ') : 'No days specified'}</p>
              <p>Start Time: {doctor.Start || "Not specified"}</p> {/* Display start time */}
              <p>Visits: {doctor.Visits || "Not specified"}</p> {/* Display visits */}
              <div className="actions">
                <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
                <button className="delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}