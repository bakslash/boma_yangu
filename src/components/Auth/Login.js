// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import kcbLogo from '../../assets/kcb-logo.png';
import kcbBackground from '../../assets/kcb-background.jpg';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Grid container>
      <Grid item xs={false} sm={7} className="login-background">
        <Box className="logo-container">
          <img src={kcbLogo} alt="KCB Bank Kenya" className="logo" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={5} component={Paper} elevation={6} square>
        <Box padding={4}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Login
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
