import React from 'react';

const EmployeeList = ({ employees }) => {
  return (
    <ul className="list-group">
      {employees.map(employee => (
        <li key={employee.id} className="list-group-item">
          {employee.name} - {employee.designation}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
