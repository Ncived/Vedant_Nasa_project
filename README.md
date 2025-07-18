# NASA Data Explorer

A full-stack web application to explore NASA's public APIs. Discover stunning images of space, browse Mars rover photos, and get a daily glimpse of Earth.

## 🌟 Live Demo
- **Frontend:** [https://nasa-frontend-j3ar.onrender.com](https://nasa-frontend-j3ar.onrender.com)
- **Backend:** [https://nasa-explorer-3km1.onrender.com](https://nasa-explorer-3km1.onrender.com)

## Features
- Astronomy Picture of the Day (APOD)
- Mars Rover Photos (with date filter)
- Earth Polychromatic Imaging Camera (EPIC)
- Global NASA Image Search
- AI-powered mission logs and image analysis
- Analytics dashboard with charts and statistics
- Responsive, modern UI

## Tech Stack
- **Frontend:** React, Vite, Recharts, Axios
- **Backend:** Node.js, Express, Axios, Node-Cache
- **APIs:** NASA Public APIs
- **Deployment:** Render

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- NASA API Key ([get one here](https://api.nasa.gov/))

### Setup
```bash
git clone https://github.com/Ncived/NASA-Explorer.git
cd NASA-Explorer
```

#### Backend
```bash
cd backend
npm install
# Create .env with your NASA_API_KEY
npm start
```

#### Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/apod | Astronomy Picture of the Day |
| GET    | /api/mars-rover?earth_date=YYYY-MM-DD | Mars Rover photos |
| GET    | /api/epic | EPIC Earth images |
| GET    | /api/search?q=query | NASA image search |
| POST   | /api/ai/mission-log | AI mission log |
| POST   | /api/ai/analyze-image | AI image analysis |

## Data Visualization
- Analytics dashboard (`/analytics`):
  - Statistics cards
  - Time series chart
  - Pie/bar charts
- Mars Rover page: Camera usage pie chart

---

**Star this repo if you found it helpful!**
