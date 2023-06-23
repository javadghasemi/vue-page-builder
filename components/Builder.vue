<script>
import Elements from "./Elements/Elements.vue";
import {mapStores} from "pinia";
import {useBuilderStore} from "../stores/builderStore";
import {useSelectedElementsStore} from "../stores/selectedElementStore";

export default {
  props: ['data'],
  emits: ['save'],
  components: {
    Elements
  },
  computed: {
    ...mapStores(useBuilderStore, useSelectedElementsStore)
  },
  mounted() {
    if (!this.selectedElementsStore.getSelectedItemLength && this.data && this.data.length) {
      for (const element of this.data) {
        const el = this.builderStore.getElement(element.group, element.name);
        this.selectedElementsStore.selectElement(el, element.data);
      }
    }
  },
  beforeUnmount() {
    this.selectedElementsStore.$reset();
  },
  methods: {
    onSave() {
      this.$emit('save', this.builderStore.prepareDataForSave);
    }
  }
}
</script>

<template>
  <div class="page-builder-editor-wrapper" dir="rtl">
    <elements @save="onSave"/>

    <main id="page-builder-preview" dir="rtl" style="margin-left: auto">
      <div id="elements-preview-wrapper" v-for="(element, index) in this.selectedElementsStore.getSelectedElements">
        <component :is="element.render" :data="element.data" :id="index"/>
      </div>
    </main>

  </div>
</template>

<style>
.page-builder-editor-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
}

#page-builder-preview {
  overflow-y: hidden;
  align-items: flex-start;
  margin-left: auto;
  position: absolute;
}

</style>