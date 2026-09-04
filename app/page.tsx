"use client";


import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  // const handleNoteClick = () => {
  //   router.push(`/notes`);
  // };

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
      
    </Box>
  );
}
