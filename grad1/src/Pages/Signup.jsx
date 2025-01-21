import React, { useState } from 'react';
import '../assets/signup.css';
import img1 from '../assets/img/dd.jpg';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../config/firebase"; // Adjust path if needed

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { fullName, email, password, confirmPassword } = formData;

    // Validate passwords match and length
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // Create a user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore under `/Doctors/`
      await setDoc(doc(db, "Doctors", user.uid), {
        fullName: fullName,
        email: email,
        uid: user.uid,
      });

      setSuccess("Account created successfully!");
      console.log("User registered and stored in Firestore:", fullName, email);

      // Clear the form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError(error.message);
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Sign Up</h1>
        <p>Enter your credentials to create your account</p>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
        <img src={img1} alt="Doctor Icon" className="doctor-icon" />
      </div>
    </div>
  );
};

export default Signup;
