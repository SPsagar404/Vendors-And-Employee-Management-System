import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchEmailLogs } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import VendorEmailModal from '../Vendor/VendorEmailModal';

const EmailLogList = () => {
  const [emailLogs, setEmailLogs] = useState([]);
  const navigate = useNavigate();
  const [showVendorEmailModal, setShowVendorEmailModal] = useState(false);

  

  const handleVendorEmailModalShow = () => setShowVendorEmailModal(true);


  const handleBackToVendors = () =>{
    navigate("/vendors");
  }

  const getEmailLogs = async () => {
    const response = await fetchEmailLogs();
    console.log(JSON.stringify(response));
    setEmailLogs(response);
  };

  useEffect(() => {
    
    if(!localStorage.getItem("token")){
        navigate("/login")
    }

    getEmailLogs();
  }, []);

  return (
    <div>
       <VendorEmailModal show={showVendorEmailModal} setShowVendorEmailModal={setShowVendorEmailModal} getEmailLogs={getEmailLogs}/>
   
      <div className='d-flex justify-content-between mb-3'>
            <h2>Email Logs</h2>
           <div>
           <button className='btn btn-primary me-2' onClick={handleBackToVendors}>Vendors</button>
           <button className='btn btn-success' onClick={handleVendorEmailModalShow}> Send Email</button>
           </div>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Vendor Name</th>
            <th>Vendor Email</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {emailLogs.map((log,index) => (
            <tr key={log.id}>
              <td>{index+1}</td>
              <td>{log.vendor.name}</td>
              <td>{log.vendor.email}</td>
              <td>{log.content}</td>
              <td>{new Date(log.sentAt).toLocaleString()}</td>
            </tr>
            
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmailLogList;
