import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore imports
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../assets/Login.css';
import doctor from "../assets/img/login.webp";
import { app } from '../config/firebase'; // Firebase configuration
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons from react-icons

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // Message with type (success or error)
  const db = getFirestore(app); // Firestore instance

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Reset message

    try {
      // Query Firestore to find the user by email
      const usersCollection = collection(db, 'Doctors'); // Replace 'Doctors' with your Firestore collection name
      const q = query(usersCollection, where('email', '==', email)); // Ensure 'email' matches the field name in Firestore
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If user exists, check password
        const userDoc = querySnapshot.docs[0]; // Assuming unique emails
        const userData = userDoc.data();

        if (userData.password === password) {
          setMessage({ text: 'Login successful!', type: 'success' }); // Success message
          // Redirect to homepage (example: using React Router)
          setTimeout(() => {
            window.location.href = '/homepage'; // Replace with your actual route
          }, 1000);
        } else {
          setMessage({ text: 'Invalid password. Please try again.', type: 'error' }); // Error message
        }
      } else {
        setMessage({ text: 'No user found with this email. Please try again.', type: 'error' }); // Error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage({ text: 'An error occurred during login. Please try again later.', type: 'error' }); // Error message
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Get Started Now</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="xyz@xyz.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {message.text && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}

          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link> {/* Use Link */}
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
