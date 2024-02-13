import React from 'react';

const PowerBIDashboard = () => {
  return (
    <div>
      <iframe
        title="sales_pow_app"
        width="1440"
        height="650"
        src="https://app.powerbi.com/reportEmbed?reportId=f2a580b3-8689-4e2e-a496-dc0c15428599&autoAuth=true&ctid=5b973f99-77df-4beb-b27d-aa0c70b8482c"
        frameBorder="1"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default PowerBIDashboard;