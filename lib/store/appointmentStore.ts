import { Appointment, AppointmentFormValues } from "@/types/appointment.types";
import { create } from "zustand";
import { APPOINTMENT_ENDPOINTS } from "../endpoints/appointment.endpoints";
import apiServer from "../api/client/api-server";

interface AppointmentState{

    appointment: Appointment | null;

    loadingAppointment: boolean;
    errorAppointment: any | null;
    fetchAppointmentByAppoNum: (appoNum: string) => Promise<void>;

    loadingCreateAppointment: boolean;
    errorCreateAppointment: string | null;
    createAppointment: (data: AppointmentFormValues) => Promise<void>;

}

export const useAppointmentStore = create<AppointmentState>((set) => ({

    appointment: null,

    loadingAppointment: false,
    errorAppointment: null,

    loadingCreateAppointment: false,
    errorCreateAppointment: null,

    fetchAppointmentByAppoNum: async (appoNum = "") => {
        set({ loadingAppointment: true, errorAppointment: null });
    
        try {
          const res = await apiServer.get(APPOINTMENT_ENDPOINTS.appointment.byAppoNum(appoNum));
          console.log("RERUN");
          if (res?.data?.data) {
                const mappedAppointment: Appointment = res?.data?.data;
                set({ appointment: mappedAppointment, loadingAppointment: false });
          }
        } catch (err: any) {
          set({
            errorAppointment: err,
            loadingAppointment: false,
          });
          throw err;
        }
      },

      createAppointment: async (data = {}) => {
        set({ loadingCreateAppointment: true, errorCreateAppointment: null });
    
        try {
          const res = await apiServer.post(APPOINTMENT_ENDPOINTS.appointment.create, data);
    
          if (res?.data?.data) {
            const mappedAppointment: Appointment = res.data.data;
            set({ appointment: mappedAppointment, loadingCreateAppointment: false });
          }
        }catch (err: any) {
          set({
            errorCreateAppointment: err,
            loadingCreateAppointment: false,
          });
          throw err;
        }
      },

}));