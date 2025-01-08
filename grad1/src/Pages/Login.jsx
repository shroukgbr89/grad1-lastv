import React from 'react';
import '../assets/Login.css';
import doctor from "../assets/img/login.webp"

const LoginPage = () => {
  return (
    <div className="container">
      <div className="form-section">
        <h1>Get Started Now</h1>
        <form action="homepage.html" method="get">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="xyz@xyz.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <a href="Signup.html">Sign Up</a>
        </p>
      </div>

      <div className="image-section">
        <img src={doctor} alt="Doctor Icon" />
        <div className="decorative-shapes"></div>
      </div>
    </div>
  );
};

export default LoginPage;
