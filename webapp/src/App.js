import Register from './Register';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Smartalarm from './pages/Smartalarm';
import Smartpatrol from './pages/Smartpatrol';
import AddFinger from './pages/AddFinger';
import { AddGuard } from './pages/AddGuard';
import Alarmconfig from './pages/Alarmconfig';
import Patrolconfig from './pages/Patrolconfig';
import Config from './pages/Config';
import Home from './pages/Home';
import {Login} from './pages/Login'
import './App.scss'
import Dashboard from './pages/superAdmin/Dashboard';
import Landing from './pages/superAdmin/Landing';
function App() {

  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        {/* public routes */}
        <Route path="" element={<Landing />} />
       
      </Route>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="smartalarm" element={<Smartalarm />} />
        <Route path="register/101918171615141312" element={<Register />} />
        <Route path="smartpatrol" element={<Smartpatrol />} />
        <Route path="AddFinger" element={<AddFinger />} />
        <Route path="Addguard" element={<AddGuard />} />
        <Route path="Alarmconfig" element={<Alarmconfig />} />
        <Route path="Patrolconfig" element={<Patrolconfig />} />
        <Route path="Config" element={<Config />} />
        <Route path="Home" element={<Home />} />


      </Route>
    </Routes>



  );
}

export default App;