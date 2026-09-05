import { TextField } from "@mui/material";
import React from "react";

const AppointmentInput = (props) => {
  const { name, label, placeholder, sx, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      sx={sx}
      label={label}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};
export default AppointmentInput;
