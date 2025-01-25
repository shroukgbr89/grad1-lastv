import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/ListAppointment.css';

const ListAppointment = ({ doctorEmail, doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorEmail || !doctorId) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const appointmentsRef = collection(db, 'Reservations');

        // Query to fetch appointments for the specific doctor
        const q = query(
          appointmentsRef,
          where('Email', '==', doctorEmail),
          where('doctorId', '==', doctorId)
        );

        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(fetchedAppointments);

        if (fetchedAppointments.length > 0) {
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

  if (appointments.length === 0) {
    return <p>No appointments found for the current doctor.</p>;
  }

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <div className="doctor-details">
        <p><strong>Doctor Name:</strong> {doctorDetails?.doctorName || 'N/A'}</p>
        <p><strong>Specialization:</strong> {doctorDetails?.specialization || 'N/A'}</p>
      </div>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Time</th>
            <th>Day</th>
            <th>Patient Phone</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.time}</td>
              <td>{appointment.day}</td>
              <td>{appointment.patientPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAppointment;
