import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
  import React, { Fragment, useMemo, useState } from "react";
  import { Delete, Edit, PanoramaFishEye, ViewAgenda, ViewCarousel } from "@mui/icons-material";
  import { Appointment } from "@/types/appointment.types";
  
  interface AppointmentPanelRowProps {
    row: Appointment;
    onAppointmentView: (appointmentId: string) => void;
    onAppointmentDelete: (appointmentId: string) => void;
  }
  
  const AppointmentPanelRow: React.FC<AppointmentPanelRowProps> = ({
    row,
    onAppointmentView,
    onAppointmentDelete,
  }) => {
    const [open, setOpen] = useState(false);
  
  
    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {/* <TableCell align="left">{row._id}</TableCell> */}
          <TableCell align="left">{row.appoNum}</TableCell>
          <TableCell align="left">{row?.patientName || ""}</TableCell>
          <TableCell align="left">{row?.age || ""}</TableCell>
          <TableCell align="left">{row?.contactNum || ""}</TableCell>
          <TableCell align="left">{row?.address || ""}</TableCell>
          <TableCell align="left">{row?.appoDateTime || ""}</TableCell>
          
          <TableCell align="left">
            <IconButton color="primary" onClick={() => onAppointmentView(row.appoNum)}>
              <ViewCarousel />
            </IconButton>
            <IconButton color="primary" onClick={() => onAppointmentDelete(row.appoNum)}>
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  };
  
  export default React.memo(AppointmentPanelRow);
  