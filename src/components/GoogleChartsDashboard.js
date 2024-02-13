import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const GoogleChartsDashboard = () => {
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('./sup_sales.csv'); // Adjust the path to your CSV file
      const text = await response.text();
      const rows = text.split('\n').slice(1); // Skip the header row
      const data1 = [['Branch', 'Total Sales']];
      const data2 = [['Branch', 'Average Rating']];
      const data3 = [['Product Line', 'Average Rating']];
      const branchSales = new Map(); // To store total sales for each branch
      const branchRatings = new Map(); // To store average ratings for each branch
      const prodRatings = new Map();
  

      rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length === 17) { // Assuming there are exactly 17 columns in the CSV
          const branch = columns[1].trim();
          const totalSales = parseFloat(columns[9].trim()); // Extracting total sales data
          const rating = parseFloat(columns[16].trim()); // Extracting rating data
          const prod_line = columns[5].trim();

          if (!isNaN(totalSales)) {
            if (branchSales.has(branch)) {
              branchSales.set(branch, branchSales.get(branch) + totalSales);
            } else {
              branchSales.set(branch, totalSales);
            }
          }

          if (!isNaN(rating)) {
            if (branchRatings.has(branch)) {
              branchRatings.set(branch, [...branchRatings.get(branch), rating]);
            } else {
              branchRatings.set(branch, [rating]);
            }
          }
          if (!isNaN(rating)) {
            if (prodRatings.has(prod_line)) {
              prodRatings.set(prod_line, [...prodRatings.get(prod_line), rating]);
            } else {
              prodRatings.set(prod_line, [rating]);
            }
          }
        }
      });

      branchSales.forEach((totalSales, branch) => {
        data1.push([branch, totalSales]);
      });

      branchRatings.forEach((ratings, branch) => {
        const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
        data2.push([branch, averageRating]);
      });
      prodRatings.forEach((ratings, prod_line) => {
        const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
        data3.push([prod_line, averageRating]);
      });

      setChartData1(data1);
      setChartData2(data2);
      setChartData3(data3)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <h2 style={{color:'white'}}>Google Charts Dashboard</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px',marginBottom:'20px',border:'20px',borderStyle:'dashed' }}>
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="BarChart"
            style={{backgroundColor:'black'}}
            loader={<div>Loading Chart</div>}
            data={chartData1}
            options={{
              title: 'Total Sales by Branch',
              chartArea: { width: '70%', height: '70%' },
              vAxis: { title: 'Total Sales' },
              hAxis: { title: 'Branch' },
              legend: 'none',
              backgroundColor: '#FFFFFF',
            
            }}
            rootProps={{ 'data-testid': '1' }}
          />
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={chartData2}
            options={{
              title: 'Average Rating by Branch',
              chartArea: { width: '70%', height: '70%' },
              vAxis: { title: 'Average Rating' },
              hAxis: { title: 'Branch' },
              legend: 'none',
            }}
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData3}
          options={{
            title: 'Average Rating by Product Line',
            chartArea: { width: '70%', height: '70%' },
            vAxis: { title: 'Average Rating' },
            hAxis: { title: 'Product Line' },
            legend: 'none',
          }}
          rootProps={{ 'data-testid': '3' }}
        />
      </div>
    </div>
  );
};

export default GoogleChartsDashboard;
