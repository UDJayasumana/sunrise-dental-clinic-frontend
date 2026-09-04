import { create } from "zustand";
import { AuthState } from "@/types/auth.types";



export const useAuthStore = create<AuthState>((get, set) => ({
  isLogged: false,
  userId: null,
}));
