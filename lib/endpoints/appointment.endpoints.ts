export const APPOINTMENT_ENDPOINTS = {
  appointment: {
      list: `/api/appointment`,
      create: `/api/appointment`,
      byAppoNum: (id: string) => `/api/appointment/${id}`,
    },
  };
  