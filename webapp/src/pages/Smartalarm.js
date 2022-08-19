import React, { useState, useRef, useEffect } from 'react';
import mqtt from 'mqtt'
import { useNavigate } from 'react-router-dom';
import './style.css';

const Smartalarm = () => {
    var options = {
        hostname: 'hostname',
        port: 8884,
        protocol: 'wss',
        username: 'username',
        password: 'password',
        clientId: 'bytr853',
        path: '/mqtt'
    }

    const navigate = useNavigate()
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState("not connected");
    const [guard_id, setGuardId] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');
    const [data, setData] = useState([]);
    const sensorone = "hello";
    const sensortwo = "";


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
        setClient(mqtt.connect(options))
    }, []);

    useEffect(() => {

        if (client) {
            console.log(client)
            client.on('connect', () => {
                setConnectStatus('Connected');
                client.subscribe('alarm/alarmInfo');
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

                if (topic === 'alarm/alarmInfo') {
                    try {
                        setData(prev => {
                            const current = [...prev];
                            current.push(JSON.parse(mess));
                            return current;
                        });
                    } catch {
                        console.log("Bad data");
                    }
                }

            });
        }
        console.log("running")
        return () => {
            mqttDisconnect();
        };
    }, [client]);

    console.log(data);
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Smart Alarm</h2>
            <table>
                <tr>
                    <th>Time</th>
                    <th>Zone1</th>
                    <th>Zone2</th>
                    <th>Zone3</th>
                    <th>Alarm State</th>
                    <th>Alarm</th>
                </tr>
                <tbody>
                    {data.map(point => (
                        <tr key={Math.random()}>
                            <td>{point.time}</td>
                            <td>{point.zone1}</td>
                            <td>{point.zone2}</td>
                            <td>{point.zone3}</td>
                            <td>{point.alarmstate}</td>
                            <td>{point.alarm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Smartalarm