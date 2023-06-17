<script>
export default {
  data: () => ({
    open: false
  }),
  props: ['title'],
  emits: ['collapse'],
  methods: {
    collapse() {
      this.open = !this.open;
      this.$emit('collapse', this.open);
    }
  }
}
</script>

<template>
  <button class="elements-panel-heading elements-panel-category-title" @click="collapse">
    <span class="elements-panel-heading-toggle">
      <i class="mdi mdi-triangle-down" :class="{'collapse': !open}"></i>
    </span>
    <span class="elements-panel-heading-title">{{ title }}</span>
  </button>
</template>

<style scoped>
.elements-panel-heading {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 48px;
  padding-inline: 20px;
  width: 100%;
  cursor: pointer;
}

.elements-panel-heading-toggle {
  width: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 8px;
}

.elements-panel-heading-title {
  font-weight: 700;
}

.elements-panel-heading {
  padding: 15px;
  border: none;
  background-color: transparent;
  color: white;
}

.collapse {
  transform: rotate(30deg);
}

</style>