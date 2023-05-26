import {mapStores} from "pinia";

import {useSectionStore} from "./stores/section";


function installMixin({builder}) {
  builder.mixin = {
    provide: function providesBuilder() {
      const provides = {};

      if (this.$builder) {
        provides.$builder = this.$builder;
      }

      if (this.$section) {
        provides.$section = this.$section;
      }

      return provides;
    },
    beforeCreate() {
      this.$builder = builder;

      const sectionStore = useSectionStore();

      if (this.id === undefined) {
        return;
      }
      this.$section = sectionStore.findSection(this.id);

      this.$options.computed = {
        $sectionData: function getSectionData() {
          return this.$section.data;
        }
      }
    },
    updated() {
      Array.from(this.$el.querySelectorAll('[contentEditable]')).forEach((el) => {
        el.contentEditable = this.$builder.isEditing.value;
      });
    }
  }
}

export default installMixin;