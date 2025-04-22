// fact store

import { create } from 'zustand';
import api from '../services/api/axios';
import { Category } from '../types/fact';

export const useFactStore = create((set) => ({
  facts: [],
  categories: [],
  category: {} as Category,
  dailyFact: {},
  trendingFacts: [],
  newFacts: [],
  currentFact: {},
  isLoading: false,
  error: null,
  status: null,
  message: null,
  bookmarks: [],
  getCategories: async () => {  
    set({ facts: [], category: {} as Category });
    try {
      const response = await api.get('/categories');
      set({ categories: response.data.data });
    } catch (error) {
      set({ error: error });
    }
  },
  getDailyFact: async () => {
    try {
      const response = await api.get("/daily-fact");
      set({ dailyFact: response.data.data });
    } catch (error) {
      set({ error: error });
    }
  },
  getTrendingFacts: async () => {
    try {
      const response = await api.get("/trending-facts");
      set({ trendingFacts: response.data.data });
    } catch (error) {
      set({ error: error });
    }
  },
  getNewFacts: async () => {
    try {
      const response = await api.get("/new-facts");
      set({ newFacts: response.data.data });
    } catch (error) {
      set({ error: error });
    }
  },
  upvoteFact: async (factId: string) => {
    try {
      const response = await api.post(`/facts/${factId}/upvote`);
      set({ currentFact: response.data.data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  downvoteFact: async (factId: string) => {
    try {
      const response = await api.post(`/facts/${factId}/downvote`);
      set({ currentFact: response.data.data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  bookmarkFact: async (factId: string) => {
    try {
      const response = await api.post(`/facts/${factId}/bookmark`);
      set({ currentFact: response.data.data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  getCategory: async (categoryId: string) => {
          set({ isLoading: true });
    try { 
      const response = await api.get(`/categories/${categoryId}`);
      set({ category: response.data.data, facts: response.data.data.facts });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  getBookmarks: async () => {
    try {
      const response = await api.get("/bookmarks");
      set({ bookmarks: response.data.data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  getAllFacts: async () => {
    set({ isLoading: true });
    try { 
      const response = await api.get(`/categories/all`);
      set({ category: response.data.data, facts: response.data.data.facts });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));