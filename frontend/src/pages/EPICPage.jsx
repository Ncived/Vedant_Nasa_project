import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import API_BASE_URL from '../config';
import './EPICPage.css';

const EPICPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/epic`)
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching EPIC data:', error);
        if (images.length === 0) {
          setError('Failed to fetch EPIC data.');
        }
        setLoading(false);
      });
  }, [images.length]);

  return (
    <div className="epic-page">
      <header className="page-header">
        <h1 className="page-title">Earth Polychromatic Imaging Camera (EPIC)</h1>
        <p>Daily images of Earth from the DSCOVR spacecraft.</p>
      </header>
      <main>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        <div className="epic-gallery">
          {images.map(image => (
            <div key={image.identifier} className="epic-card">
              <img src={image.imageUrl} alt={`Earth from space on ${image.date}`} className="epic-img" />
              <div className="epic-info">
                <p><strong>Date:</strong> {new Date(image.date).toLocaleString()}</p>
                <p>{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EPICPage; 