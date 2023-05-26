<template>
  <div class="input-group">
    <span class="input-text">{{ name }}</span>
    <textarea class="input" cols="30" rows="10" v-model="this.sectionStore.sections[this.sectionIndex].data[this.elementName]"></textarea>
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