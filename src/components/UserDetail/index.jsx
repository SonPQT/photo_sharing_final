import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component showing user details.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userData = await fetchModel(`/user/${userId}`);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading user details:", err);
        setError("Failed to load user details");
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <CircularProgress className="user-detail-loading" />;
  }

  if (error || !user) {
    return (
      <Typography variant="h6" color="error">
        {error || "User not found"}
      </Typography>
    );
  }

  return (
    <div className="user-detail-container">
      <Card className="user-detail-card">
        <CardContent>
          <Typography variant="h4" className="user-name">
            {user.first_name} {user.last_name}
          </Typography>

          <Typography variant="h6" color="textSecondary" className="user-info">
            {user.occupation}
          </Typography>

          <Typography variant="body1" className="user-location">
            Location: {user.location}
          </Typography>

          <Typography variant="body1" className="user-description">
            {user.description}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/photosOfUser/${userId}`}
            className="view-photos-button"
          >
            View Photos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;
