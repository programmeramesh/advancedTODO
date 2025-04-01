import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';
import Login from './components/Login';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import WeatherWidget from './components/WeatherWidget';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './App.css';
import './styles/WeatherWidget.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Advanced Todo App
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <WeatherWidget />
          <Typography variant="h4" component="h1" gutterBottom>
            Your Tasks
          </Typography>
          <TaskInput />
          <TaskList />
        </Box>
      </Container>
    </div>
  );
}

export default App;
