<template>
  <div class="font-vazir" dir="rtl">
    <div id="artboard" class="artboard" ref="artboard"
      :class="{ 'is-sorting': $builder.isSorting, 'is-editable': $builder.isEditing }">
      <component v-for="section in $builder.sections" :is="section.name" :key="section.id" :id="section.id" />
    </div>

    <div class="controller">
      <div class="controller-intro" v-if="showIntro && !this.$builder.sections.length">
        <label for="projectName">چطوری؟ وقتشه سایت خودت رو بسازی</label>
        <input type="text" class="controller-input" id="projectName" placeholder="اسم سایتت چی باشه؟" v-model="title">
        <template v-if="themes">
          <div class="controller-themes">
            <button class="controller-theme font-vazir" v-for="theme in themes" :key="theme.id" @click="addTheme(theme)">
              {{ theme.name }}
            </button>
          </div>
        </template>
      </div>
      <div class="controller-panel" dir="ltr">
        <button class="controller-button green" tooltop-position="top" tooltip="export">
          <icons :name="'download'" />
        </button>
        <button class="controller-button red" v-if="!tempSections" @click="clearSections" tooltop-position="top" tooltip="clear sections">
          <icons name="trash" />
        </button>
        <button class="controller-button gray" v-if="tempSections" @click="undo" tooltop-position="top" tooltip="undo">
          <icons name="undo" />
        </button>
        <button class="controller-button blue" tooltop-position="top" tooltip="sorting">
          <icons name="sort" />
        </button>
        <button class="controller-button" :class="{ 'blue': !listShown, 'red': listShown, 'is-rotated': listShown }"
          tooltop-position="top" tooltip="add section" @click="newSection">
          <icons name="plus" />
        </button>
      </div>
    </div>

    <ul class="menu" :class="{ 'is-visiable': listShown }" ref="menu">
      <li class="menu-group" v-for="(group, name) in groups" :key="name">
        <div class="menu-header" @click="toggleGroupVisibility">
          <span class="menu-title">{{ name }}</span>
          <span class="menu-icon">
            <icons name="arrowDown" />
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
  </div>
</template>

<script>
import Sortable from 'Sortablejs';

import Icons from './Icons';

export default {
  components: { Icons },
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
  created() {
    this.$builder.set(this.data);
    this.title = this.$builder.title;
    this.themes = this.$builder.themes;
    this.generateGroups();
  },
  mounted() {
    this.$builder.rootEl = this.$refs.artboard;
    const groups = this.$refs.menu.querySelectorAll('.menu-body');
    const self = this;

    groups.forEach((group) => {
      Sortable.create(group, {
        group: {
          name: 'sections-group',
          put: false,
          pull: 'clone'
        },
        sort: false
      });
    });

    this.sortable = Sortable.create(this.$refs.artboard, {
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
        self.addSection(self.currentSection, evt.newIndex);
        evt.item.remove();
      },
      onUpdate(evt) {
        self.$builder.sort(evt.oldIndex, evt.newIndex);
      }
    });
  },
  updated() {
    if(this.$builder.scrolling) { this.$builder.scrolling(this.$refs.artboard); }
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
          schema: this.$builder.components[sec].$schema
        }
      });

      return sections;
    },
    clearSections() {
      this.tempSections = this.$builder.clear();
      console.log('clear', this.$builder.sections.length);
      setTimeout(() => {
        this.tempSections = null;
      }, 5000);
    },
    undo() {
      this.$builder.sections = this.tempSections;
      this.tempSections = null;
    },
    addTheme(theme) {
      this.$builder.set(theme);
    },
    generateGroups() {
      let groups = { random: [] };

      this.sections.forEach(section => {
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
      group.classList.toggle('is-visiable');
    },
    toggleListVisibility() {
      this.listShown = !this.listShown;
    },
    newSection() {
      // if (this.sections.length === 1) {
      //   this.addSection(this.sections[0]);
      //   return;
      // }

      this.toggleListVisibility();
    },
    addSection(section, position) {
      console.log(section);
      this.$builder.add(section, position);
      console.log('add', this.$builder.sections.length);
    }
  }
}
</script>

<style>
.artboard {
  transform-origin: top center;
}

.artboard.is-editable {
  outline: none;
}

.artboard.is-editable:hover {
  box-shadow: inset 0 0 0 2px #c1c1c1;
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

/* Panel Style */
.controller-panel {
  position: fixed;
  z-index: 200;
  bottom: 30px;
  right: 40px;
}

.controller-button {
  transition: 0.2s;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 5px;
  color: #fff;
  fill: #fff;
  font-size: 16px;
  margin-right: 20px;
}

.controller-button.is-rotated svg {
  transform: rotate(45deg);
}

.controller-button svg {
  transition: 0.2s;
}


.icons {
  display: block;
  width: 20px;
  height: 20px;
}

.menu {
  user-select: none;
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  width: 250px;
  background: #fff;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  list-style: none;
  transition: 0.4s;
  box-shadow: 1px 0 10px rgba(50, 60, 71, 0.2);
  transform: translate3d(-100%, 0, 0);
}

.menu.is-visiable {
  transform: translate3d(0, 0, 0);
}

.menu-body {
  display: none;
  padding: 0;
  margin: 0;
  list-style: none;
}

.menu-group .menu-body {
  width: 90%;
  margin: 10px auto;
}

.menu-group.is-visiable .menu-body {
  display: block
}

.menu-icon {
  width: 24px;
  height: 24px;
  fill: #c1c1c1;
  transition: 0.2s;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid rgba(50, 60, 71, 0.1);
}

.menu-element {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;
  border-radius: 5px;
  background: rgba(193, 193, 193, 1);
  transition: 0.3s;
  cursor: pointer;
  color: #fff;
  overflow: hidden;
  user-select: none;
}

a.menu-element:hover {
  color: #eb008b;
}

.menu-element:not(:last-child) {
  margin-bottom: 10px;
}

.menu-element:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.125), 0 10px 10px rgba(0, 0, 0, 0.1)
}

.menu-elementImage {
  max-width: 100%;
  pointer-events: none;
}

.menu-elementTitle {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  text-align: center;
  padding: 5px;
}



/* Colors Style */
.green {
  background-color: #18d88b;
}

.green:hover {
  background-color: #17c07d;
  cursor: pointer;
}

.red {
  background-color: #ff3d3d;
}

.red:hover {
  cursor: pointer;
  background-color: #d13232;
}

.gray {
  background-color: #c1c1c1;
}

.gray:hover {
  cursor: pointer;
  background-color: #b1b0b0;
}

.blue {
  background-color: #0072FF;
}

.blue:hover {
  cursor: pointer;
  background-color: #0464d8;
}
</style>