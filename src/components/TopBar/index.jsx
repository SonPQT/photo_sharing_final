import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component showing app header and context.
 */
function TopBar() {
  const location = useLocation();

  const getContextText = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length < 3) return null;

    const userId = pathParts[2];
    const user = models.userModel(userId);
    if (!user) return null;

    const fullName = `${user.first_name} ${user.last_name}`;

    if (location.pathname.includes("/photosOfUser/")) {
      return `Photos of ${fullName}`;
    } else if (location.pathname.includes("/users/")) {
      return fullName;
    }
    return null;
  };

  const contextText = getContextText();

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="toolbar">
        <Typography variant="h6" color="inherit" className="author-name">
          By B22DCAT249 - Phi Quoc Tu Son
        </Typography>
        {contextText && (
          <Typography variant="h6" color="inherit" className="context-text">
            {contextText}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
