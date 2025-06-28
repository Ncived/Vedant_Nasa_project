import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import API_BASE_URL from '../config';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setResults([]);
    setError(null);
    axios.get(`${API_BASE_URL}/api/search?q=${query}`)
      .then(response => {
        setResults(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(`Failed to fetch results for "${query}". Please try again later.`);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-page">
      <header className="page-header">
        <h1 className="page-title">Search Results</h1>
        {query && <p>Showing results for: <strong>{query}</strong></p>}
      </header>
      <main>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && results.length === 0 && (
          <p>No results found for "{query}". Please try another search.</p>
        )}
        <div className="search-gallery">
          {results.map(item => (
            <div key={item.nasa_id} className="search-card">
              <img src={item.image_href} alt={item.title} className="search-img" loading="lazy" />
              <div className="search-info">
                <h3>{item.title}</h3>
                <p>{item.description?.substring(0, 150)}...</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage; 