<script>
export default {
  data: () => ({
    open: false
  }),
  props: ['title', 'editor'],
  emits: ['collapse', 'deleteElement'],
  methods: {
    collapse() {
      this.open = !this.open;
      console.log(this.open)
      this.$emit('collapse', this.open);
    },
    deleteEl() {
      this.$emit('deleteElement');
    }
  }
}
</script>

<template>
  <div class="el-d-flex" id="el-elements-group">
    <button class="elements-panel-heading elements-panel-category-title el-width-100" @click="collapse">
      <span class="elements-panel-heading-toggle">
        <i class="mdi mdi-triangle-down" :class="{'mdi-rotate-270': !open}"></i>
      </span>
      <span class="elements-panel-heading-title">{{ title }}</span>
    </button>
    <button v-if="editor" class="elements-panel-heading elements-panel-category-title" id="trash-btn" @click="deleteEl">
      <span>
        <i class="mdi mdi-delete"></i>
      </span>
    </button>
  </div>
</template>

<style scoped>
.elements-panel-heading {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 48px;
  padding-inline: 20px;
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

.collapse-icon {
  transform: rotate(120deg);
}

#trash-btn {
  padding: 5px;
  margin-left: 10px;
  height: 20%;
  margin-top: 12px;
  transition: 0.3s;

}

#trash-btn:hover {
  background-color: #3d4146;
}

#el-elements-group {
  transition: 0.3s;
}

#el-elements-group:hover {
  background-color: #2c2f33;
}
</style>