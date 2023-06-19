<script>
import {mapStores} from "pinia";
import {useBuilderStore} from "../../stores/builderStore";

export default {
  computed: {
    ...mapStores(useBuilderStore)
  }
}
</script>

<template>
  <div id="elements-mode-switcher" @click="this.builderStore.changePanelState">
    <div id="elements-mode-switcher-inner">
      <label id="elements-mode-switcher-preview">
        <i class="mdi eicon mdi-menu-right" :class="{'mdi-rotate-180': !this.builderStore.getShowPanelState}"></i>
      </label>
    </div>
  </div>
</template>

<style scoped>
#elements-mode-switcher {
  --e-a-mode-switcher-width: 15px;
  --e-a-mode-switcher-height: 50px;
  --e-a-mode-switcher-icon-size: 15px;
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #1f2124;
  box-shadow: 3px 1px 3px rgba(0, 0, 0, .05);
}

#elements-mode-switcher:hover {
  background-color: #2b2c31;
}

#elements-mode-switcher-preview i {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: var(--e-a-mode-switcher-width);
  height: var(--e-a-mode-switcher-height);
  font-size: var(--e-a-mode-switcher-icon-size);
  cursor: pointer;
}

</style>