"use client";


import AppointmentButton from "@/components/controls/appointment-button";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  const handleAppointmentClick = () => {
    router.push(`/appointments`);
  };

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
            fontWeight: 800,
          }}
        >
          Recent Appointments
        </Typography>
      </Box>


      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <AppointmentButton
          text="Go To Appointment"
          sx={{
            width: { xs: 210, sm: 240, md: 270 },
            height: { xs: 55, sm: 55, md: 55 },
            mt: 5,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          }}
          onClick={handleAppointmentClick}
        />
      </Box>
      
    </Box>
  );
}
