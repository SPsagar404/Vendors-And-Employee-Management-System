import axios from 'axios';

const API_URL = 'http://localhost:8080/'; // Adjust to your API base URL

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}auth/signin`, credentials);
  return response.data; // Assumes response contains { token }
};

export const fetchEmployees = async () => {
  const token = localStorage.getItem('token');
  console.log(token);
  const response = await axios.get(`${API_URL}api/admin/employees`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return response.data;
};

export const fetchVendors = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}api/admin/vendors`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return response.data;
};

export const createEmployee = async (employee) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}api/admin/employees`, employee, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  };

  export const createVendor = async (vendor) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}api/admin/vendors`, vendor, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  };

  export const fetchEmailLogs = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}api/admin/emails`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  };

  export const sendEmailsToVendors = async (vendorIds) => {
    const token = localStorage.getItem('token');
    console.log(vendorIds)
    const response = await axios.post(
      `${API_URL}api/admin/emails`, 
       vendorIds ,
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    return response.data;
  };

// Add more service functions as needed
