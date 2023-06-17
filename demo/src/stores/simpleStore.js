import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSimpleStore = defineStore('simple', {
  state: () => ({
    heading: 'Hello world'
  }),
  actions: {
    changeHeading(heading) {
      this.heading = heading;
    }
  },
  getters: {
    getHeading(state) {
      return state.heading;
    }
  }
})
