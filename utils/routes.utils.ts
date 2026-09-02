import { CREATED_MESSAGES, OK_MESSAGES } from "@/constants/success-messages.constants";

export const redirectToPage = (message: string, delay?: number) => {
    let path: string = "";
  
    switch (message) {
      case CREATED_MESSAGES.REGISTER_SUCCESS:
        path = "/sign-in";
        break;
    }
  
    if (path.trimEnd().length !== 0) {
      if (!delay) {
        window.location.replace(path);
        return;
      }
  
      setTimeout(() => {
        window.location.replace(path);
      }, delay);
    }
  };