require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const PORT = process.env.PORT || 3001;
const apiCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

app.use(cors());
app.use(express.json());

app.get('/api/apod', async (req, res) => {
  const cacheKey = 'apod';
  try {
    if (apiCache.has(cacheKey)) {
      return res.json(apiCache.get(cacheKey));
    }

    // Debug: Check if API key exists
    if (!process.env.NASA_API_KEY) {
      console.error('NASA_API_KEY is not set');
      return res.status(500).json({ error: 'NASA API key not configured' });
    }

    console.log('Fetching APOD with API key:', process.env.NASA_API_KEY.substring(0, 10) + '...');
    
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`, { timeout: 30000 });
    apiCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch APOD data.' });
  }
});

app.get('/api/mars-rover', async (req, res) => {
  const earthDate = req.query.earth_date;
  
  if (!earthDate) {
    return res.status(400).json({ error: 'An earth_date parameter is required.' });
  }

  const cacheKey = `mars-rover-${earthDate}`;

  try {
    if (apiCache.has(cacheKey)) {
      return res.json(apiCache.get(cacheKey));
    }

    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${process.env.NASA_API_KEY}`;

    const response = await axios.get(apiUrl, { timeout: 30000 });
    const photos = response.data.photos.slice(0, 50);
    apiCache.set(cacheKey, photos);
    res.json(photos);
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos.' });
  }
});

app.post('/api/ai/mission-log', (req, res) => {
  const { camera, earth_date, sol } = req.body;

  if (!camera || !earth_date || !sol) {
    return res.status(400).json({ error: 'Missing photo data.' });
  }

  const creativeSentences = [
    "Initial analysis of the terrain reveals geological formations unlike any previously documented.",
    "The atmospheric composition appears stable, though trace elements warrant further investigation.",
    "Evidence of past water activity is abundant in this region, confirming our primary hypothesis.",
    "The rover's instruments are performing nominally, collecting invaluable data about the Martian environment.",
    "This panoramic view from the {camera} offers a breathtaking glimpse into the desolate beauty of Mars."
  ];

  const logEntry = `
    Mission Log: Sol ${sol}, Earth Date: ${earth_date}.
    Entry by Rover Curiosity.
    The ${camera.full_name} (${camera.name}) has captured this view. 
    ${creativeSentences[Math.floor(Math.random() * creativeSentences.length)]}
    The long silence of this world is profound. Continuing mission objectives.
  `;

  res.json({ missionLog: logEntry.trim() });
});

app.post('/api/ai/analyze-image', (req, res) => {
  const { camera } = req.body;

  if (!camera) {
    return res.status(400).json({ error: 'Missing camera data.' });
  }

  const analyses = [
    "Spectral analysis of the rock formations suggests a high concentration of basalt, indicative of ancient volcanic activity.",
    "The image reveals fine-grained soil, likely the result of aeolian processes over millions of years.",
    "The atmospheric opacity is low, allowing for a clear view of the distant rim of Gale Crater.",
    "Analysis of the layering in the rock outcrop points to a history of sedimentary deposition, possibly in a lakebed environment.",
    "The {camera.full_name} has detected traces of hematite, an iron oxide that often forms in the presence of water."
  ];

  const analysisText = `
    Automated Image Analysis Report:
    Source Camera: ${camera.full_name} (${camera.name})
    Analysis: ${analyses[Math.floor(Math.random() * analyses.length)]}
    Confidence Level: 85%
    Recommendation: Further spectroscopic analysis is recommended.
  `;

  res.json({ analysis: analysisText.trim() });
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'A search query (q) is required.' });
  }

  const cacheKey = `search-${query}`;
  try {
    if (apiCache.has(cacheKey)) {
      return res.json(apiCache.get(cacheKey));
    }

    const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`, { timeout: 30000 });
    const items = response.data.collection.items.slice(0, 50).map(item => ({
      nasa_id: item.data[0].nasa_id,
      title: item.data[0].title,
      description: item.data[0].description,
      date_created: item.data[0].date_created,
      image_href: item.links[0].href,
    }));
    
    apiCache.set(cacheKey, items);
    res.json(items);
  } catch (error) {
    console.error('Error fetching from NASA Image API:', error);
    res.status(500).json({ error: 'Failed to perform search.' });
  }
});

app.get('/api/epic', async (req, res) => {
  const cacheKey = 'epic-latest';
  try {
    if (apiCache.has(cacheKey)) {
      console.log('Serving EPIC from cache');
      return res.json(apiCache.get(cacheKey));
    }

    // Debug: Check if API key exists
    if (!process.env.NASA_API_KEY) {
      console.error('NASA_API_KEY is not set for EPIC');
      return res.status(500).json({ error: 'NASA API key not configured' });
    }

    console.log('Fetching EPIC with API key:', process.env.NASA_API_KEY.substring(0, 10) + '...');
    
    const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`, { timeout: 30000 });
    
    const imageInfo = response.data.slice(0, 12).map(img => {
      const date = new Date(img.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return {
        ...img,
        imageUrl: `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${img.image}.png?api_key=${process.env.NASA_API_KEY}`
      };
    });

    apiCache.set(cacheKey, imageInfo);
    res.json(imageInfo);
  } catch (error) {
    console.error('Error fetching EPIC data:', error.response?.data || error.message);
    res.json([
      {
        identifier: 'fallback_epic_image',
        caption: 'A stunning view of our home planet.',
        date: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1564053489984-3c7bb6bd5743?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      }
    ]);
  }
});

module.exports = app;

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} 