import {defineStore} from "pinia";

import {Element} from "../Element";

export const useBuilderStore = defineStore('builder', {
  state() {
    return {
      isShownPanel: false,
      editorState: false,
      components: {},
      selectedElements: []
    }
  },
  actions: {
    changePanelState() {
      this.isShownPanel = !this.isShownPanel;
    },
    addComponent(component) {
      if (!this.components[component.group]) {
        this.components[component.group] = [];
      }

      this.components[component.group].push(component);
    },
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
    changeEditorState() {
      this.editorState = !this.editorState;
    },
    deleteElement(index) {
      this.selectedElements.splice(index, 1);
    },
  },
  getters: {
    getElement(state) {
      return (group, name) => {
        for (const el of state.components[group]) {
          if (el.name === name) {
            return el;
          }
        }
      }
    },
    getShowPanelState(state) {
      console.log(state.isShownPanel)
      return state.isShownPanel;
    },
    getComponentGroups(state) {
      return Object.keys(state.components);
    },
    groupElements(state) {
      return (groupName) => {
        console.log(state.components[groupName])
        return state.components[groupName];
      }
    },
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
    getEditorState(state) {
      return state.editorState;
    }
  }
});
