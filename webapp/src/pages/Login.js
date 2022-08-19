import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from 'react';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom'
const USER_REGEX = /^[A-z ][A-z0-9-+-_ \s-]{3,23}$/;
const ID_REGEX = /^[0-9-A-z-+-_ \s-]{3,23}$/;
const NUM_REGEX = /^[0-9-+]{13}$/;

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');




  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [shouldRedirect, setRedirect] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('/login', {
      email: email,
      password: password,
      role: role

    })
    .then(function (response) {
        console.log(response);
        if (response.data) {
          setRedirect(true);
          //navigate('/')
          // setSuccMsg('successful');
          // succRef.current.focus();
        } else {
          // setErrMsg('please check your username and password');
          // errRef.current.focus();
        }
      })
      .catch(function (err) {
        console.log(err);
        // if (!err?.response) {
        //   setErrMsg('No Server Response');
        // } else if (err.response?.status == 400) {
        //   setErrMsg('Missing field');
        // } else if (err.response?.status == 401) {
        //   setErrMsg('UnAuthorized');
        // } else {
        //   setErrMsg('Failed Login')
        // }
        // errRef.current.focus();
      });
  }
  useEffect(() => {
    { shouldRedirect && navigate('/addFinger', { state: { name: email} }) }
  })

  return (
    <section style={{ margin: "auto", backgroundColor: "#96D4D4" }} >
      {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">
        </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <label htmlFor="role">Select Role</label>
        <select id="role" onChange={(e) => setRole(e.target.value)}>
            <option value="1234567"> Super Admin </option>
            <option value="7654321">Service Provider</option>
            <option value="123454321">User</option>
        </select>
        <button>Submit</button>
        
      </form>
      <div style={{ margin: "auto" }}>
        <button onClick={() => navigate('/Config')}>AddUser</button>
        <button onClick={() => navigate('/Alarmconfig')}>Alarmconfig</button>

      </div>
    </section>
  )
}
