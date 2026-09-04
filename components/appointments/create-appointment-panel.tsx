"use client";

import React from 'react'
import { AppointmentCard } from './appointment-card';
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AppointmentCategory, AppointmentFormValues, BackendAppointmentError, DentistName } from '@/types/appointment.types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppointmentStore } from '@/lib/store/appointmentStore';

interface CreateAppointmentPanelProps {
    onCreateAppointment: (data: AppointmentFormValues) => void;
  }

const CreateAppointmentPanel: React.FC<CreateAppointmentPanelProps> = ({onCreateAppointment}) => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>();


  //Handle form submit
  const onSubmit: SubmitHandler<AppointmentFormValues> = async (data) => {
    try{
      await onCreateAppointment(data);
    }catch (err: any){
      const error:BackendAppointmentError = err.response?.data;
   
      if (error?.errors) {
        Object.keys(error.errors).forEach((key) => {
          const field = key as keyof AppointmentFormValues;
          setError(field, { type: "server", message: error.errors![field] });
        });
      }
      useAppointmentStore.setState({errorAppointment: null});
    }
    
  }

  return (
    <AppointmentCard>
        {/* Panel Header */}
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
          <Typography
            variant="h6"
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            New Appointment
          </Typography>
      </Box>
      {/* Panel Body */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/*Patient Name */}
        <FormControl>
          <FormLabel
            htmlFor="patientName"
            sx={{ fontSize: "1.3rem", fontWeight: 600 }}
          >
            Patient Name
          </FormLabel>
          <TextField
            {...register("patientName")}
            autoComplete="patientName"
            id="patientName"
            placeholder="Enter patient name"
            error={!!errors.patientName}
            helperText={errors.patientName?.message}
            variant="outlined"
          />
        </FormControl>

        {/* Appointment Date & Time */}
        <FormControl>
          <FormLabel
            htmlFor="appointmentDate"
            sx={{ fontSize: "1.3rem", fontWeight: 600 }}
          >
            Appointment Date & Time
          </FormLabel>
          <TextField
            {...register("appoDateTime")}
            type="datetime-local"
            id="appoDateTime"
            error={!!errors.appoDateTime}
            helperText={errors.appoDateTime?.message}
            variant="outlined"
            slotProps={{
              htmlInput: {
                // Optional: Prevent selecting past dates/times
                // min: new Date().toISOString().slice(0, 16), 
              },
            }}
          />
        </FormControl>

        {/* Appointment Type (Enum Dropdown) */}
        <FormControl>
          <FormLabel sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            Treatment Type
          </FormLabel>
          <Controller
            name="treatmentType"
            control={control}
            defaultValue={AppointmentCategory.FILLING} // Optional default value
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                error={!!errors.treatmentType}
                variant="outlined"
              >
                {Object.values(AppointmentCategory).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {/* Capitalize nicely: e.g. "PERSONAL" -> "Personal" */}
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/*Patient Age */}
        <FormControl>
          <FormLabel
            htmlFor="title"
            sx={{ fontSize: "1.3rem", fontWeight: 600 }}
          >
            Age
          </FormLabel>
          <TextField
            {...register("age", { valueAsNumber: true })}
            type="number"
            autoComplete="age"
            id="age"
            placeholder="Enter patient age"
            error={!!errors.age}
            helperText={errors.age?.message}
            variant="outlined"
            slotProps={{
              htmlInput: {
                min: 0,
                step: 1, // Restricts native browser spinner arrows to whole numbers
              },
            }}
            onKeyDown={(e) => {
              // Prevent typing 'e', '+', '-', '.' which are technically valid in number inputs
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </FormControl>

        {/* Patient Address */}
        <FormControl>
          <FormLabel sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            Address
          </FormLabel>
          <TextField
            {...register("address")}
            placeholder="Enter patient's address"
            multiline
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </FormControl>

        {/* Patient Contact number */}
        <FormControl>
        <FormLabel
              htmlFor="contactNum"
              sx={{ fontSize: "1.3rem", fontWeight: 600 }}
          >
    Contact Number
  </FormLabel>
  <TextField
    {...register("contactNum")}
    type="text"
    autoComplete="tel"
    id="contactNum"
    placeholder="Enter patient's contact number"
    error={!!errors.contactNum}
    helperText={errors.contactNum?.message}
    variant="outlined"
    slotProps={{
      htmlInput: {
        maxLength: 10,
        inputMode: "numeric",
        pattern: "[0-9]*",
      },
    }}
    onKeyDown={(e) => {
      // Prevent typing non-numeric characters except control keys (Backspace, Tab, Delete, Arrows)
      if (
        !/[0-9]/.test(e.key) &&
        ![
          "Backspace",
          "Tab",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }
    }}
  />
        </FormControl>

          {/* Dentist (Enum Dropdown) */}
          <FormControl>
          <FormLabel sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            Dentist
          </FormLabel>
          <Controller
            name="dentist"
            control={control}
            defaultValue={DentistName.DR_ASHOKA_PATHIRANA} // Optional default value
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                error={!!errors.dentist}
                variant="outlined"
              >
                {Object.values(DentistName).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {/* Capitalize nicely: e.g. "PERSONAL" -> "Personal" */}
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>


        {/* Appointment Actions */}
        <Button type="submit" fullWidth variant="contained">
          Create
        </Button>
  </Box>


    </AppointmentCard>
  )

}

export default CreateAppointmentPanel;