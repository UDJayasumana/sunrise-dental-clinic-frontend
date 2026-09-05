"use client";

import CreateAppointmentPanel from '@/components/appointments/create-appointment-panel'
import { useAppointmentStore } from '@/lib/store/appointmentStore';
import { AppointmentFormValues } from '@/types/appointment.types';
import { Box } from '@mui/material';

const NewAppointmentPage = () => {

  const {createAppointment} = useAppointmentStore();

    const onCreateAppointment = async (data: AppointmentFormValues) => {
        try {
            await createAppointment(data);
        } catch (err: any) {
          throw err;
        }
      };


  return (
    <Box>
        <CreateAppointmentPanel onCreateAppointment={onCreateAppointment} />
    </Box>
  )
}

export default NewAppointmentPage

