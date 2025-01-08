import React from 'react';
import doctorImage from '../assets/img/doctor.jpg';
import '../assets/Edit.css';

export default function Edit() {
  return (
    <>
        <div className="profile">
          <img src={doctorImage} alt="Doctor" />
          <form action="Doctorlist.html">
            <div className="form-group">
              <label htmlFor="doctor-name">Doctor's Name</label>
              <input type="text" id="doctor-name" name="doctor-name" placeholder="Doctor's Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input type="text" id="specialization" name="specialization" placeholder="Specialization" required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-number">Contact Number</label>
              <input type="tel" id="contact-number" name="contact-number" placeholder="Number" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email" required />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" placeholder="Age" />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea id="address" name="address" rows="4" placeholder="Doctor Address" required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="clinic-address">Clinic Address</label>
              <textarea id="clinic-address" name="clinic-address" rows="4" placeholder="Clinic Address" required></textarea>
            </div>

            <button type="submit" className="save-btn">Save</button>
          </form>
        </div>
    </>
  );
}
