<template>
  <ul class="menu left" :class="{ 'is-visible': builderStore.listShown }">
    <li class="menu-group" v-for="(group, name) in groups" :key="name">
      <div class="menu-header" @click="toggleGroupVisibility">
        <span class="menu-title">{{ name }}</span>
        <span class="menu-icon">
            <icons name="arrowDown"/>
          </span>
      </div>
      <div class="menu-body">
        <template v-for="section in group">
          <a class="menu-element" @click="addSection(section)" @drag="currentSection = section">
            <img :src="section.cover" alt="" class="menu-elementImage" v-if="section.cover">
            <span class="menu-elementTitle">{{ section.name }}</span>
          </a>
        </template>
      </div>
    </li>
  </ul>
</template>

<script>

import {defineComponent} from "vue";
import {mapStores} from "pinia";

import Icons from "../Icons";
import {useSectionStore} from "../../stores/section";
import {useBuilderStore} from "../../stores/builder";

export default defineComponent({
  components: {Icons},
  data: () => ({
    groups: {},
    currentSection: '',
  }),
  created() {
    this.generateGroups();
  },
  computed: {
    ...mapStores(useSectionStore, useBuilderStore)
  },
  methods: {
    generateGroups() {
      let groups = {random: []};

      this.sectionStore.availableSections.forEach(section => {
        const sectionGroup = section.group;
        if (!sectionGroup) {
          groups.random.push(section);
          return;
        }

        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section];
          return;
        }

        groups[sectionGroup].push(section);
      });

      this.groups = groups;
    },
    toggleGroupVisibility(e) {
      const element = e.target;
      const group = element.closest('.menu-group');
      group.classList.toggle('is-visible');
    },
    addSection(section) {
      console.log('------------------', section)
      this.sectionStore.addSection(section);
    },
  }
})
</script>

<style scoped src="./AvailableSectionsMenu.style.css" />
