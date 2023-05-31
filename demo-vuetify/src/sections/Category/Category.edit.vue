<template>
  <label for="">دسته بندی</label>
  <select class="input" @change="changeCategory">
    <option :name="key" v-for="(items, key) in this.categoryStore.getCategories">
      {{key}}
    </option>
  </select>
</template>

<script>
import axios from "axios";
import {mapStores} from "pinia";
import {useCategoryStore} from "@/stores/CategoryStore";

export default {
  data: () => ({
    categories: null
  }),
  computed: {
    ...mapStores(useCategoryStore)
  },
  mounted() {
    this.categoryStore.fetchCategories();
  },
  methods: {
    changeCategory(event) {

    }
  }
}
</script>