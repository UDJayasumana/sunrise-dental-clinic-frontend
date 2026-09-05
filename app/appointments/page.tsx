"use client";

import AppointmentPanel from '@/components/appointments/appointment-panel';
import { useAppointmentStore } from '@/lib/store/appointmentStore';
import { Appointment, AppointmentCategory, AppointmentFilters, DentistName } from '@/types/appointment.types';
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect } from 'react'

const AppointmentsPage = () => {

  const route = useRouter();

  const { appointmentList, fetchAppointments, appointmentCount} = useAppointmentStore();

  // useEffect(()=>{
  //   fetchAppointments({});
  // }, []);

  // useEffect(()=>{
  //   console.log(appointmentList);
  // }, [appointmentList]);

 
  
  // const appointmentList: Array<Appointment> = [{
  //       id:"4",
  //       appoNum: "AT-004",
  //       patientName: "Jayantha",
  //       treatmentType: AppointmentCategory.FILLING,
  //       age:20,
  //       address:"No:18,Araliya Uyana, Kalutara South",
  //       contactNum: 7193921014,
  //       dentist: DentistName.DR_MALINI,
  //       appoDateTime: "2026-09-11 04:48:00.000"

  // }];

  const handleNewAppointment = () => {
    route.push("/appointments/new");
  };

  const handleViewAppointment = (appoNum: string) => {
    route.push(`/appointments/${appoNum}`);
  };

  const handleDeleteAppointment = (appoNum: string) => {
    //deleteNoteById(noteId);
    //console.log(`Note ${noteId} deleted.`);
  };

  const handleAppointmentList = useCallback(
    async (currentPage: number, rows: number, term: string) => {
      const filters: AppointmentFilters = {
        page: currentPage.toString(),
        rows: rows.toString(),
      };
      if (term.trimEnd().length > 0) {
        filters.searchTerm = term;
      }
      await fetchAppointments(filters);
    },
    [fetchAppointments]
  );



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

      <AppointmentPanel
        data={appointmentList}
        appointmentCount={appointmentCount}
        updatePage={handleAppointmentList}
        onNewAppointment={handleNewAppointment}
        OnViewAppointment={handleViewAppointment}
        onDeleteAppointment={handleDeleteAppointment}
      />
    </Box>
  )
}

export default AppointmentsPage