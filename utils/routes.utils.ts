import { CREATED_MESSAGES, OK_MESSAGES } from "@/constants/success-messages.constants";


export const isRouteMatch = (pathname: string, routes: string[]) => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
};

export const pageReload = (delay?: number) => {
  if (!delay) {
    window.location.reload();
    return;
  }

  setTimeout(() => {
    window.location.reload();
  }, delay);
};


export const redirectToPage = (message: string, delay?: number) => {
    let path: string = "";
  
    switch (message) {
      case CREATED_MESSAGES.REGISTER_SUCCESS:
        path = "/sign-in";
        break;
      case CREATED_MESSAGES.APPOINTMENT_CREATED_SUCCESS:
        path = "/appointments"
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