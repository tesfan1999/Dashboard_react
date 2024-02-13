import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardOptions from './components/DashboardOptions';
import PowerBIDashboard from './components/PBIDashboard';
import GoogleChartsDashboard from './components/GoogleChartsDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardOptions />} />
        <Route path="/powerbi" element={<PowerBIDashboard />} />
        <Route path="/googlecharts" element={<GoogleChartsDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
