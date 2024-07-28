import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createEmployee } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ show,loadEmployees,setShowEmployeeModal }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [ctc, setCtc] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError,setIsError] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShowEmployeeModal(false);
    setMessage('');
    setIsError(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee({ name, designation, ctc, email });
      setMessage('Employee added successfully');
      setName('');
      setDesignation('');
      setCtc('');
      setEmail('');
      handleClose();
      navigate("/employees");
      console.log("navigated")
      loadEmployees();
    } catch (error) {
        setIsError(true);
        console.log(error)
      setMessage(error.response.data.error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isError ? message && <div className="alert alert-info">{message}</div>:message && <div className='alert alert-danger'>{message}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCtc">
            <Form.Label>CTC</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter CTC"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className='mt-2'>
            Add Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeForm;
