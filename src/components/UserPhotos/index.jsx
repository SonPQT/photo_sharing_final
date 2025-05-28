import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component showing user's photos and comments.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch both user details and photos concurrently
        const [userData, photosData] = await Promise.all([
          fetchModel(`/user/${userId}`),
          fetchModel(`/photo/photosOfUser/${userId}`),
        ]);

        setUser(userData);
        setPhotos(photosData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading photos:", err);
        setError("Failed to load photos");
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <CircularProgress className="photos-loading" />;
  }

  if (error || !photos || !user) {
    return (
      <Typography variant="h6" color="error">
        {error || "Photos not found"}
      </Typography>
    );
  }

  return (
    <div className="photos-container">
      <Typography variant="h4" className="photos-title">
        Photos of {user.first_name} {user.last_name}
      </Typography>

      <Grid container spacing={4}>
        {photos.map((photo) => (
          <Grid item xs={12} key={photo._id}>
            <Card className="photo-card">
              <CardMedia
                component="img"
                src={`../../images/${photo.file_name}`}
                alt={`Photo by ${user.first_name}`}
                className="photo-image"
              />

              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="photo-date"
                >
                  Posted on {formatDate(photo.date_time)}
                </Typography>

                <div className="comments-section">
                  <Typography variant="h6" className="comments-title">
                    Comments
                  </Typography>

                  {photo.comments &&
                    photo.comments.map((comment) => (
                      <div key={comment._id} className="comment">
                        <Typography variant="body2" className="comment-header">
                          <Link
                            to={`/users/${comment.user._id}`}
                            className="comment-user"
                          >
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>
                          <span className="comment-date">
                            {formatDate(comment.date_time)}
                          </span>
                        </Typography>

                        <Typography variant="body1" className="comment-text">
                          {comment.comment}
                        </Typography>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserPhotos;
