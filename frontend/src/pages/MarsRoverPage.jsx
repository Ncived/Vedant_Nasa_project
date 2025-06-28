import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MarsRoverPage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import API_BASE_URL from '../config';

const MarsRoverPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [earthDate, setEarthDate] = useState(new Date('2019-07-20')); // Apollo 11 anniversary
  const [modalData, setModalData] = useState({ show: false, content: '' });

  useEffect(() => {
    setLoading(true);
    const formattedDate = earthDate.toISOString().split('T')[0];

    axios.get(`${API_BASE_URL}/api/mars-rover?earth_date=${formattedDate}`)
      .then(response => {
        setPhotos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Mars Rover photos:', error);
        setError('No photos found for this date. Please try another.');
        setLoading(false);
      });
  }, [earthDate]);

  const handleAiButtonClick = async (type, photo) => {
    const content = type === 'log' ? 'Generating mission log...' : 'Analyzing image...';
    setModalData({ show: true, content, title: type === 'log' ? 'Mission Log Entry' : 'Image Analysis Report' });
    try {
      const endpoint = type === 'log' ? '/api/ai/mission-log' : '/api/ai/analyze-image';
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        camera: photo.camera,
        earth_date: photo.earth_date,
        sol: photo.sol,
      });
      const responseContent = type === 'log' ? response.data.missionLog : response.data.analysis;
      setModalData({ show: true, content: responseContent, title: type === 'log' ? 'Mission Log Entry' : 'Image Analysis Report' });
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      setModalData({ show: true, content: `Error generating ${type}.`, title: 'Error' });
    }
  };

  return (
    <div className="mars-rover-page">
      <header className="page-header">
        <h1 className="page-title">Mars Rover Photos</h1>
        <p>Photos from the Curiosity Rover</p>
      </header>
      <main>
        <div className="filters-container">
          <div className="date-picker-container">
            <label>Select Date:</label>
            <DatePicker 
              selected={earthDate} 
              onChange={date => setEarthDate(date)}
              dateFormat="yyyy-MM-dd"
              className="date-picker-input"
            />
          </div>
        </div>
        {loading && <LoadingSpinner />}
        {error && !loading && <ErrorMessage message={error} />}
        {photos.length === 0 && !loading && !error && (
          <p>No photos found for the selected date. Try another date!</p>
        )}
        {photos.length > 0 && (
          <div className="photo-gallery">
            {photos.map(photo => (
              <div key={photo.id} className="photo-card">
                <img src={photo.img_src} alt={`Mars Rover photo ${photo.id}`} className="photo-img" />
                <div className="photo-info">
                  <p><strong>Date:</strong> {photo.earth_date}</p>
                  <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                  <div className="ai-buttons-container">
                    <button className="ai-button" onClick={() => handleAiButtonClick('log', photo)}>
                      Generate Mission Log
                    </button>
                    <button className="ai-button" onClick={() => handleAiButtonClick('analysis', photo)}>
                      Analyze Image
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalData.show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalData.title}</h3>
            <pre className="mission-log-text">{modalData.content}</pre>
            <button onClick={() => setModalData({ show: false, content: '' })}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsRoverPage; 