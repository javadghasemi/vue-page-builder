<script>
import {mapStores} from "pinia";
import {useBuilderStore} from "../../../stores/builderStore";
import ElementsGroupButton from "../ElementsGroupButton.vue";
import {useSelectedElementsStore} from "../../../stores/selectedElementStore";

export default {
  data: () => ({
    open: []
  }),
  components: {ElementsGroupButton},
  computed: {
    ...mapStores(useBuilderStore, useSelectedElementsStore)
  },
  methods: {
    collapse(index) {
      this.open[index] = !this.open[index];
    },
    deleteElement(index) {
      this.selectedElementsStore.deleteElement(index);
    }
  }
};
</script>

<template>
  <div v-for="(element, index) in selectedElementsStore.getSelectedElements" :key="index">
    <elements-group-button
        :title="element.name"
        :editor="true"
        @collapse="collapse(index)"
        @delete-element="this.deleteElement(index)"/>

    <div class="element-control" :style="{display: open[index] ? 'flex' : 'none'}">
      <div class="element-control-content">
        <component :is="element.editor" :data="element.data"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.element-control {
  --control-title-size: 12px;
  position: relative;
  padding: 0 20px 15px;
  border-bottom: 1px solid #333438;
}

.element-control .element-control-content {
  flex-direction: column;
}
</style>