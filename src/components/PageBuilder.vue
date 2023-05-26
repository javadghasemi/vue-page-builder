<template>
  <div class="font-vazir" dir="rtl">
    <div id="artboard" class="artboard" ref="artboard"
         :class="{ 'is-sorting': builderStore.isSorting, 'is-editable': $builder.isEditing.value }"
    >
      <component
          v-for="section in getAddedSections"
          :is="section.name"
          :key="section.id"
          :id="section.id"
          class="is-editable"
      />
    </div>

    <div class="controller">
      <div class="controller-intro" v-if="showIntro && !sectionStore.sections.length">
        <label for="projectName">چطوری؟ وقتشه سایت خودت رو بسازی</label>
        <input type="text" class="controller-input" id="projectName" placeholder="اسم سایتت چی باشه؟" v-model="title">
        <template v-if="themes">
          <div class="controller-themes">
            <button class="controller-theme font-vazir" v-for="theme in themes" :key="theme.id"
                    @click="addTheme(theme)">
              {{ theme.name }}
            </button>
          </div>
        </template>
      </div>

      <controller-panel
          @submit="submit"
      />
    </div>

    <available-sections-menu ref="menu"/>
    <sections-setting/>
  </div>
</template>

<script>
import Sortable from 'Sortablejs';
import {mapStores} from "pinia";

import {useSectionStore} from "../stores/section";
import {useBuilderStore} from "../stores/builder";

import Icons from './Icons';
import ControllerPanel from "./ControllerPanel/ControllerPanel.vue";
import AvailableSectionsMenu from "./AvailableSectionsMenu/AvailableSectionsMenu.vue";
import SectionsSetting from "./SectionsSetting/SectionsSetting.vue";

export default {
  components: {SectionsSetting, AvailableSectionsMenu, ControllerPanel, Icons},
  props: {
    showIntro: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => ({
        title: '',
        sections: []
      })
    }
  },
  data() {
    return {
      title: null,
      listShown: false,
      tempSections: null,
      sections: this.getSections(),
      currentSection: '',
      groups: {}
    }
  },
  computed: {
    ...mapStores(useSectionStore, useBuilderStore),
    getAddedSections() {
      return this.sectionStore.sections;
    }
  },
  created() {
    this.$builder.set(this.data);
    this.title = this.$builder.title;
    this.themes = this.$builder.themes;

    this.sectionStore.setAvailableSections(this.getSections());
  },
  mounted() {
    this.$builder.rootEl = this.$refs.artboard;
    const groups = this.$refs.menu.$el.querySelectorAll('.menu-body');
    const self = this;

    groups.forEach((group) => {
      new Sortable(group, {
        group: {
          name: 'sections-group',
          put: false,
          pull: 'clone'
        },
        sort: false
      });
    });

    this.builderStore.sortable = Sortable.create(this.$refs.artboard, {
      group: {
        name: 'artboard',
        put: 'section-group'
      },
      animation: 150,
      scroll: true,
      scrollSpeed: 10,
      sort: false,
      disabled: true,
      preventOnFilter: false,
      onAdd(evt) {
        self.sectionStore.addSection(self.currentSection, evt.newIndex);
        evt.item.remove();
      },
      onUpdate(evt) {
        self.sectionStore.sort(evt.oldIndex, evt.newIndex);
      }
    });
  },
  updated() {
    console.log(this.sectionStore)
    if (this.$builder.scrolling) {
      this.$builder.scrolling(this.$refs.artboard);
    }
  },
  watch: {
    title(value) {
      this.$builder.title = value;
      document.title = value;
    }
  },
  methods: {
    getSections() {
      let sections = [];

      sections = Object.keys(this.$builder.components).map(sec => {
        return {
          name: sec,
          group: this.$builder.components[sec].group,
          cover: this.$builder.components[sec].cover,
          schema: this.$builder.components[sec].$schema,
          editorNames: this.$builder.components[sec].editorNames
        }
      });

      return sections;
    },
    addTheme(theme) {
      this.$builder.set(theme);
    },
    submit() {
      this.$emit('saved', this.$builder);
    }
  }
}
</script>

<style>
.artboard {
  transform-origin: top center;
}

.artboard.is-editable .is-editable {
  outline: none;
}

.is-editable:hover {
  box-shadow: inset 0 0 0 2px #c1c1c1;
}

.sortable-ghost {
  opacity: 0.3;
  box-shadow: 0 0 2px 1px #0072FF;
}

.controller {
  box-sizing: border-box;
}

.controller-intro {
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 50px;
  text-align: center;
  font-size: 30px;
  color: #323c47;
  font-weight: 200;
}

.controller-input {
  outline: none;
  border: 1px solid #c1c1c1;
  padding: 0.5em 1em;
  margin: 20px 0;
  border-radius: 40px;
  width: 90%;
  font-size: 16px;
}

.controller-input:focus {
  border-color: #0072FF;
  /* box-shadow: 0 0 0 2px; */
}

.controller-themes {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.controller-theme {
  background-color: #fff;
  color: #323c47;
  border: 1px solid #c1c1c1;
  margin: 5px;
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
}

.controller-theme:hover {
  border-color: #0072FF;
}
</style>