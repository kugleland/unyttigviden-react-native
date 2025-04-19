// fact store

import { create } from 'zustand';
import api from '../services/api/axios';
import { Category } from '../types/fact';

export const useQuizStore = create((set) => ({
  quiz: [],
  questions: [],
  answers: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,    
  getQuiz: async (quizId: string) => {
          set({ isLoading: true });
    try { 
      const response = await api.get(`/quizzes/${quizId}`);
      set({ quiz: response.data.data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));