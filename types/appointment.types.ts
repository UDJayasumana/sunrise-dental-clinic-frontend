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
    DENTAL_CLEANINGS = "Dental Cleanings",
    EXAMINATIONS_AND_XRAY = "Examinations & X-Rays",
    FLUORIDE_TREATMENTS = "Fluoride Treatments",
    DENTAL_SEALANTS = "Dental Sealants",
    FILLINGS = "Fillings",
    CROWNS = "Crowns",
    BRIDGES = "Bridges",
    DENTURES = "Dentures",
    DENTAL_IMPLANTS = "Dental Implants"
  }

  export enum DentistName {
    DR_ANNESLEY_GOMES = "Dr Annesley Gomes",
    DR_S_KANAGARAYAN = "Dr S Kanagarayan",
    DR_E_ANIL_SALGADO = "Dr E Anil Salgado"
  }

  export type BackendAppointmentError = {
    statusCode: number;
    message: string;
    errors?: Partial<Record<keyof AppointmentFormValues, string>>;
  };

  export type AppointmentFilters = {
    searchTerm?: string;
    page?: string;
    rows?: string;
  }