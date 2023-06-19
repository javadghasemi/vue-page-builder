import { defineStore } from 'pinia'
import axios from "axios";
import {th} from "vuetify/locale";

export const useCategoryStore = defineStore('category', {
  state() {
    return {
      categories: null,
      currentCategory: null
    }
  },
  getters: {
    getCategories: (state) => state.categories,
    getCategoryItems(state) {
      if (!state.currentCategory) {
        return state.categories['mobile'];
      }

      return state.categories[state.currentCategory];
    }
  },
  actions: {
    async fetchCategories() {
      const result = await axios.get('http://localhost:3000/categories');
      this.categories = result.data;
    },
    setCurrentCategory(category) {
      this.currentCategory = category;
    },
  }
})