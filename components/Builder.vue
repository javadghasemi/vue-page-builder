<script>
import Elements from "./Elements/Elements.vue";
import {mapStores} from "pinia";
import {useBuilderStore} from "../stores/builderStore";

export default {
  props: ['data'],
  emits: ['save'],
  components: {
    Elements
  },
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
  },
  methods: {
    onSave() {
      this.$emit('save', this.builderStore.prepareDataForSave);
    }
  }
}
</script>

<template>
  <div class="page-builder-editor-wrapper">
    <elements @save="onSave"/>

    <main id="page-builder-preview" dir="rtl" style="margin-left: auto">
      <div id="elements-preview-wrapper" v-for="(element, index) in this.builderStore.getSelectedElements">
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
}

#page-builder-preview {
  overflow-y: hidden;
  align-items: flex-start;
  margin-left: auto;
}

</style>