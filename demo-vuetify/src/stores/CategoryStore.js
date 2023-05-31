import { defineStore } from 'pinia'
import axios from "axios";

export const useCategoryStore = defineStore('category', {
  state() {
    return {
      categories: null
    }
  },
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    async fetchCategories() {
      const result = await axios.get('http://localhost:3000/categories');
      this.categories = result.data;
    }
  }
})