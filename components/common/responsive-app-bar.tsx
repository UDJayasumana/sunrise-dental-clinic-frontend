"use client";

import apiServer from '@/lib/api/client/api-server';
import { AUTH_ENDPOINTS } from '@/lib/endpoints';
import { AccountCircle } from "@mui/icons-material";
import { useAuthStore } from '@/lib/store/authStore';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useUserStore } from '@/lib/store/userStore';
import { SunriseIcon } from '../icons/custom-Icons';
import { useRouter } from 'next/navigation';

interface ResponsiveAppBarProps {
    children: React.ReactNode;
  }

const ResponsiveAppBar:React.FC<ResponsiveAppBarProps> = ({children}) => {

  const {userId, isLogged} = useAuthStore();
  const { user, fetchUserById } = useUserStore();

  const [anchorEl, setAnchorEl] = useState(null);

  const route = useRouter();

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

  const handleHome = () =>{
    route.push("/");
  }


  //Memorize user details fetch handler
    useEffect(() => {
      if (isLogged && userId && (!user || user.id !== userId)) {
        fetchUserById(userId);
      }
    }, [isLogged, userId, user?.id, fetchUserById]);

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
            {/* Desktop Logo & Title Wrapper */}
            <Box sx={{ ml: 2, display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
              <IconButton 
                  color="inherit" aria-label="Sunrise Dental Clinic Home" edge="start" sx={{ p: 0 }}
                  onClick={handleHome}
                >
                <SunriseIcon color="primary" />
              </IconButton>
              <Typography
                variant="h5"
                noWrap
                component="div"
                onClick={handleHome}
                sx={{ 
                  display: { xs: "none", md: "flex" }, 
                  cursor: 'pointer',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': { 
                    color: 'primary.main',
                  }
                }}
              >
                Sunrise Dental Clinic
              </Typography>
       
            </Box>

            {/* Mobile Logo & Title Wrapper */}
            <Box sx={{ ml: 2, display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1, flexGrow: 1 }}>
              <IconButton 
                  color="inherit" aria-label="Sunrise Dental Clinic Home" edge="start" sx={{ p: 0 }}
                  onClick={handleHome}
                >
                <SunriseIcon color="primary" />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={handleHome}
                sx={{ 
                  ml: 2,
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" }, 
                  cursor: 'pointer',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': { 
                    color: 'primary.main',
                  }
                }}
              >
                Sunrise Dental Clinic
              </Typography>
            </Box>

            {/* Spacer (Desktop only) */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />

            {/* Username */}
              <Box>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ mr: 1, fontSize: { xs: 10, sm: 15, md: 18 } }}
              >
                {user?.name}
              </Typography>
            </Box>
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
                <AccountCircle />
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

