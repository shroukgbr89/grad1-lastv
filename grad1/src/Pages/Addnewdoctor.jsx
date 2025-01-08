import React from 'react';
import '../assets/Add.css';

export default function Addnewdoctor() {
  return (
    <>
      <div className="container">
        
        <form action="/submit-doctor" method="POST" className="doctor-form">
          {/* Doctor's Name */}
          <h1>Add New Doctor</h1>
          <div className="form-group">
            <label htmlFor="doctor-name">Doctor's Name</label>
            <input
              type="text"
              id="doctor-name"
              name="doctor-name"
              placeholder="Enter doctor's name"
              required
            />
          </div>

          {/* Specialization */}
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              placeholder="Enter specialization"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contact-number">Contact Number</label>
            <input
              type="tel"
              id="contact-number"
              name="contact-number"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender" >Gender &nbsp;</label>
            <select id="gender" name="gender" required>
              <option value="" disabled selected>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter age"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              required
            />
          </div>

          {/* Doctor's Address */}
          <div className="form-group">
            <label htmlFor="doctor-address">Doctor's Address</label>
            <textarea
              id="doctor-address"
              name="doctor-address"
              rows="4"
              placeholder="Enter doctor's address"
              required
            ></textarea>
          </div>

          {/* Clinic Address */}
          <div className="form-group">
            <label htmlFor="clinic-address">Clinic Address</label>
            <textarea
              id="clinic-address"
              name="clinic-address"
              rows="4"
              placeholder="Enter clinic address"
              required
            ></textarea>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn save-btn">
              Save Doctor
            </button>
            <button type="reset" className="btn cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
