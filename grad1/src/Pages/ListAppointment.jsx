import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/ListAppointment.css';

const ListAppointment = ({ doctorEmail, doctorId, userEmail, userPassword }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const db = getFirestore(app);
      const appointmentsRef = collection(db, 'Reservations');

      try {
        let q;

        // Check if admin is logged in
        if (userEmail === 'admin@gmail.com' && userPassword === 'adminuser123') {
          // Fetch all appointments if logged in as admin
          q = query(appointmentsRef);
          console.log('Fetching all appointments for admin...');
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

        console.log('Fetched appointments:', fetchedAppointments); // Debugging
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
  }, [doctorEmail, doctorId, userEmail, userPassword]);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  // Only show "No appointments found" if not an admin and no appointments are found
  if (appointments.length === 0 && !(userEmail === 'admin@gmail.com' && userPassword === 'adminuser123')) {
    return <h2 style={{ color: 'red' }}>No appointments found for this user.</h2>;
  }

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      {userEmail !== 'admin@gmail.com' && (
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
            <th>Doctor Name</th> {/* Added for admin view */}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.time}</td>
              <td>{appointment.day}</td>
              <td>{appointment.patientPhone}</td>
              <td>{appointment.doctorName || 'N/A'}</td> {/* Display doctor name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAppointment;