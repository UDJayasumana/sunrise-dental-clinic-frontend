import theme from '@/lib/theme/theme'
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider
} from '@mui/material'
import {
  EventNote as EventIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Home as HomeIcon
} from '@mui/icons-material'
import React from 'react'
import { SunriseIcon } from '../icons/custom-Icons'

const HelpPanel = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        background: theme.palette.background.paper, // Changed to standard paper background for readability
        backgroundColor: theme.palette.action.focus,
        width: { xs: "90%", sm: "75%", md: "60%" }, 
        height: { xs: "70vh", sm: "65vh", md: "72vh" }, 
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography 
          variant="h5" component="h2" 
          gutterBottom color="primary"
          sx={{ fontWeight: "bold" }}
          >
          Admin Help & Guidance
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2 }}>
          Welcome to the appointment management system. Review the quick guide below to efficiently manage, track, and update appointment records.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List disablePadding>
          {/* 1. View Appointments */}
          <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <EventIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ fontWeight: 600 }}>Viewing Existing Appointments</Typography>}
              secondary="Click the 'Go to Appointments' button to view, review, and manage all currently scheduled appointments in the system."
            />
          </ListItem>

          {/* 2. Search Appointments */}
          <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <SearchIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ fontWeight: 600 }}>Searching for Appointments</Typography>}
              secondary="Use the search bar at the top of the appointment list to quickly find specific records by entering the Appointment Name."
            />
          </ListItem>

          {/* 3. Edit Appointment */}
          <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ fontWeight: 600 }}>Editing an Appointment</Typography>}
              secondary="Locate the target appointment record, navigate to the 'Action' section, and click the Edit button to open the modification page."
            />
          </ListItem>

          {/* 4. Delete Appointment */}
          <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ fontWeight: 600 }}>Deleting an Appointment</Typography>}
              secondary="To remove an obsolete record, locate the appointment under the 'Action' section and click the Delete button."
            />
          </ListItem>

          {/* 5. Print/Download Bill */}
          <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <PrintIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ fontWeight: 600 }}>Printing & Downloading Bills</Typography>}
              secondary="Click the print button found in the 'Action' section of an appointment record to open the Edit Bill page, where you can easily print or download your billing documents."
            />
          </ListItem>

          {/* 6. Return to Home Page */}
          <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <SunriseIcon color="primary" />
              {/* <HomeIcon color="primary" /> */}
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ fontWeight: 600 }}>Returning to Home Page</Typography>}
              secondary="If you want to come back to the home page at any time, click the top left Sunrise logo."
            />
          </ListItem>
        </List>
      </Box>
    </Paper>
  )
}

export default HelpPanel