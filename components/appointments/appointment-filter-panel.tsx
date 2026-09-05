import { InputAdornment, Toolbar } from '@mui/material';
import React from 'react'
import AppointmentInput from '../controls/appointment-input';
import { Add, Search } from '@mui/icons-material';
import AppointmentButton from '../controls/appointment-button';

interface AppointmentFilterPanelProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewAppointment: () => void;
  }

const AppointmentFilterPanel: React.FC<AppointmentFilterPanelProps> = ({ onSearch, onNewAppointment }) => {
  return (
    <Toolbar>
    <AppointmentInput
      label="Search appointments"
      placeholder="Search by tag or title"
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          height: 40,
        },
        "& .MuiOutlinedInput-input": {
          padding: "8px 14px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={onSearch}
    />
    <AppointmentButton
      sx={{
        size:"large",
        marginLeft: "auto",
        backgroundColor: "primary.main",
        color: "white",
        textTransform: "none"
      }}
      variant="outlined"
      startIcon={<Add/>}
      text="Add New"
      onClick={onNewAppointment}
    />
  </Toolbar>
  )
}

export default AppointmentFilterPanel