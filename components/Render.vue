<script>
import {mapStores} from "pinia";
import {useBuilderStore} from "../stores/builderStore";

export default {
  props: ['data'],
  computed: {
    ...mapStores(useBuilderStore)
  },
  mounted() {
    if (this.data && this.data.length) {
      for (const element of this.data) {
        const el = this.builderStore.getElement(element.group, element.name);
        this.builderStore.selectElement(el, element.data);
      }
    }
  }
}
</script>

<template>
  <main id="page-builder-render" dir="rtl" style="margin-left: auto">
    <div id="elements-preview-wrapper" v-for="(element, index) in this.builderStore.getSelectedElements">
      <component :is="element.render" :data="element.data" :id="index"/>
    </div>
  </main>
</template>

<style>
#page-builder-render {

}
</style>