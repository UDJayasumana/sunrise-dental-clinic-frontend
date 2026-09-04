export type AppointmentFormValues = {
    patientName: string;
    treatmentType: AppointmentCategory;
    age:number;
    address:string;
    contactNum:number;
    dentist:DentistName;
    appoDateTime: string;
  };

  export type Appointment = {
    id:string;
    appoNum: string;
    patientName: string;
    treatmentType: AppointmentCategory;
    age:number;
    address:string;
    contactNum:number;
    dentist:DentistName;
    appoDateTime: string;
  }

  export enum AppointmentCategory {
    FILLING = "Filling",
    NURVING = "Nurving"
  }

  export enum DentistName {
    DR_ASHOKA_PATHIRANA = "Dr. Ashoka Pathirana",
    DR_MALINI = "Dr. Malini"
  }

  export type BackendAppointmentError = {
    statusCode: number;
    message: string;
    errors?: Partial<Record<keyof AppointmentFormValues, string>>;
  };