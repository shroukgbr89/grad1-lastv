import React, { useState } from 'react';
import '../assets/signup.css';
import img1 from '../assets/img/dd.jpg'
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to handle form submission, e.g., sending data to the backend.
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Sign Up</h1>
        <p>Enter your credentials to create your account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
        <p>
          Return to home <a href="/homepage">Home</a>
        </p>
      </div>
      <div className="image-container">
        <img src = {img1} alt="Doctor Icon" className="doctor-icon" />
      </div>
    </div>
  );
};

export default Signup;
