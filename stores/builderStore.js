import {defineStore} from "pinia";

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
      console.log(this.components);
    },
    selectElement(element) {
      this.selectedElements.push(element);
    },
    changeEditorState() {
      this.editorState = !this.editorState;
    }
  },
  getters: {
    getShowPanelState(state) {
      return state.isShownPanel;
    },
    getComponentGroups(state) {
      return Object.keys(state.components);
    },
    groupElements(state) {
      return (groupName) => {
        return state.components[groupName];
      }
    },
    getSelectedElements(state) {
      return state.selectedElements;
    },
    getEditorState(state) {
      return state.editorState;
    }
  }
});
