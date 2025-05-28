import './App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <TopBar />
        <div className="main-topbar-buffer" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Paper className="main-grid-item sidebar">
              <UserList />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper className="main-grid-item content">
              <Routes>
                {/* Redirect from root to /users */}
                <Route
                  path="/"
                  element={<Navigate to="/users" replace />}
                />
                
                <Route
                  path="/users/:userId"
                  element={<UserDetail />}
                />
                <Route
                  path="/photosOfUser/:userId"
                  element={<UserPhotos />}
                />
                <Route
                  path="/users"
                  element={<UserList />}
                />
                
                {/* Fallback for invalid routes */}
                <Route
                  path="*"
                  element={
                    <Typography variant="h5" style={{ padding: 20 }}>
                      Page not found
                    </Typography>
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
