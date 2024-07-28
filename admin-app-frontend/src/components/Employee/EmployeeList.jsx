import React from 'react';
import Table from 'react-bootstrap/Table';

const EmployeeList = ({ employees }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Designation</th>
          <th>CTC</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={employee.id}>
            <td>{index + 1}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.designation}</td>
            <td>{employee.ctc}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeList;
