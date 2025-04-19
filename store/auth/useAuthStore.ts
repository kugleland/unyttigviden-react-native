import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { authInterceptor } from '../../services/api/axios';
import { User, LoginData, RegisterData, ForgotPasswordData } from '../../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  error: string | null;
  errors: any | null;
  status: number | null;
  message: string | null;
  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      error: null,
      errors: [],
      status: null,
      message: null,
      login: async (data: LoginData) => {      
        
        try {
          set({ isLoading: true, error: null });
          const response = await api.post('/login', data);
          const { user, token } = response.data;
          authInterceptor.updateToken(token);          
          set({ user, token, isLoading: false });

        } catch (error: any) {


          if (error.response?.status == 422) {

                set({ 
                  errors: error.response.data.errors || [{email: 'Login failed'}], 
                  isLoading: false,
                  status: error.response.status,
                  message: error.response.data.message
                });
            }
          
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false,
            status: error.response.status,
            message: error.response.data.message
          });
        }
      },

      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.post('/register', data);
          const { user, token } = response.data;
          
          authInterceptor.updateToken(token);
          
          set({ user, token, isLoading: false });
        } catch (error: any) {                    

          if (error.response?.status == 422) {

                set({ 
                  errors: error.response.data.errors || [{email: 'Registration failed'}], 
                  isLoading: false,
                  status: error.response.status,
                  message: error.response.data.message
                });
          }


          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            isLoading: false,
            status: error.response.status,
            message: error.response.data.message
          });
        }
      },
      getUser: async () => {
       
        try {
          const response = await api.get('/user');
          set({ user: response.data });
        } catch (error) {
          console.error('Error fetching user:', error);
          return null;
        }
      },  

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          await api.post('/logout');
        } catch (error) {
          // Continue with logout even if API call fails
        } finally {
          authInterceptor.updateToken(null);
          
          set({ 
            user: null, 
            token: null, 
            isLoading: false,
            status: null,
            message: null
          });
        }
      },
      forgotPassword: async (data: ForgotPasswordData) => {
        try {
          const response = await api.post('/forgot-password', data);
          return response.data;
        } catch (error: any) {
          // console.error('Error sending forgot password request:', error); 

          if (error.response?.status == 422) {
            set({
              errors: error.response?.data?.errors || [{email: 'Forgot password failed'}], 
              isLoading: false,
              status: error.response.status,
              message: error.response.data.message
            }); 
          }


          set({
            error: error.response?.data?.message || 'Forgot password failed', 
            isLoading: false,
            status: error.response.status,
            message: error.response.data.message
          });
        }
        
      },

      clearError: () => set({ error: null, errors: [] }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          authInterceptor.updateToken(state.token);
        }
        useAuthStore.getState().setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;
