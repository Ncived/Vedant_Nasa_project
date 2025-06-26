import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">NASA Data Explorer</h1>
          <p className="hero-subtitle">Your portal to the cosmos. Explore stunning images and data from across the universe.</p>
          <div className="hero-buttons">
            <Link to="/apod" className="hero-button">Picture of the Day</Link>
            <Link to="/mars-rover" className="hero-button">Mars Rover Photos</Link>
          </div>
        </div>
        <div className="scroll-down-indicator">
          <span>&darr;</span>
        </div>
      </div>
      
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Astronomy Picture of the Day</h3>
            <p>Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</p>
          </div>
          <div className="feature-card">
            <h3>Mars Rover Photos</h3>
            <p>Browse a vast collection of photos from the Curiosity rover on Mars. Filter by camera type or search by specific Martian sol or Earth date.</p>
          </div>
          <div className="feature-card">
            <h3>AI-Powered Exploration</h3>
            <p>Engage with the data like never before. Generate fictional mission logs or scientific analyses for Mars photos with our integrated AI features.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 