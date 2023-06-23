<script>
import {mapStores} from "pinia";
import {useBuilderStore} from "../stores/builderStore";
import {useSelectedElementsStore} from "../stores/selectedElementStore";

export default {
  props: ['data'],
  computed: {
    ...mapStores(useBuilderStore, useSelectedElementsStore)
  },
  watch: {
    data: {
      handler() {
        this.selectElement();
      },
      deep: true
    }
  },
  mounted() {
    this.selectElement();
  },
  beforeUnmount() {
    this.selectedElementsStore.$reset();
  },
  methods: {
    selectElement() {
      if (this.data && this.data.length) {
        for (const element of this.data) {
          const el = this.builderStore.getElement(
              element.group,
              element.name
          );
          this.selectedElementsStore.selectElement(el, element.data);
        }
      }
    }
  }
}
</script>

<template>
  <main id="page-builder-render" dir="rtl" style="margin-left: auto">
    <div id="elements-preview-wrapper" v-for="(element, index) in this.selectedElementsStore.getSelectedElements">
      <component :is="element.render" :data="element.data" :id="index"/>
    </div>
  </main>
</template>

<style>
</style>