import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from 'react';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom'
const USER_REGEX = /^[A-z ][A-z0-9-+-_ \s-]{3,23}$/;
const ID_REGEX = /^[0-9-A-z-+-_ \s-]{3,23}$/;
const NUM_REGEX = /^[0-9-+]{13}$/;

export const AddGuard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [natIdNum, setNatIdNum] = useState('');
  const [validNatIdNum, setValidNatIdNum] = useState(false);
  const [natIdNumFocus, setNatIdNumFocus] = useState(false);

  const [phoneNum, setPhoneNum] = useState('');
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneNumFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [shouldRedirect, setRedirect] = useState(false)

  // useEffect(() => {
  //     userRef.current.focus();
  // }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidNatIdNum(ID_REGEX.test(natIdNum));
  }, [natIdNum])

  useEffect(() => {
    setValidPhoneNum(NUM_REGEX.test(phoneNum));
  }, [phoneNum])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = ID_REGEX.test(natIdNum);
    const v3 = NUM_REGEX.test(phoneNum);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    e.preventDefault();
    axios.post('/patrol/registration', {
      user: user,
      natIdNum: natIdNum,
      phoneNum: phoneNum,

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
    { shouldRedirect && navigate('/addFinger', { state: { name: user, guardId: natIdNum } }) }
  })

  return (
    <section style={{ margin: "auto", backgroundColor: "#96D4D4" }} >
      {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

      <h3>Register Guard</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">
          Name:
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="NationalIdNum">
          National ID Number:
          <FontAwesomeIcon icon={faCheck} className={validNatIdNum ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validNatIdNum || !natIdNum ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setNatIdNum(e.target.value)}
          value={natIdNum}
          required
        />
        <label htmlFor="phoneNum">
          Phone Number <p>+263XXXXXXXXX</p>:
          <FontAwesomeIcon icon={faCheck} className={validPhoneNum ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPhoneNum || !phoneNum ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="NatID"
          autoComplete="off"
          onChange={(e) => setPhoneNum(e.target.value)}
          value={phoneNum}
          required
        />
        <button disabled={!validName || !validPhoneNum || !validNatIdNum ? true : false}>Submit</button>

      </form>
      <div style={{ margin: "auto" }}>
        <button onClick={() => navigate('/Config')}>AddUser</button>
        <button onClick={() => navigate('/Alarmconfig')}>Alarmconfig</button>

      </div>
    </section>
  )
}
