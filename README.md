# NASA Data Explorer

This is a full-stack web application that allows users to explore the vast universe of data provided by NASA's public APIs. Discover stunning images of space, browse photos from the Mars rovers, and even get a daily glimpse of Earth from a million miles away.

## Features

*   **Astronomy Picture of the Day (APOD):** View NASA's featured image or video of the day, along with a detailed explanation.
*   **Mars Rover Photos:** Explore a vast gallery of photos taken by the Curiosity rover on Mars. Filter photos by Earth date.
*   **Earth Polychromatic Imaging Camera (EPIC):** See stunning, color images of the entire sunlit side of Earth, updated daily.
*   **Global Search:** Search NASA's comprehensive image and video library for any topic you can imagine.
*   **AI-Powered Mission Logs:** Generate fictional, creative "mission logs" for any Mars rover photo.
*   **Responsive Design:** A clean, modern, and fully responsive "space theme" that looks great on any device.

## Tech Stack

*   **Frontend:** React, Vite, `react-router-dom`, `axios`
*   **Backend:** Node.js, Express.js, `axios`, `node-cache`
*   **APIs:** NASA Public APIs

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A NASA API Key. You can get one for free [here](https://api.nasa.gov/).

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

If you haven't already, clone this repository to your local machine:

```bash
git clone <repository-url>
cd Nasa-project
```

### 2. Backend Setup

The backend server is responsible for communicating with the NASA APIs.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

Next, you need to create a `.env` file in the `backend` directory to store your NASA API key.

1.  Create a new file named `.env` in the `backend` folder.
2.  Add the following line to the file, replacing `YOUR_NASA_API_KEY` with your actual key:

```
NASA_API_KEY=YOUR_NASA_API_KEY
```

### 3. Frontend Setup

The frontend is the React application that users interact with.

```bash
# Navigate to the frontend directory from the project root
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

You need to run both the backend and frontend servers simultaneously in separate terminal windows.

### 1. Start the Backend Server

```bash
# In the /backend directory
npm start
```

You should see a message confirming that the `Server is running on http://localhost:3001`.

### 2. Start the Frontend Server

```bash
# In the /frontend directory
npm run dev
```

You should see a message with a link to the local development server, usually `http://localhost:5173/`. Open this link in your web browser to use the application.

## How to Use the Application

*   **Homepage:** The landing page provides a stunning hero section and an introduction to the application.
*   **Navigation:** Use the navbar at the top to navigate between the different pages: APOD, Mars Rover, and Earth.
*   **Search:** Use the global search bar in the navbar to find images from across NASA's library.
*   **Mars Rover Photos:** Use the date picker to select a specific Earth date and view photos taken by the Curiosity rover on that day.
*   **Generate Mission Log:** On the Mars Rover page, click the "Generate Mission Log" button on any photo to get an AI-generated story about that image. 