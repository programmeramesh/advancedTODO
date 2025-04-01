# Advanced React Todo Application

A feature-rich Todo application built with React, Redux, and Material-UI. This application includes user authentication, task prioritization, weather integration, and persistent storage.

## Features

- User Authentication (Mock)
- Task Management (Add, Delete, Toggle completion)
- Task Prioritization (High, Medium, Low)
- Weather Integration for Tasks
- Responsive Design
- Persistent Storage using localStorage
- Modern UI with Material-UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Get a Weather API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Replace `YOUR_API_KEY` in `src/store/slices/todoSlice.js` with your API key

## Running the Application

```bash
npm start
```

The application will start on [http://localhost:3000](http://localhost:3000)

## Usage

1. Log in with any username and password (mock authentication)
2. Add tasks with priority levels
3. Optionally add location for weather information
4. Manage tasks using the intuitive interface
5. Your tasks and authentication status will persist across browser sessions

## Technologies Used

- React
- Redux Toolkit
- Material-UI
- Axios for API calls
- Local Storage for data persistence
