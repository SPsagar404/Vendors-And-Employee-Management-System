import React, { useEffect, useState } from 'react';
import VendorList from '../components/Vendor/VendorList';
import { fetchVendors, sendEmailsToVendors } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import VendorForm from '../components/Vendor/VendorForm';

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);
  const [isEmailSent,setEmailSent] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);


  
  const handleVendorModalShow = () => setShowVendorModal(true);

  const navigate = useNavigate();

  const handleOpenEmailLogList = () =>{
    navigate("/vendors/emails/");

  }

  const loadVendors = async () => {
        
    const data = await fetchVendors();
    console.log("vendors :: "+data);
    setVendors(data);
  };

  const handleSendEmails = async () => {
    
    console.log();
    try {
      sendEmailsToVendors(vendors.map((vendor) => vendor.id)).then(()=>{
        alert("Email Send SuccessFully");
        setEmailSent(true);
        handleOpenEmailLogList();
      });
      alert('Emails sending in progress');
    } catch (error) {

        console.log(error);
      alert('Error sending emails');
    }
  };

  useEffect(() => {
    
    if(!localStorage.getItem("token")){
        navigate("/login")
    }

    loadVendors();
  }, []);

  return (
    <div>
        <VendorForm show={showVendorModal} loadVendors={loadVendors} setShowVendorModal={setShowVendorModal}/>
      <div className='d-flex justify-content-between mb-3'>
            <h2>Vendors</h2>
            <div>
            <button className='btn btn-primary me-2' onClick={handleVendorModalShow}>Add Vendor</button>
            <button className='btn btn-warning me-2' onClick={handleSendEmails}>Send Email</button>
            <button className='btn btn-success'onClick={handleOpenEmailLogList} >Email Sent Vendors</button>    
            </div>
        </div>
      <VendorList vendors={vendors} />
    </div>
  );
};

export default VendorPage;
