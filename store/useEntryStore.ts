import { create } from 'zustand';
import api from '../services/api/axios';
import useAuthStore from './auth/useAuthStore';
import { Platform } from 'react-native';

interface Entry {
  id?: string;
  title: string;
  description: string;
  notes: string;
  category: string;
  tags: string[] | null;
  image: string | null;
  location: string | null;
  is_public: boolean | null;
}

interface EntryStore {
  entries: Entry[];
  isLoading: boolean;
  error: string | null;
  errors: any | null;
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt'>) => Promise<void>;
  fetchEntries: () => Promise<void>;
  clearError: () => void; 
}


const useEntryStore = create<EntryStore>((set) => ({
  entries: [],
  isLoading: false,
  error: null,
  errors: null,
  addEntry: async (entry) => {
    set({ isLoading: true, error: null });
    try {
        const formData = new FormData();
        formData.append('title', entry.title);  
        formData.append('description', entry.description);
        formData.append('notes', entry.notes);
        formData.append('category', entry.category);
        formData.append('tags', entry.tags ? JSON.stringify(entry.tags) : JSON.stringify([]));
        formData.append('location', entry.location || '');
        formData.append('is_public', entry.is_public ? 'true' : 'false');

        formData.append('image', {
            uri: Platform.OS === 'android' ? entry.image : entry.image?.replace('file://', ''),
            name: `image-${entry.title}.jpg`,
            type: 'image/jpeg'
        } as any);

            // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const token = useAuthStore.getState().token;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
      const response = await api.post(`/entries`, formData);
      set((state) => ({
        entries: [...state.entries, response.data],
        isLoading: false,
        error: null,
        errors: null,
      }));


    } catch (error: any) {
      console.log('Error saving entry', error);

      if (error.response?.status == 422) {
        console.log('Error saving entry', error.response.data.errors);

            set({
              errors: error.response.data.errors || [{all: 'Login failed'}], 
              isLoading: false 
            });
    }
      
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
    finally {
      // set({ isLoading: false, error: null, errors: [] });
    }
  },

  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await api.get(`/entries`);
      set({ entries: response.data.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },
  clearError: () => set({ error: null, errors: [] }),
}));

export default useEntryStore;
