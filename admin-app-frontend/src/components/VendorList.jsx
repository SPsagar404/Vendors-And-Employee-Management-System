import React from 'react';

const VendorList = ({ vendors }) => {

    
    
  return (
    <ul className="list-group">
      {vendors.map(vendor => (
        <li key={vendor.id} className="list-group-item">
          {vendor.name} - {vendor.upi}
        </li>
      ))}
    </ul>
  );
};

export default VendorList;
