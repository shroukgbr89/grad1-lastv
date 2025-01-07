// ListAppointment.jsx
import React, { useState, useEffect } from 'react';
import '../assets/ListAppointment.css';
import Papa from 'papaparse';

const ListAppointment = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 50;
    const [sortOrder, setSortOrder] = useState('asc');

    const loadCSV = async () => {
        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/shroukgbr89/Dataset/main/Documents/grad/first%20implement/Dataset/Ourdataset1.csv');
            const data = await response.text();
            Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setAppointmentData(results.data);
                },
                error: (error) => console.error('Error loading CSV:', error),
            });
        } catch (error) {
            console.error('Failed to fetch CSV:', error);
        }
    };
    
    useEffect(() => {
        loadCSV();
    }, []);

    const sortAppointments = (data, sortOption) => {
        const sortedData = [...data]; 

        sortedData.sort((a, b) => {
            const timeA = a['Time'] ? new Date('1970-01-01T' + a['Time'] + 'Z') : new Date(0);
            const timeB = b['Time'] ? new Date('1970-01-01T' + b['Time'] + 'Z') : new Date(0);
            
            if (timeA < timeB) return sortOption === 'asc' ? -1 : 1;
            if (timeA > timeB) return sortOption === 'asc' ? 1 : -1;

            const dateA = a['AppointmentDay'] ? new Date(a['AppointmentDay']) : new Date();
            const dateB = b['AppointmentDay'] ? new Date(b['AppointmentDay']) : new Date();

            return sortOption === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return sortedData;
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const sortedAppointments = sortAppointments(appointmentData, sortOrder);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentAppointments = sortedAppointments.slice(startIndex, endIndex);

    return (
        <div className="container">
            <h1>List Appointments</h1>
            <div className="actions">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" onChange={handleSortChange} value={sortOrder}>
                    <option value="asc">Date & Time: Ascending</option>
                    <option value="desc">Date & Time: Descending</option>
                </select>
            </div>

            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Time</th>
                        <th>Appointment ID</th>
                        <th>Scheduled Day</th>
                        <th>Appointment Day</th>
                        <th>Place</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAppointments.map((row, index) => (
                        <tr key={index}>
                            <td>{row['PatientId'] || 'N/A'}</td>
                            <td>{row['Patient Name'] || 'N/A'}</td>
                            <td>{row['Gender'] || 'N/A'}</td>
                            <td>{row['Age'] || 'N/A'}</td>
                            <td>{row['Time'] || 'N/A'}</td>
                            <td>{row['AppointmentID'] || 'N/A'}</td>
                            <td>{row['ScheduledDay'] || 'N/A'}</td>
                            <td>{row['AppointmentDay'] || 'N/A'}</td>
                            <td>{row['Examination place'] || 'N/A'}</td>
                            <td className="actions-cell">
                                <button className="accept-btn">Accept</button>
                                <button className="cancel-btn">Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button className="page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {[1, 2, 3].map((page) => (
                    <button
                        key={page}
                        className={`page-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => changePage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button className="page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === Math.ceil(sortedAppointments.length / rowsPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default ListAppointment;
