import React from 'react';
import Table from 'react-bootstrap/Table';

const VendorList = ({ vendors }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>UPI</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {vendors.map((vendor, index) => (
          <tr key={vendor.id}>
            <td>{index + 1}</td>
            <td>{vendor.name}</td>
            <td>{vendor.upi}</td>
            <td>{vendor.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VendorList;
