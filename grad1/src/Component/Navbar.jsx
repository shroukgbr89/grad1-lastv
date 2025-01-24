import React from 'react';
import { Link } from 'react-router-dom';
import m1 from '../assets/img/m1.jpg'; 
import '../assets/HomePage.css';

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={m1} alt="Health Care Logo" className="logo" />
          <span className="brand-name">Health Care</span>
        </div>
        <div className="nav-links">
          {/* <Link to="#" className="nav-link">Reports</Link> */}
          <div className="dropdown">
            <Link to="#" className="dropdown-link">Appointment</Link>
            <div className="dropdown-content">
              <Link to="/ListAppoinment" className="dropdown-item">List Appointment</Link>
              <Link to="#" className="dropdown-item">Appointment Status</Link>
              <Link to="#" className="dropdown-item">Doctor Schedule</Link>
            </div>
          </div>

          <div className="dropdown">
            <Link to="#" className="dropdown-link">Doctors</Link>
            <div className="dropdown-content">
              <Link to="/Doctorlist" className="dropdown-item">Doctor List View</Link>
              <Link to="/Add" className="dropdown-item">Add New Doctor</Link>
              {/* <Link to="/Edit" className="dropdown-item">Edit Profile Doctor</Link> */}
            </div>
          </div>

          <Link to="/HomePage" className="nav-link">Home</Link>

          <div className="auth-buttons">
            {/* Login and Sign up Links */}
            <Link to="/signup" className="sign-up-btn">Sign up</Link>
            <Link to="/Login" className="login-btn">Login</Link> {/* Login link */}
          </div>
        </div>
      </nav>
    </>
  );
}