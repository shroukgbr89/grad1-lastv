import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/Profile.css';

const Profile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorRef = doc(db, 'Doctors', doctorId);
        const doctorDoc = await getDoc(doctorRef);

        if (doctorDoc.exists()) {
          setDoctor(doctorDoc.data());
        } else {
          setError('Doctor not found.');
        }
      } catch (err) {
        console.error('Error fetching doctor: ', err);
        setError('Failed to load doctor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [db, doctorId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      {doctor && (
        <>
          <h1>{doctor.fullName}</h1>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {doctor.Specialization || 'Not specified'}</p>
          <p><strong>About:</strong> {doctor.about || 'Not specified'}</p>
          <p><strong>Days Available:</strong> {doctor.Days && Array.isArray(doctor.Days) ? doctor.Days.join(', ') : 'Not specified'}</p>
          <p><strong>Start Time:</strong> {doctor.Start || 'Not specified'}</p>
          <p><strong>Duration:</strong> {doctor.Duration || 'Not specified'}</p>
          <p><strong>Visits:</strong> {doctor.Visits || 'Not specified'}</p>
          <p><strong>UID:</strong> {doctor.uid || 'Not specified'}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
