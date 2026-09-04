import { ERROR_CODES } from "@/constants/error-codes.constants";
import { COMMON_ERROR_MESSAGES, UNAUTHORIZED_ERROR_MESSAGES } from "@/constants/error-messages.constants";
import { CREATED_MESSAGES, OK_MESSAGES } from "@/constants/success-messages.constants";
import { AUTH_ENDPOINTS } from "@/lib/endpoints";
import { useAuthStore } from "@/lib/store/authStore";
import { pageReload, redirectToPage } from "@/utils/routes.utils";
import axios from "axios";
import { ReactNode } from "react";


const apiServer = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

apiServer.interceptors.response.use(
    (res) =>{
        const method = res.config.method?.toLowerCase();
        const data = res.data;
        if (["post", "get", "put", "patch", "delete"].includes(method)){
            const reloadMessages = [
                OK_MESSAGES.TOKENS_REFRESHED,
                OK_MESSAGES.LOGIN_SUCCESS,
                OK_MESSAGES.LOGOUT_SUCCESS
              ];

              const redirectMessages = [
                CREATED_MESSAGES.REGISTER_SUCCESS,
                CREATED_MESSAGES.APPOINTMENT_CREATED_SUCCESS
              ];

              //Update user login state
              if (data?.message === OK_MESSAGES.VERIFIED) {
                  console.log({ isLogged: true, userId: data?.data?.userId });
                  useAuthStore.setState({ isLogged: true, userId: data?.data?.userId });
              }
              
              if (reloadMessages.includes(data?.message)) {
                pageReload(1000);
              }

              if (redirectMessages.includes(data?.message)) {
                setTimeout(() => {
                  redirectToPage(data?.message);
                }, 1000);
              }
        }
        return res;
    },
    (error) => {
        const refreshMessages = [UNAUTHORIZED_ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED];
        const logoutAndRedirectMessages = [
            UNAUTHORIZED_ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED,
            UNAUTHORIZED_ERROR_MESSAGES.REFRESH_TOKEN_NOT_FOUND,
            UNAUTHORIZED_ERROR_MESSAGES.INVALID_TOKEN,
          ];

          const response = error?.response;
        const status = response?.status;
        const backendMessage = response?.data?.message ?? COMMON_ERROR_MESSAGES.NETWORK_ERROR;

        const specialErrorStatuses = [ERROR_CODES.NOT_FOUND, ERROR_CODES.FORBIDDEN];

        // Handle 500+ and special errors
        if (
            status &&
            (status >= ERROR_CODES.INTERNAL_SERVER_ERROR ||
              specialErrorStatuses.includes(status))
          ) {
            const errorMsg =
              status >= ERROR_CODES.INTERNAL_SERVER_ERROR
                ? COMMON_ERROR_MESSAGES.NETWORK_ERROR
                : backendMessage;
      
            // const toastError: ReactNode | string | null =
            //   getErrorToastMessage(errorMsg);
            // if (toastError) {
            //   showToast(toastError, "error");
            // }
            return Promise.reject(error);
          }

          if (refreshMessages.includes(backendMessage)) {
            apiServer.get(AUTH_ENDPOINTS.auth.refresh);
          }

          if (logoutAndRedirectMessages.includes(backendMessage)) {
            setTimeout(() => {
              apiServer.post(AUTH_ENDPOINTS.auth.logout);
            }, 500);
          }

          return Promise.reject(error); // always reject errors here
    }
);

export default apiServer;