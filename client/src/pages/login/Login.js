import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
//import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const showPassword = () => {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  //  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
    console.log(event.target);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //setErrors(Validation(values));
    //console.log(values);
    axios
      .post('http://localhost:4000/login', values)
      .then((res) => {
        console.log(res);
        if (res.data.massage === 'login Successfully.') {
          window.localStorage.setItem('id', res.data.userData.id);
          window.localStorage.setItem('email', res.data.userData.email);
          window.localStorage.setItem('token', res.data.userData.token);
          window.localStorage.setItem('type', res.data.userData.type);
          navigate('/home');
          //navigate(`/home/${res.data.userData.id}`);
        }
      })
      .catch((err) => {
        alert('please check you email or pasword.');
        console.log(err);
      });
  };

  return (
    <div className="container ">
      <form className="form" onSubmit={handleSubmit}>
        <span className="login">Login</span>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="form--input"
          onChange={handleInput}
          required
        />
        {/* 
        {errors.email && <span className="errMassage">{errors.email}</span>} */}
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="form--input"
          onChange={handleInput}
          required
        />
        <div className="form--marketing" style={{ alignSelf: 'baseline' }}>
          <input id="okayToEmail" type="checkbox" onClick={showPassword} />
          <label htmlFor="okayToEmail" className="checkbox">
            show password
          </label>
        </div>
        {/* {errors.password && (
          <span className="errMassage">{errors.password}</span>
        )} */}
        <div className="loginButtons">
          <button className="form--submit">Login</button>
          <Link to="/signup">
            <button className="form--submit">SignUp</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
