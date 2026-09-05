import { User } from "@/types/user.types";
import { create } from "zustand";
import apiServer from "../api/client/api-server";
import { USER_ENDPOINTS } from "../endpoints/user.endpoints";

interface UserState {
    user: User | null;

    loadingUser: boolean;
    errorUser: string | null;

    fetchUserById: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,

    loadingUser: false,
    errorUser: null,

    fetchUserById: async (userId = "") =>{
        set({ loadingUser: true, errorUser: null });

        try{
            const res = await apiServer.get(USER_ENDPOINTS.user.byId(userId));
            if (res?.data?.data){
                const mappedUser: User = res?.data?.data;
                set({ user: mappedUser, loadingUser: false });
            }
        } catch (err: any){
            console.error("Error fetching user:", err);
            set({
              errorUser: err.message || "Failed to fetch user",
              loadingUser: false,
            });
        }
    }


}));