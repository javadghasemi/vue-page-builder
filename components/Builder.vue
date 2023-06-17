<script>
import Elements from "./Elements/Elements.vue";
import {mapStores} from "pinia";
import {useBuilderStore} from "../stores/builderStore";

export default {
  computed: {
    ...mapStores(useBuilderStore)
  },
  components: {
    Elements
  }
}
</script>

<template>
  <div class="page-builder-editor-wrapper">
    <elements></elements>
    <main id="page-builder-preview">
      <div id="elements-preview-wrapper" v-for="element in this.builderStore.getSelectedElements">
        <component :is="element.render"/>
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
  position: fixed;
}

</style>