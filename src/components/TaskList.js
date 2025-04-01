import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask, updateTaskPriority } from '../store/slices/todoSlice';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Paper,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Stack,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';

const TaskList = () => {
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

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
    <Paper elevation={2} sx={{ mt: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <Stack direction="row" spacing={1} alignItems="center">
                {task.location && task.weather && (
                  <>
                    <Chip
                      icon={<LocationOnIcon />}
                      label={task.location}
                      size="small"
                      color="info"
                    />
                    <Chip
                      icon={<ThermostatIcon />}
                      label={`${Math.round(task.weather.main.temp)}°C`}
                      size="small"
                      color="primary"
                    />
                    <Chip
                      icon={React.createElement(getWeatherIcon(task.weather.weather[0].id))}
                      label={task.weather.weather[0].description}
                      size="small"
                      variant="outlined"
                    />
                  </>
                )}
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <Select
                    value={task.priority}
                    onChange={(e) =>
                      dispatch(updateTaskPriority({ id: task.id, priority: e.target.value }))
                    }
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
                <IconButton
                  edge="end"
                  onClick={() => dispatch(deleteTask(task.id))}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            }
            disablePadding
          >
            <Checkbox
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.text}
                </Typography>
              }
              secondary={
                <Typography component="div" variant="body2" color="textSecondary">
                  <Chip
                    label={task.priority}
                    size="small"
                    color={getPriorityColor(task.priority)}
                    sx={{ mt: 1 }}
                  />
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
