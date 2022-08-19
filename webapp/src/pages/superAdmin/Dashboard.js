import { Outlet } from "react-router-dom";
import React from "react";

const Dashboard = () => {
    return <div style={{
        padding: '50px 0px 0px 370px'
    }}>

        <Outlet />
    </div>;
};

export default Dashboard;