import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Grid, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      history.push('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '10%' }}>
      <Paper elevation={3}>
        <Box padding={4}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            Please sign in to continue
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
      </Paper>
    </Container>
  );
};

export default Login;
