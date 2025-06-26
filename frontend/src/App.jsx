import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import APODPage from './pages/APODPage';
import MarsRoverPage from './pages/MarsRoverPage';
import EPICPage from './pages/EPICPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apod" element={<APODPage />} />
        <Route path="/mars-rover" element={<MarsRoverPage />} />
        <Route path="/earth" element={<EPICPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
