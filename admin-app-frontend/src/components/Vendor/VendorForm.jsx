import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createVendor } from '../../services/apiService';

const VendorForm = ({ show, setShowVendorModal,loadVendors }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [upi, setUpi] = useState('');
  const [message, setMessage] = useState('');
  const [isError,setIsError] = useState(false);

  const handleVendorModalClose = () => {
    setShowVendorModal(false)
    setMessage('');
    setIsError(false);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVendor({ name, email, upi });
      setMessage('Vendor added successfully');
      setName('');
      setEmail('');
      setUpi('');
      const timer = setTimeout(() => {
        handleVendorModalClose();
      }, 1000); 
      
      loadVendors()
    } catch (error) {
        setIsError(true);
        if(error.response.status === 400){
          setMessage("Vendor email already registered,please try with another one");
        }else{
          setMessage('Error adding vendor');
        }
    }
  };

  return (
    <Modal show={show} onHide={handleVendorModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {!isError ? message && <div className="alert alert-info">{message}</div>:message && <div className='alert alert-danger'>{message}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formUpi" className='mb-2'>
            <Form.Label>UPI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UPI"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Vendor
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VendorForm;
