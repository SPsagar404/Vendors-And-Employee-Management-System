import React, { useEffect, useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import { fetchEmployees } from '../services/apiService';
import EmployeeForm from '../components/EmployeeForm';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  
  const handleEmployeeModalShow = () => setShowEmployeeModal(true);

    const loadEmployees = async () => {
        console.log("called ")
        const data = await fetchEmployees();
        setEmployees(data);
    };

  useEffect(() => {
    
    loadEmployees();
  }, []);

  return (
    <div>
        <EmployeeForm show={showEmployeeModal} loadEmployees={loadEmployees} setShowEmployeeModal={setShowEmployeeModal} />
        <div className='d-flex justify-content-between mb-3'>
            <h2>Employees</h2>
            <button className='btn btn-primary' onClick={handleEmployeeModalShow}>Add Employee</button>
        </div>
      <EmployeeList employees={employees} />
    </div>
  );
};

export default EmployeePage;
 