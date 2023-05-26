<template>
  <div class="input-group font-vazir">
    <span class="input-text">{{ name }}</span>
    <input class="input" type="text" v-model="this.sectionStore.sections[this.sectionIndex].data[this.elementName]">
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
      console.log(this.sectionStore.sections[this.sectionIndex])
      return this.sectionStore.sections[this.sectionIndex].editorNames[this.elementName];
    }
  },
}
</script>

<style scoped>

</style>