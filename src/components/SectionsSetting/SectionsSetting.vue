<template>
  <ul class="menu right" :class="{'is-visible': builderStore.sectionsSettingShown}">
    <li v-for="(section, index) in sectionStore.sections">
      <div class="menu-header">
        <span class="menu-title">{{ section.name }}</span>
        <span class="menu-icon">
            <icons name="arrowDown"/>
          </span>
      </div>
      <div class="menu-body">
        <component v-for="(value, key) in section.schema" :is="findForm(value)" :elementName="key" :sectionIndex="index" />
      </div>
    </li>
  </ul>
</template>

<script>
import {defineComponent} from "vue";
import {mapStores} from "pinia";

import {useSectionStore} from "../../stores/section";
import {useBuilderStore} from "../../stores/builder";
import Icons from "../Icons";
import Input from "../Forms/Input.vue";
import TextInput from "../Forms/TextInput.vue";
import ButtonForm from "../Forms/ButtonForm.vue";

import {Text, Button, Title} from '../../Types';

export default defineComponent({
  components: {Icons},
  computed: {
    ...mapStores(useSectionStore, useBuilderStore),
  },
  methods: {
    findForm(schema) {
      switch (schema) {
        case Title:
          return Input;
        case Text:
          return TextInput;
        case Button:
          return ButtonForm;
      }
    }
  },
});
</script>

<style scoped>
.menu {
  background: #f6f5f5;
  width: 400px;
  color: #444;
  z-index: 100;
  transform: translate3d(100%, 0, 0);
}
</style>