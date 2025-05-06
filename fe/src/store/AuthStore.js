import { create } from "zustand"
import axios from "axios"

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: {
    id: null,
    username: null
  },
  setUser: (user) => set({ 
    user: {
      id: user.id,
      username: user.username
    },
    isAuthenticated: true 
  }),
  resetAuth: () => set({ 
    isAuthenticated: false, 
    user: { id: null, username: null } 
  }),
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
        { withCredentials: true }
      );
      if (response.data.success) {
        set({ 
          isAuthenticated: true,
          user: {
            id: response.data.user.id,
            username: response.data.user.username
          },
          isLoading: false
        });
      } else {
        set({ 
          isAuthenticated: false,
          user: { id: null, username: null },
          isLoading: false
        });
      }
    } catch (error) {
      set({ 
        isAuthenticated: false,
        user: { id: null, username: null },
        isLoading: false
      });
    }
  }
}))

export default useAuthStore
