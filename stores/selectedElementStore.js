import {defineStore} from "pinia";
import {Element} from "../Element";

export const useSelectedElementsStore = defineStore('selectedElements', {
  state() {
    return {
      selectedElements: []
    }
  },
  actions: {
    selectElement(el, initialData) {
      const reactiveData = {};
      for (const data in el.$schema) {
        if (initialData && initialData[data])
          reactiveData[data] = initialData[data];
        else
          reactiveData[data] = el.$schema[data] || null;
      }

      const element = new Element(el.name,
        el.group,
        el.icon,
        el.render,
        el.editor,
        reactiveData);

      this.selectedElements.push(element);
    },
    deleteElement(index) {
      this.selectedElements.splice(index, 1);
    },
    $reset() {
      this.selectedElements = [];
    }
  },
  getters: {
    getSelectedElements(state) {
      return state.selectedElements;
    },
    prepareDataForSave(state) {
      const result = [];

      for (const element of state.selectedElements) {
        result.push({
          group: element.group,
          name: element.name,
          data: element.data
        });
      }

      return result;
    },
    getSelectedItemLength(state) {
      return state.selectedElements.length;
    }
  }
});