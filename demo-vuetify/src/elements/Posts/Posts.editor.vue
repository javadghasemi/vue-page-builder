<script>
import {mapStores} from "pinia";
import {useCategoryStore} from "@/stores/categoryStore";

export default {
  props: ['data'],
  data() {
    return {
      selectedCategory: ''
    }
  },
  computed: {
    ...mapStores(useCategoryStore)
  },
  mounted() {
    this.categoryStore.fetchCategories();
  },
  methods: {
    changeCategory(event) {
      this.data.category = event.target.value;
    }
  },
  watch: {
    selectedCategory(newVal) {
      this.category = newVal;
    }
  }
}
</script>

<template>
  <div class="element-control-field">
    <label for="title" class="element-control-title">Category</label>
    <select class="element-editor-input" @click="changeCategory">
      <option :name="key" :value="key" v-for="(items, key) in this.categoryStore.getCategories">
        {{ key }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>