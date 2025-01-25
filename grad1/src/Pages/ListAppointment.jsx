import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/ListAppointment.css';

const ListAppointment = ({ doctorEmail, doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    setLoggedInUser(userData);

    const fetchAppointments = async () => {
      const db = getFirestore(app);
      const appointmentsRef = collection(db, 'Reservations');

      try {
        let q;
        if (userData?.admin) {
          // Fetch all appointments for admin
          q = query(appointmentsRef);
          console.log('Admin logged in: Fetching all appointments...');
        } else if (doctorEmail && doctorId) {
          // Fetch appointments for the specific doctor
          q = query(
            appointmentsRef,
            where('Email', '==', doctorEmail),
            where('doctorId', '==', doctorId)
          );
          console.log('Fetching appointments for doctor:', doctorEmail);
        } else {
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Fetched appointments:', fetchedAppointments);
        setAppointments(fetchedAppointments);

        // If fetching for a specific doctor, extract their details
        if (fetchedAppointments.length > 0 && doctorEmail && doctorId) {
          const doctorData = fetchedAppointments[0];
          setDoctorDetails({
            doctorName: doctorData.doctorName,
            specialization: doctorData.specialization,
          });
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorEmail, doctorId]);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (appointments.length === 0 && !loggedInUser?.admin) {
    return <h2 style={{ color: 'red' }}>No appointments found for this user.</h2>;
  }

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      {loggedInUser?.admin ? (
        // Admin View
        <div className="doctor-details">
          <p><strong>Name:</strong> Admin</p>
          <p><strong>Specialization:</strong> Monitor</p>
        </div>
      ) : (
        // Doctor View
        <div className="doctor-details">
          <p><strong>Doctor Name:</strong> {doctorDetails?.doctorName || 'N/A'}</p>
          <p><strong>Specialization:</strong> {doctorDetails?.specialization || 'N/A'}</p>
        </div>
      )}
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Time</th>
            <th>Day</th>
            <th>Patient Phone</th>
            <th>Doctor Name</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.time}</td>
              <td>{appointment.day}</td>
              <td>{appointment.patientPhone}</td>
              <td>{appointment.doctorName || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAppointment;
