// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com' // TODO: Replace with your actual Render backend URL
  : 'http://localhost:3001';

export default API_BASE_URL; 