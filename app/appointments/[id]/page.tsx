"use client";

import EditAppointmentPanel from '@/components/appointments/edit-appointment-panel'
import { useAppointmentStore } from '@/lib/store/appointmentStore';
import { AppointmentFormValues } from '@/types/appointment.types'
import { Box } from '@mui/material'
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const EditAppointmentPage = () => {
  const params = useParams();
  const appointmentId = params?.id;

  const {fetchAppointmentByAppoNum, updateAppointmentByAppoNum, appointment, errorAppointment} = useAppointmentStore();
  
  const onEditAppointment = async (data: AppointmentFormValues) => {
    if (!appointmentId) return;
    await updateAppointmentByAppoNum(appointmentId.toString(), data);
  }


  useEffect(() => {
    if (!appointmentId) return;
    fetchAppointmentByAppoNum(appointmentId.toString());
  }, [appointmentId, fetchAppointmentByAppoNum]);


  return (
    <Box>
      <EditAppointmentPanel 
        appointmentId={appointmentId?.toString()}  
        onEditAppointment={onEditAppointment} 
        initialAppointment={appointment}/>
    </Box>
  )
}

export default EditAppointmentPage