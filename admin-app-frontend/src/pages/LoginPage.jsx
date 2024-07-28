import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Login data:', data);
    const response =  await loginUser(data);
    console.log(JSON.stringify(response));
    alert("Logged in successfully!");
    navigate("/");
    localStorage.setItem("token",response.jwt);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register('username')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register('password')}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
