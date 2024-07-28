import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [message,setMessage] = useState('');

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Login data:', data);
    loginUser(data).then((response)=>{
      console.log(JSON.stringify(response));
      alert("Logged in successfully!");
      localStorage.setItem("token",response.jwt);
        navigate("/");
    }).catch((error)=>{
        setMessage(error.response.data.error);
        
    });
    
    
  };

  return (
    <div className='card w-50 mx-auto'>   
      <div className='card-header'>
      <h2>Login</h2>
      </div>
      <div className='card-body'>
      {message && <div className='alert alert-danger'>{message}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-2">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register('username')}
            required
          />
        </div>
        <div className="form-group mb2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register('password')}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Login</button>
      </form>
      
      </div>
     
    </div>
  );
};

export default LoginPage;
