import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import API_BASE_URL from '../config';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedTimeframe]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from multiple endpoints to create comprehensive analytics
      const [apodResponse, epicResponse, searchResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/apod`),
        axios.get(`${API_BASE_URL}/api/epic`),
        axios.get(`${API_BASE_URL}/api/search?q=space`)
      ]);

      // Process and analyze the data
      const processedData = processAnalyticsData(apodResponse.data, epicResponse.data, searchResponse.data);
      setAnalyticsData(processedData);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch analytics data.');
      setLoading(false);
    }
  };

  const processAnalyticsData = (apodData, epicData, searchData) => {
    // Generate mock time series data for demonstration
    const timeSeriesData = generateTimeSeriesData();
    
    // Process camera usage data from Mars Rover (mock data)
    const cameraData = [
      { name: 'MAST', value: 35, color: COLORS[0] },
      { name: 'NAVCAM', value: 25, color: COLORS[1] },
      { name: 'CHEMCAM', value: 20, color: COLORS[2] },
      { name: 'MAHLI', value: 15, color: COLORS[3] },
      { name: 'MARDI', value: 5, color: COLORS[4] }
    ];

    // Process image categories
    const imageCategories = [
      { name: 'Space', value: 40, color: COLORS[0] },
      { name: 'Planets', value: 25, color: COLORS[1] },
      { name: 'Galaxies', value: 20, color: COLORS[2] },
      { name: 'Earth', value: 15, color: COLORS[3] }
    ];

    return {
      timeSeriesData,
      cameraData,
      imageCategories,
      stats: {
        totalImages: searchData.length,
        apodViews: Math.floor(Math.random() * 10000) + 5000,
        epicViews: Math.floor(Math.random() * 5000) + 2000,
        roverPhotos: Math.floor(Math.random() * 15000) + 8000
      }
    };
  };

  const generateTimeSeriesData = () => {
    const data = [];
    const days = selectedTimeframe === '7d' ? 7 : selectedTimeframe === '30d' ? 30 : 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString(),
        views: Math.floor(Math.random() * 1000) + 500,
        images: Math.floor(Math.random() * 50) + 20,
        searches: Math.floor(Math.random() * 200) + 100
      });
    }
    return data;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="analytics-page">
      <header className="page-header">
        <h1 className="page-title">NASA Data Analytics</h1>
        <p>Comprehensive insights and visualizations of NASA's space exploration data</p>
      </header>

      <main className="analytics-content">
        {/* Time Frame Selector */}
        <div className="timeframe-selector">
          <label>Time Frame:</label>
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Images</h3>
            <p className="stat-number">{analyticsData.stats.totalImages.toLocaleString()}</p>
            <p className="stat-label">Available in Library</p>
          </div>
          <div className="stat-card">
            <h3>APOD Views</h3>
            <p className="stat-number">{analyticsData.stats.apodViews.toLocaleString()}</p>
            <p className="stat-label">Daily Views</p>
          </div>
          <div className="stat-card">
            <h3>EPIC Views</h3>
            <p className="stat-number">{analyticsData.stats.epicViews.toLocaleString()}</p>
            <p className="stat-label">Earth Images</p>
          </div>
          <div className="stat-card">
            <h3>Rover Photos</h3>
            <p className="stat-number">{analyticsData.stats.roverPhotos.toLocaleString()}</p>
            <p className="stat-label">Mars Exploration</p>
          </div>
        </div>

        {/* Time Series Chart */}
        <div className="chart-container">
          <h2>Activity Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analyticsData.timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="images" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="searches" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Camera Usage Pie Chart */}
          <div className="chart-container">
            <h2>Mars Rover Camera Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.cameraData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.cameraData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Image Categories Bar Chart */}
          <div className="chart-container">
            <h2>Image Categories Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.imageCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interactive Data Table */}
        <div className="data-table-container">
          <h2>Recent Activity Data</h2>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Views</th>
                  <th>Images</th>
                  <th>Searches</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.timeSeriesData.slice(-5).map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.views.toLocaleString()}</td>
                    <td>{row.images}</td>
                    <td>{row.searches}</td>
                    <td>
                      <span className={`trend ${row.views > 800 ? 'up' : 'down'}`}>
                        {row.views > 800 ? '↗' : '↘'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage; 