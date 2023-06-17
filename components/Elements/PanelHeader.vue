
<template>
  <header class="elements-panel-header-wrapper">
    <div class="elements-panel-header">
      <button id="elements-panel-header-menu-button" class="elements-header-button">
        <i class="mdi mdi-menu eicon-menubar"></i>
      </button>

      <h2 class="elements-panel-header-title">
        Elements
      </h2>

      <button id="elements-panel-header-add-button" class="elements-header-button" @click="this.builderStore.changeEditorState">
        <i class="mdi mdi-apps eicon-menubar"></i>
      </button>
    </div>
  </header>
</template>

<script>
import {mapStores} from "pinia";
import {useBuilderStore} from "../../stores/builderStore";

export default {
  computed: {
    ...mapStores(useBuilderStore)
  }
}
</script>

<style scoped>
.elements-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  background-color: #0c0d0e;
  color: #fff;
}

.elements-header-button {
  width: 40px;
  border: 0;
  color: currentColor;
  background-color: transparent;
}

.eicon-menubar {
  font-size: 18px;
}
</style>