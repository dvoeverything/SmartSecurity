import React, { useState, useRef, useEffect } from 'react';
import mqtt from 'mqtt'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

const AddFinger = () => {
  const location = useLocation();
  const navigate = useNavigate();

  var options = {
    hostname: 'b40a03ae72f147f5b6a28c9e14cc8b68.s2.eu.hivemq.cloud',
    port: 8884,
    protocol: 'wss',
    username: 'R_ussia',
    password: 'muchengeti2011',
    clientId: 'bytr853',
    path: '/mqtt'
  }
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("not connected");
  const [guard_id, setGuardId] = useState("");
  const [errMsg, setErrMsg] = useState('')
  const [succMsg, setSuccMsg] = useState('')

  const [messageStatus, setMessagestatus] = useState('Read Instrunctions')

  const [shouldRedirect, setRedirect] = useState(false)

  const userRef = useRef();
  const errRef = useRef();
  const succRef = useRef();
  const { state } = useLocation();
  var getFinger = (e) => {
    e.preventDefault();
    var publish_topic = 'patrol/PatrolConfig/getFP';
    console.log(publish_topic);
    var data = JSON.stringify({
      guardId: state.guardId,
      guardName:state.name
    })

    console.log(data)
    client.publish(publish_topic, data);
    client.subscribe('patrol/PatrolConfig/registration');
  }
  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        console.log("disconnected")
        setConnectStatus('Disconnected');
      });
    }
  }
  const redirect = () => {
    setTimeout(() => {
      navigate('/')
    }, 4000);
  }
  // const mqttConnect = (opts) => {

  // };
  useEffect(() => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(options));
  }, [])
  useEffect(() => {

    if (client) {
      console.log(client)
      client.on('connect', () => {
        setConnectStatus('Connected');
        console.log("connected")
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        //   const payload = { topic, message: message.toString() };
        //   setPayload(payload);
        var mess = message.toString();
        if (mess == "done") {
          setSuccMsg("Done Registration redirecting in 4 seconds..");
          redirect();
        } else {
          setErrMsg(mess);
        }
      });
    }
    console.log("running")
    return () => {
      mqttDisconnect();
    };
  }, [client]);





  useEffect(() => {
    setErrMsg('');
    setSuccMsg('');
  }, [guard_id])
  return (
    <div className='center white'>
      {/* <h2 >Connection Status:<br />{connectStatus == "Connected" ? <SignalCellularAltOutlinedIcon fontSize="large" className='green' /> : <SignalCellularOffOutlinedIcon fontSize="large" className='red' />} </h2> */}

      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <p ref={succRef} className={succMsg ? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
      <div align='center'>
        <h2 >{messageStatus}</h2>
      </div>
      <button onClick={getFinger} color='primary'>Get Finger Print</button>
      AddFinger</div>
  )
}

export default AddFinger