<template>
  <div class="button-editor">
    <span class="button-editor-label">{{ name }}</span>
    <div class="button-editor-inputs">
      <div class="input-group font-vazir">
        <span class="input-text">متن</span>
        <input class="input" type="text"
               v-model="this.sectionStore.sections[this.sectionIndex].data[this.elementName].text">
      </div>
      <div class="input-group font-vazir">
        <span class="input-text">لینک</span>
        <input class="input" type="text"
               v-model="this.sectionStore.sections[this.sectionIndex].data[this.elementName].href">
      </div>
    </div>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {useSectionStore} from "../../stores/section";
import {useBuilderStore} from "../../stores/builder";

export default {
  props: ['elementName', 'sectionIndex', 'editorName'],
  computed: {
    ...mapStores(useSectionStore, useBuilderStore),
    name() {
      return this.sectionStore.sections[this.sectionIndex].editorNames[this.elementName];
    }
  },

}
</script>

<style scoped>
.button-editor {
  margin-top: 10px;
}

.button-editor-label {
  margin-bottom: 10px;
}

.button-editor-inputs {
  border: 1px solid #9999;
  padding: 3px;
  border-radius: 5px;
}
</style>