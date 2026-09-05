import { Button } from "@mui/material";
import React from "react";

const AppointmentButton = (props) => {
  const { text, sx, variant, onClick, ...other } = props;

  return (
    <Button variant={variant || "contained"} sx={sx} onClick={onClick} {...other}>
      {text}
    </Button>
  );
};

export default AppointmentButton;
