import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, TextField } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { listUsers, createUser, editUser, searchUsers } from '../services/api';
import UserList from '../components/Users/UsersList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchTerm);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Welcome, {user?.username}
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>

      <Box my={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                style: { fontSize: '14px' } // Adjust font size here
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
