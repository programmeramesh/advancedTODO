import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, fetchWeather } from '../store/slices/todoSlice';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (location.trim()) {
        // First fetch weather data
        await dispatch(fetchWeather(location.trim()));
      }
      // Then add the task (it will automatically get weather data from the store)
      dispatch(addTask({ 
        text: task.trim(), 
        priority,
        location: location.trim()
      }));
      setTask('');
      setLocation('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="New Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., London"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ height: '100%' }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskInput;
