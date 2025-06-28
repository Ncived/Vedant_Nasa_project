import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import API_BASE_URL from '../config';
import '../App.css';

const APODPage = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/apod`)
      .then(response => {
        setApodData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch the Picture of the Day.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Astronomy Picture of the Day</h1>
      </header>
      <main>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {apodData && (
          <div className="apod-container">
            <h2>{apodData.title}</h2>
            {apodData.media_type === 'image' ? (
              <img src={apodData.url} alt={apodData.title} className="apod-image" />
            ) : (
              <iframe
                title={apodData.title}
                src={apodData.url}
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen
                className="apod-video"
              />
            )}
            <p className="apod-date">{apodData.date}</p>
            <p className="apod-explanation">{apodData.explanation}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default APODPage; 