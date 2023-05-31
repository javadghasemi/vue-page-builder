import {defineStore} from "pinia";
import Section from "../Section";

export const useSectionStore = defineStore('section', {
  state: () => ({
    availableSections: [],
    sections: []
  }),
  getters: {
    getAllSections() {
      return this.sections;
    }
  },
  actions: {
    setAvailableSections(sections) {
      this.availableSections = sections;
    },
    addSection(options, position = undefined) {
      const section = new Section(options);

      if (position !== undefined) {
        this.sections.splice(position, 0, section);
        return;
      }

      this.sections.push(section);
    },
    findSection(id) {
      return this.sections.find(s => s.id === id);
    },
    sort(oldIndex, newIndex) {
      const section = this.sections[oldIndex];
      this.sections.splice(oldIndex, 1);
      this.sections.splice(newIndex, 0, section);
    },
    clear() {
      const tempSections = this.sections;
      this.sections.forEach(section => section.destroy());
      this.sections.splice(0, this.sections.length);

      return tempSections;
    },
    setSections(sections) {
      this.sections = sections;
    }
  }
});