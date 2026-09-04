"use client";

import apiServer from '@/lib/api/client/api-server';
import { AUTH_ENDPOINTS } from '@/lib/endpoints';
import { useAuthStore } from '@/lib/store/authStore';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'

interface ResponsiveAppBarProps {
    children: React.ReactNode;
  }

const ResponsiveAppBar:React.FC<ResponsiveAppBarProps> = ({children}) => {

  const {userId, isLogged} = useAuthStore();

  const [anchorEl, setAnchorEl] = useState(null);

  //Memoized mouse event handlers
  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  //Memoized close handler
  const handleClose = useCallback(() => setAnchorEl(null), []);

  //Memorize logout handler
  const handleLogout = useCallback(() => {
    handleClose();
    apiServer.get(AUTH_ENDPOINTS.auth.logout);
  }, [handleClose]);

  return (
    <>
    <AppBar
        position="static"
        sx={{
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
 <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop Logo */}
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ ml: 2, display: { xs: "none", md: "flex" } }}
            >
              Sunrise Dental Clinic
            </Typography>

            {/* Mobile Logo */}
            <Typography
              variant="h6"
              fontSize={12}
              noWrap
              component="div"
              sx={{ ml: 2, flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Sunrise Dental Clinic
            </Typography>

            {/* Spacer (Desktop only) */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />

             {/* Profile Icon */}
             <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  transform: {
                    xs: "scale(1.0)", // mobile
                    sm: "scale(1.2)", // tablets
                    md: "scale(1.5)", // desktop
                  },
                }}
              >
                {/* <AccountCircle /> */}
              </IconButton>

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              </Box>

          </Toolbar>
        </Container>
      </AppBar>

       {/* Render children below AppBar */}
       <Box sx={{ mt: 2 }}>{children}</Box>
    </>
  )
}

export default ResponsiveAppBar