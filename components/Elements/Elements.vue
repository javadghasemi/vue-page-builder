<template>
  <aside class="elements-panel" :class="{'is-shown': this.builderStore.getShowPanelState}">
    <div class="elements-panel-inner">
      <panel-header/>
      <main id="elements-panel-content-wrapper">
        <div id="elements-panel-page">
          <div id="elements-panel-wrapper">
            <div id="elements-panel-editor" v-if="this.builderStore.getEditorState">
              <selected-elements-editor/>
            </div>
            <div id="elements-panel-categories" v-else>
              <elements-category v-for="group in this.builderStore.getComponentGroups" :category-name="group"/>
            </div>
          </div>
        </div>
      </main>
      <footer id="elements-panel-footer">
        <nav id="elements-panel-footer-tools">
          <div id="elements-panel-footer-saver-publish" class="elements-panel-footer-tool">
            <button id="elements-panel-saver-button-publish" class="elements-button e-primary">
              SAVE
            </button>
          </div>
        </nav>
      </footer>
      <panel-show-switcher />
    </div>
  </aside>
</template>

<script>
import {mapStores} from "pinia";
import {useBuilderStore} from "../../stores/builderStore";

import PanelShowSwitcher from './PanelShowSwitcher.vue';
import PanelHeader from "./PanelHeader.vue";
import ElementsCategory from "./ElementsCategory.vue";
import SelectedElementsEditor from "./Editor/SelectedElementsEditor.vue";

export default {
  components: {SelectedElementsEditor, ElementsCategory, PanelHeader, PanelShowSwitcher},
  data: () => ({
    drag: false,
    showPanel: false
  }),
  computed: {
    ...mapStores(useBuilderStore)
  },
  created() {
    console.log('===', this.builderStore.getComponentGroups)
  }
}
</script>

<style scoped>
.elements-panel {
  position: relative;
  height: 100%;
  width: 300px;
  overflow: visible;
  background-color: #1f2124;
  z-index: 1;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: 13px;
  left: 0;
  top: 0;
  transform: translate3d(-100%, 0, 0);
}

.elements-panel-inner {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
}


.elements-panel .elements-panel-header > * {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}


#elements-panel-content-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  color: white;
}

.elements-panel #elements-panel-categories {
  padding-bottom: 10px;
}


.is-shown {
  transform: translate3d(0, 0, 0);
}


#elements-panel-footer {
  position: relative;
  height: 40px;
  background-color: #0c0d0e;
  color: #9da5ae;
}

#elements-panel-footer-tools {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.elements-panel-footer-tool {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 15%;
  cursor: pointer;
  transition: all .3s;
  border: 0;
  color: currentColor;
  background-color: transparent;
}

#elements-panel-footer-saver-publish {
//width: 30%;
  margin-left: auto;
  padding: 0;
  font-size: 11px;
  height: 100%;
  width: 100%;
  border-radius: 0;
}

.elements-button.e-primary {
  background-color: #f3bafd;
  color: #0c0d0e;
}
.elements-panel .elements-button {
  display: inline-block;
  height: 100%;
  width: 30%;
  border: none;
}

.elements-panel .elements-button:hover {
  background-color: #f2c9fa;
  cursor: pointer;
}

footer {
  display: block;
}
</style>