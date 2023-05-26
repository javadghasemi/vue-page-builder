<template>
  <div class="controller-panel" dir="ltr">
    <button class="controller-button green" tooltop-position="top" tooltip="export" @click="$emit('submit')">
      <icons :name="'download'"/>
    </button>
    <button class="controller-button red" v-if="!tempSections" @click="clearSections" tooltop-position="top"
            tooltip="clear sections">
      <icons name="trash"/>
    </button>
    <button class="controller-button gray" v-if="tempSections" @click="undo" tooltop-position="top" tooltip="undo">
      <icons name="undo"/>
    </button>
    <button class="controller-button" :class="{ 'red': builderStore.isSorting, 'blue': !builderStore.isSorting }"
            @click="toggleSort" tooltop-position="top" tooltip="sorting">
      <icons name="sort"/>
    </button>
    <button class="controller-button"
            :class="{ 'blue': !builderStore.listShown, 'red': builderStore.listShown, 'is-rotated': builderStore.listShown }"
            tooltop-position="top" tooltip="add section" @click="newSection">
      <icons name="plus"/>
    </button>
    <button class="controller-button"
            :class="{ 'green': !builderStore.sectionsSettingShown, 'red': builderStore.sectionsSettingShown }"
            tooltop-position="top" tooltip="sections setting" @click="sectionsSetting">
      <icons name="section"/>
    </button>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapStores} from "pinia";

import Icons from "../Icons";

import {useBuilderStore} from "../../stores/builder";
import {useSectionStore} from "../../stores/section";

export default defineComponent({
  components: {Icons},
  data: () => ({
    tempSections: null,
  }),
  computed: {
    ...mapStores(useBuilderStore, useSectionStore)
  },
  methods: {
    clearSections() {
      this.tempSections = this.sectionStore.clear();
      setTimeout(() => {
        this.tempSections = null;
      }, 5000);
    },
    undo() {
      this.sectionsStore.setSections(this.tempSections);
      this.tempSections = null;
    },
    toggleSort() {
      this.builderStore.toggleSort();

      if (!this.builderStore.isSorting && this.sortable) {
        this.builderStore.sortable.option('sort', false);
        this.sortable.option('disabled', true);
        return;
      }

      this.builderStore.sortable.option('disabled', false);
      this.builderStore.sortable.option('sort', true);
    },
    newSection() {
      const availableSections = this.sectionStore.availableSections;

      if (availableSections.length === 1) {
        this.sectionStore.addSection(availableSections[0]);
        return;
      }

      this.toggleListVisibility();
    },
    toggleListVisibility() {
      this.builderStore.toggleListShown();
      this.builderStore.sortable.option('disabled', !this.listShown);
    },
    sectionsSetting() {
      this.builderStore.toggleSectionsSettingShown();
    }
  }
})
</script>

<style scoped src="./ControllerPanel.style.css"/>
