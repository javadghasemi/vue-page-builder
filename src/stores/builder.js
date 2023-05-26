import {defineStore} from "pinia";

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    isSorting: false,
    isEditing: true,
    listShown: false,
    sectionsSettingShown: false,
    sortable: {}
  }),
  actions: {
    toggleSort() {
      this.isSorting = !this.isSorting;
    },
    toggleListShown() {
      this.listShown = !this.listShown;
    },
    toggleSectionsSettingShown() {
      this.sectionsSettingShown = !this.sectionsSettingShown;
    }
  }
});