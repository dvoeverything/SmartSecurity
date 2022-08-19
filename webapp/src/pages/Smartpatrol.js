import React, { useState, useRef, useEffect } from 'react';
import mqtt from 'mqtt'
import { useNavigate } from 'react-router-dom';
import './style.css';

const Smartpatrol = () => {
    var options = {
        hostname: 'b40a03ae72f147f5b6a28c9e14cc8b68.s2.eu.hivemq.cloud',
        port: 8884,
        protocol: 'wss',
        username: 'R_ussia',
        password: 'muchengeti2011',
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
                client.subscribe('patrol/patrolInfo');
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

                if (topic === 'patrol/patrolInfo') {
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
            <h2 style={{ textAlign: "center" }}>Smart patrol </h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Station</th>
                    <th>Alarm</th>
                    <th>time</th>
                </tr>
                <tbody>
                    {data.map(point => (
                        <tr key={Math.random()}>
                            <td>{point.name}</td>
                            <td>{point.Station}</td>
                            <td>{point.Alarm}</td>
                            <td>{point.Time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Smartpatrol