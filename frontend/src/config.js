// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://nasa-explorer-3km1.onrender.com' // Your actual Render backend URL
  : 'http://localhost:3001';

export default API_BASE_URL; 