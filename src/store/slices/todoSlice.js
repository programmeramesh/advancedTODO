import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = createAsyncThunk(
  'todos/fetchWeather',
  async (city) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      return { city, data: response.data };
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  weatherData: {},
  status: 'idle',
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { text, priority, location } = action.payload;
      const newTask = {
        id: Date.now(),
        text,
        priority: priority || 'medium',
        location: location || '',
        completed: false,
        weather: location ? state.weatherData[location.toLowerCase()] : null
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTaskPriority: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTaskWeather: (state, action) => {
      const { taskId, weather } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.weather = weather;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Store weather data by city name
        state.weatherData[action.payload.city.toLowerCase()] = action.payload.data;
        // Update all tasks with this location
        state.tasks = state.tasks.map(task => {
          if (task.location && task.location.toLowerCase() === action.payload.city.toLowerCase()) {
            return { ...task, weather: action.payload.data };
          }
          return task;
        });
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTask, deleteTask, toggleTask, updateTaskPriority, updateTaskWeather } = todoSlice.actions;
export default todoSlice.reducer;
