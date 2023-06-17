<script>
import {mapStores} from "pinia";
import {useSimpleStore} from "@/stores/simpleStore";

export default {
  computed: {
    ...mapStores(useSimpleStore)
  },
  created() {
    console.log('===>>>', this.simpleStore)
  }
}
</script>

<template>
  <div class="element-control-field">
    <label for="title">Title</label>
    <input id="title" type="text" class="element-editor-input" v-model="this.simpleStore.heading">
  </div>
</template>
