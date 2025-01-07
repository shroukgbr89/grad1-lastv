import React from 'react';
import doctorImage from '../assets/img/doctor.jpg';
import '../assets/Doctorlist.css';

export default function Doctorlist() {
  return (
    <>
      <section className="doctor-list">
        <div className="controls">
          <button className="btn-all">ALL</button>
          <input type="text" placeholder="Search Doctor Name" />
          <button
                className="btn-add"
                onClick={() => window.location.href = 'Add.html'}
                style={{ width: '700px', height: '40px' }}
                >
                Add Doctor
                </button>
        </div>
        <div className="cards">
          {/* Repeat this card for each doctor */}
          <div className="card">
            <img src={doctorImage} alt="Doctor" />
            <h3>Dr Ahmed Mohamed</h3>
            <p>Specialist: Dentist</p>
            <p>Rate: 3.5</p>
            <div className="actions">
              <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          {/* Duplicate the above card structure for other doctors */}
          <div className="card">
            <img src={doctorImage} alt="Doctor" />
            <h3>Dr Ahmed Mohamed</h3>
            <p>Specialist: Dentist</p>
            <p>Rate: 3.5</p>
            <div className="actions">
              <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          <div className="card">
            <img src={doctorImage} alt="Doctor" />
            <h3>Dr Ahmed Mohamed</h3>
            <p>Specialist: Dentist</p>
            <p>Rate: 3.5</p>
            <div className="actions">
              <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          <div className="card">
            <img src={doctorImage} alt="Doctor" />
            <h3>Dr Ahmed Mohamed</h3>
            <p>Specialist: Dentist</p>
            <p>Rate: 3.5</p>
            <div className="actions">
              <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          <div className="card">
            <img src={doctorImage} alt="Doctor" />
            <h3>Dr Ahmed Mohamed</h3>
            <p>Specialist: Dentist</p>
            <p>Rate: 3.5</p>
            <div className="actions">
              <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          <div className="card">
            <img src={doctorImage} alt="Doctor" />
            <h3>Dr Ahmed Mohamed</h3>
            <p>Specialist: Dentist</p>
            <p>Rate: 3.5</p>
            <div className="actions">
              <button className="edit" onClick={() => window.location.href = 'Edit.html'}>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
