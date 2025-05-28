import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component showing list of users.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userData = await fetchModel("/user/list");
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading users:", err);
        setError("Failed to load users");
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <CircularProgress className="user-list-loading" />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography
        variant="h5"
        className="user-list-title"
        component={Link}
        to="/users"
        style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
      >
        Users
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem
              button
              component={Link}
              to={`/users/${user._id}`}
              className="user-list-item"
            >
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
