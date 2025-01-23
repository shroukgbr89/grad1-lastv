import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating random UID
import "../assets/Add.css"

export default function Addnewdoctor() {
  const [form, setForm] = useState({
    fullName: '',
    Email: '',
    Specialization: '',
    about: '',
    Days: [], // Initialize Days as an empty array
    Start: '',
    Duration: '',
    Visits: '',
    UID: uuidv4() // Generate random UID
  });

  const [errors, setErrors] = useState({}); // State to track errors

  const db = getFirestore(app);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Days') {
      // Update Days as an array
      setForm({ ...form, Days: value.split(',').map(day => day.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle form submission to add new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate each field
    if (!form.fullName) validationErrors.fullName = 'Full Name is required';
    if (!form.Email) validationErrors.Email = 'Email is required';
    if (!form.Specialization) validationErrors.Specialization = 'Specialization is required';
    if (!form.about) validationErrors.about = 'About is required';
    if (!form.Days.length) validationErrors.Days = 'Days are required';
    if (!form.Start) validationErrors.Start = 'Start Time is required';
    if (!form.Duration) validationErrors.Duration = 'Duration is required';
    if (!form.Visits) validationErrors.Visits = 'Visits are required';

    // If there are validation errors, set them in the errors state
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      try {
        await addDoc(collection(db, 'Doctors'), form); // Add document to Firestore
        alert('Doctor added successfully!');
        setForm({ // Reset form after successful addition
          fullName: '',
          Email: '',
          Specialization: '',
          about: '',
          Days: [], // Reset Days back to empty array
          Start: '',
          Duration: '',
          Visits: '',
          UID: uuidv4() // Generate new UID
        });
        setErrors({}); // Clear errors
      } catch (error) {
        console.error('Error adding doctor:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Doctor</h1>
      <form onSubmit={handleAddDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {errors.Email && <p className="error">{errors.Email}</p>}
        </label>
        <label>
          Specialization:
          <input
            type="text"
            name="Specialization"
            value={form.Specialization}
            onChange={handleInputChange}
            placeholder="Specialization"
          />
          {errors.Specialization && <p className="error">{errors.Specialization}</p>}
        </label>
        <label>
          About:
          <textarea
            name="about"
            value={form.about}
            onChange={handleInputChange}
            placeholder="About"
          />
          {errors.about && <p className="error">{errors.about}</p>}
        </label>
        <label>
          Days Available (comma separated):
          <input
            type="text"
            name="Days"
            value={form.Days.join(', ')}
            onChange={handleInputChange}
            placeholder="Days Available (e.g., Monday, Tuesday)"
          />
          {errors.Days && <p className="error">{errors.Days}</p>}
        </label>
        <label>
          Start Time:
          <input
            type="text"
            name="Start"
            value={form.Start}
            onChange={handleInputChange}
            placeholder="Start Time"
          />
          {errors.Start && <p className="error">{errors.Start}</p>}
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="Duration"
            value={form.Duration}
            onChange={handleInputChange}
            placeholder="Duration"
          />
          {errors.Duration && <p className="error">{errors.Duration}</p>}
        </label>
        <label>
          Visits:
          <input
            type="number"
            name="Visits"
            value={form.Visits}
            onChange={handleInputChange}
            placeholder="Visits"
          />
          {errors.Visits && <p className="error">{errors.Visits}</p>}
        </label>
        <button type="submit" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#4CAF50', color: '#fff' }}>
          Add Doctor
        </button>
      </form>
    </div>
  );
}
