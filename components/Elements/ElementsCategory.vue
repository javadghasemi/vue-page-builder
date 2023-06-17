<script>
import Element from "./Element.vue";
import {mapStores} from "pinia";
import {useBuilderStore} from "../../stores/builderStore";
import ElementsGroupButton from "./ElementsGroupButton.vue";

export default {
  components: {ElementsGroupButton, Element},
  props: ['categoryName'],
  data() {
    return {
      collapseItems: false
    }
  },
  computed: {
    ...mapStores(useBuilderStore)
  },
  methods: {
    addElement(element) {
      this.builderStore.selectElement(element);
    }
  }
}
</script>

<template>
  <div class="elements-panel-category">
    <elements-group-button :title="categoryName" @collapse="collapseItems = !collapseItems"/>

    <div class="elements-panel-category-items" :style="{display: collapseItems ? 'grid' : 'none'}"
         v-for="element in builderStore.groupElements(categoryName)">
      <element :title="element.name" :icon='element.icon' @click="addElement(element)"/>
    </div>
  </div>
</template>

<style scoped>
.elements-panel-category {
  position: relative;
  border-bottom: 1px solid #333438;
}

.elements-panel .elements-panel-category-items {
  padding: 0 15px 20px 15px;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(min(135px, 50% - 5px), 1fr));
}
</style>