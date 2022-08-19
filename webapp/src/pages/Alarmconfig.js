import React, { useState, useRef, useEffect } from 'react';
import mqtt from 'mqtt'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Alarmconfig = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    const navigate = useNavigate()
    var options = {
        hostname: 'hostname',
        port: 8884,
        protocol: 'wss',
        username: 'username',
        password: 'password',
        clientId: 'bytr853',
        path: '/mqtt'
    }
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState("not connected");
    const [guard_id, setGuardId] = useState("");
    const [errMsg, setErrMsg] = useState('')
    const [succMsg, setSuccMsg] = useState('')
    const [alarmstate, setAlarmstate] = useState(null)

    const [messageStatus, setMessagestatus] = useState('Set Alarm Status')

    const [shouldRedirect, setRedirect] = useState(null)

    const userRef = useRef();
    const errRef = useRef();
    const succRef = useRef();
    const { state } = useLocation();
    var setArmed = (e) => {
        e.preventDefault();
        var publish_topic = 'alarm/state';
        console.log(publish_topic);
        var data = "armed"

        console.log(data)
        client.publish(publish_topic, data);
        client.subscribe('alarm/stateInfo');
    }
    var setChime = (e) => {
        e.preventDefault();
        var publish_topic = 'alarm/state';
        console.log(publish_topic);
        var data = "chime"

        console.log(data)
        client.publish(publish_topic, data);
        client.subscribe('alarm/stateInfo');
    }
    var disableAlarm = (e) => {
        e.preventDefault();
        var publish_topic = 'alarm/state';
        console.log(publish_topic);
        var data = "disable"

        console.log(data)
        client.publish(publish_topic, data);
        client.subscribe('alarm/disableInfo');
    }
    const mqttDisconnect = () => {
        if (client) {
            client.end(() => {
                console.log("disconnected")
                setConnectStatus('Disconnected');
            });
        }
    }
    // const redirect = () => {
    //     setTimeout(() => {
    //         navigate('/')
    //     }, 4000);
    // }
    // // const mqttConnect = (opts) => {

    // };
    useEffect(() => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(options));
    }, [])
    useEffect(() => {

        if (client) {
            console.log(client)
            client.on('connect', () => {
                setAlarmstate(JSON.parse(window.localStorage.getItem('alarmstate')));
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
                if (topic.toString() == "alarm/stateInfo") {
                    var mess = message.toString();
                    if (mess == "armed") {
                        setSuccMsg("Alarm set to armed state");
                        setAlarmstate(true)
                        window.localStorage.setItem('alarmstate', alarmstate);

                    } else if (mess == "chime") {
                        setSuccMsg("Alarm set to chime state");
                        setAlarmstate(false)
                        window.localStorage.setItem('alarmstate', alarmstate);
                    }
                    else {
                        setErrMsg(mess);
                    }
                }
                if (topic.toString() == "alarm/disableInfo") {
                    var mess = message.toString();
                    if (mess == "disabled") {
                        setSuccMsg("Alarm disabled successfully");

                    }
                    else {
                        setErrMsg(mess);

                    }
                }
            });
        }
        console.log(alarmstate)
        console.log("running")
        return () => {
            mqttDisconnect();
        };
    }, [client]);





    return (


        <div className='center white' >
            <h2 style={{ textAlign: "center" }}>Configurations</h2>

            {/* <h2 >Connection Status:<br />{connectStatus == "Connected" ? <SignalCellularAltOutlinedIcon fontSize="large" className='green' /> : <SignalCellularOffOutlinedIcon fontSize="large" className='red' />} </h2> */}






            <div style={{ margin: "auto" }}>
                <p style={{ color: "red" }} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <p style={{ color: "green" }} ref={succRef} className={succMsg ? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p></div>
            <section style={{ margin: "auto", backgroundColor: "#96D4D4" }}>
                <h2 style={{ textAlign: "center" }}>{messageStatus}</h2>
                <div style={{ margin: "auto" }}> <button onClick={setArmed} color='primary' style={{ margin: "auto" }}>ARMED</button>
                    <FontAwesomeIcon icon={faCheck} className={alarmstate ? "valid" : "hide"} />
                </div>
                <div style={{ margin: "auto" }}><button onClick={setChime} color='primary' style={{ margin: "auto" }}>CHIME</button>
                    <FontAwesomeIcon icon={faCheck} className={!alarmstate ? "valid" : "hide"} />
                </div>
                <button onClick={disableAlarm} color='primary' style={{ margin: "auto" }}>Disable Alarm</button>

                <div style={{ margin: "auto" }}>
                    <button onClick={() => navigate('/Config')}>AddUser</button>
                    <button onClick={() => navigate('/AddGuard')}>AddGuard</button>

                </div>
            </section>
        </div>

    )
}

export default Alarmconfig