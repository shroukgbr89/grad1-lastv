import React from 'react';
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

const root = ReactDOM.createRoot(document.getElementById('root'));

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
        element: <ListAppointment />,
        errorElement: <div>Oops! Something went wrong. Try again later.</div>,
      },
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'Signup', // Add route for Signup
        element: <Signup />,
      },
      {
        path: 'profile/:doctorId', // Define the profile route
        element: <Profile />,
      },
      {
        path: 'Edit/:doctorId', // Add :doctorId to make the route dynamic
        element: <Edit />,
        errorElement: <div>Oops! Something went wrong. Try again later.</div>,
      }      
    ],
  },
]);

root.render(<RouterProvider router={router} />);
