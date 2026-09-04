export type SignUpFormValues = {
    name: string;
    email: string;
    password: string;
  };
  
  export type SignInFormValues = {
    email: string;
    password: string;
  };

  export type BackendSignUpError = {
    statusCode: number;
    message: string;
    errors?: Partial<Record<keyof SignUpFormValues, string>>;
  };
  
  export type BackendSignInError = {
    statusCode: number;
    message: string;
    errors?: Partial<Record<keyof SignInFormValues, string>>;
  };
  


  export interface AuthState {
    isLogged: boolean;
    userId: string | null;
  }