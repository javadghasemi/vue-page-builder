<script>
import {mapStores} from "pinia";
import {useSimpleStore} from "@/stores/simpleStore";

export default {
  props: ['data'],
  computed: {
    ...mapStores(useSimpleStore)
  },
  created() {
    console.log('===>>>', this.data)
  }
}
</script>

<template>
  <div class="element-control-field">
    <label for="title">Title</label>
    <input id="title" type="text" class="element-editor-input" v-model="this.data.title">
  </div>
</template>
