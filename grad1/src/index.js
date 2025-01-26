import React, { useState } from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import DoctorList from './Pages/DoctorList';
import './assets/HomePage.css';
import Addnewdoctor from './Pages/Addnewdoctor';
import Edit from './Pages/Edit';
import ListAppointment from './Pages/ListAppointment';
import Login from './Pages/Login';
import Signup from './Pages/Signup'; 
import Profile from './Pages/Profile'; // Import the Profile component

// Error boundary component to catch and display errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('Error caught in ErrorBoundary: ', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops! Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function MainRouter() {
  const [doctorEmail, setDoctorEmail] = useState(localStorage.getItem('doctorEmail') || null);
  const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId') || null); // Fetch doctorId from localStorage

  const handleLogin = (email, id) => {
    setDoctorEmail(email);
    setDoctorId(id);
    localStorage.setItem('doctorEmail', email); // Store email in localStorage
    localStorage.setItem('doctorId', id); // Store doctorId in localStorage
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: 'Homepage',
          element: <Homepage />,
        },
        {
          path: 'DoctorList',
          element: <DoctorList />,
        },
        {
          path: 'Add',
          element: <Addnewdoctor />,
        },
        {
          path: 'Edit',
          element: <Edit />,
        },      
        {
          path: 'ListAppointment',
          element: <ListAppointment doctorEmail={doctorEmail} doctorId={doctorId} />,
        },  
        {
          path: '/appointments',
          element: <ListAppointment doctorEmail={doctorEmail} doctorId={doctorId} />,
        },       
        {
          path: 'Login',
          element: <Login onLogin={handleLogin} />,
        },
        {
          path: 'Signup',
          element: <Signup />,
        },
        {
            path: 'profile/:doctorId',
            element: <Profile />,
          
        },
        {
          path: 'Edit/:doctorId', // Add :doctorId to make the route dynamic
          element: <Edit />,
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainRouter />); // Render the MainRouter component