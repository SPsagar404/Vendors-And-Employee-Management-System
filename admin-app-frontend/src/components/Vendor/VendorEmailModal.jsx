import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Form } from 'react-bootstrap';
import { fetchVendors, sendEmailsToVendors } from '../../services/apiService';

const VendorEmailModal = ({ show, setShowVendorEmailModal,getEmailLogs }) => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [loader,SetLoader] = useState(false);
  
  const handleClose = () => {
    setShowVendorEmailModal(false);
    console.log("cadhkjlkwerhkwejrh");
    setAllSelected([]);
    setSelectedVendors([]);
  
  }

  useEffect(() => {
    const getVendors = async () => {
      const response = await fetchVendors();
      setVendors(response);
    };
    if (show) {
      getVendors();
    }
  }, [show]);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(vendors.map((vendor) => vendor.id));
    }
    setAllSelected(!allSelected);
  };

  const handleCheckboxChange = (vendorId) => {
    setSelectedVendors((prevSelectedVendors) => {
      if (prevSelectedVendors.includes(vendorId)) {
        return prevSelectedVendors.filter((id) => id !== vendorId);
      } else {
        return [...prevSelectedVendors, vendorId];
      }
    });
  };

  const handleSendEmails = async () => {
    
    console.log(selectedVendors);
    try {
      sendEmailsToVendors(selectedVendors).then(()=>{
        alert("Emails sent successfully!");
        SetLoader(false);
        getEmailLogs();
        handleClose();

      });
      SetLoader(true);
      alert('Emails sending in process,please wait few seconds and redirected to emaillogs page!');
            
    } catch (error) {
      alert('Error sending emails');
    }
  };

  return (
    <>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Vendor List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>UPI</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>
                  <Form.Check 
                    type="checkbox" 
                    checked={selectedVendors.includes(vendor.id)}
                    onChange={() => handleCheckboxChange(vendor.id)} 
                  />
                </td>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.upi}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="outline-primary" onClick={handleSelectAll} className="me-2">
      {allSelected ? 'Unselect All' : 'Select All'}
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendEmails} disabled={selectedVendors.length === 0}>
          Send Emails
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default VendorEmailModal;
