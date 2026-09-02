import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import React from 'react'

interface ResponsiveAppBarProps {
    children: React.ReactNode;
  }

const ResponsiveAppBar:React.FC<ResponsiveAppBarProps> = ({children}) => {


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

          </Toolbar>
        </Container>
      </AppBar>

       {/* Render children below AppBar */}
       <Box sx={{ mt: 2 }}>{children}</Box>
    </>
  )
}

export default ResponsiveAppBar