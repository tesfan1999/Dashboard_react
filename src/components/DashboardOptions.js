// src/components/DashboardOptions.js
import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardOptions.css'; // Import your CSS file

const DashboardOptions = () => {
  return (
    <div className="dashboard-menu">
      <h1>Welcome to My Dashboard App</h1>
      <div className="menu-links">
        <Link to="/powerbi" className="menu-link">
          Power BI Dashboard
        </Link>
        <Link to="/googlecharts" className="menu-link">
          Google Charts Dashboard
        </Link>
      </div>
    </div>
  );
};


export default DashboardOptions;