import { Appointment, AppointmentFormValues } from "@/types/appointment.types";
import { create } from "zustand";
import { APPOINTMENT_ENDPOINTS } from "../endpoints/appointment.endpoints";
import apiServer from "../api/client/api-server";

interface AppointmentState{

     appointmentList: Array<Appointment> | [];
     appointmentCount: number;

    appointment: Appointment | null;

    loadingAppointment: boolean;
    errorAppointment: string | null;
    fetchAppointmentByAppoNum: (appoNum: string) => Promise<void>;

    loadingCreateAppointment: boolean;
    errorCreateAppointment: string | null;
    createAppointment: (data: AppointmentFormValues) => Promise<void>;

    loadingUpdateAppointment: boolean;
    errorUpdateAppointment: string | null;
    updateAppointmentByAppoNum: (noteId: string, data: AppointmentFormValues) => Promise<void>;

     loadingAppointments: boolean,
     errorAppointments: string | null,
     fetchAppointments: (filters: any) => Promise<void>;

}

export const useAppointmentStore = create<AppointmentState>((set) => ({

   appointmentList: [],
   appointmentCount: 0,

   loadingAppointments: false,
    errorAppointments: null,

    appointment: null,

    loadingAppointment: false,
    errorAppointment: null,

    loadingCreateAppointment: false,
    errorCreateAppointment: null,

    loadingUpdateAppointment: false,
    errorUpdateAppointment: null,

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

      fetchAppointments:async(filters = {}) => {
        set({ loadingAppointments: true, errorAppointments: null });

        try{
          const res = await apiServer.get(APPOINTMENT_ENDPOINTS.appointment.list,{
            params: filters,
          });
          if (res?.data?.data){
            console.log(res.data.data)
            const mappedAppointments: Appointment[] = res.data.data.appointments;
            set({
              appointmentList: mappedAppointments,
              loadingAppointments: false,
              appointmentCount: res.data.data.totalCount
            });
          }

        }catch (err: any){
          console.error("Error fetching appointments:", err);
          set({
            errorAppointments: err.message || "Failed to fetch appointments",
            loadingAppointments: false,
          });
        }
      },

      updateAppointmentByAppoNum: async (appoNum = "", data = {}) => {
        set({ loadingUpdateAppointment: true, errorUpdateAppointment: null });
    
        try {
          const res = await apiServer.put(APPOINTMENT_ENDPOINTS.appointment.byAppoNum(appoNum), data);
    
          if (res?.data?.data) {
              const mappedAppointment: Appointment = res?.data?.data;
              set({ appointment: mappedAppointment, loadingUpdateAppointment: false });
          }
        } catch (err: any) {
          set({
            errorUpdateAppointment: err,
            loadingUpdateAppointment: false,
          });
          throw err;
        }
      },



}));