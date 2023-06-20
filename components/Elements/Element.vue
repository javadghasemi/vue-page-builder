<script>
export default {
  props: ['title', 'icon']
}
</script>

<template>
  <div class="elements-element-wrapper">
    <div class="elements-element">
      <div class="icon" v-html="icon">
      </div>
      <div class="title-wrapper">
        <div class="title">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.elements-panel .elements-element {
  text-align: center;
  border: 1px solid #333438;
  border-radius: 3px;
  cursor: move;
  position: relative;
  transition: all .3s;
  margin-top: 10px;
}

.elements-panel .elements-element:hover {
  background: rgb(100, 100, 100, 0.1);
}

.elements-panel .elements-element .icon {
  font-size: 28px;
  padding-top: 15px;
}

.elements-panel .elements-element .title-wrapper {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.elements-panel .elements-element .title {
  font-size: 13px;
}
</style>