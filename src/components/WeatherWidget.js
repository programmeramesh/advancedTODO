import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { getWeatherByLocation, getCurrentPosition } from '../services/weatherService';
import { Typography, Alert } from '@mui/material';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await getCurrentPosition();
        const data = await getWeatherByLocation(position);
        if (data) {
          setWeather(data);
          setError(null);
        } else {
          setError('Failed to fetch weather data');
        }
      } catch (err) {
        console.error('Weather error:', err);
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherCode) => {
    if (!weatherCode) return WiDaySunny;
    const code = weatherCode.toString();
    if (code.startsWith('2')) return WiThunderstorm;
    if (code.startsWith('3') || code.startsWith('5')) return WiRain;
    if (code.startsWith('6')) return WiSnow;
    if (code.startsWith('8')) return WiCloudy;
    return WiDaySunny;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="weather-widget"
      style={{
        padding: '1rem',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '1rem 0'
      }}
    >
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center' }}
          >
            Loading weather...
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: 'red' }}
          >
            <Alert severity="error">{error}</Alert>
          </motion.div>
        ) : weather ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ fontSize: '2.5rem' }}
            >
              {React.createElement(getWeatherIcon(weather.weather?.[0]?.id))}
            </motion.div>
            <div>
              <motion.h3
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                style={{ margin: 0 }}
              >
                {weather.name}
              </motion.h3>
              <motion.p
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ margin: 0 }}
              >
                {Math.round(weather.main?.temp)}°C
              </motion.p>
              <motion.p
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}
              >
                {weather.weather?.[0]?.description}
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: 'red' }}
          >
            Failed to load weather data
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeatherWidget;
