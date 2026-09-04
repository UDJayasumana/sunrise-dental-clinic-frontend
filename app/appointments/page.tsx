import { Box, Typography } from '@mui/material'
import React from 'react'

const AppointmentsPage = () => {
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          height: 60,
          maxHeight: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
          }}
        >
          Appointment List
        </Typography>
      </Box>

      
    </Box>
  )
}

export default AppointmentsPage