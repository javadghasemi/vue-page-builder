<script>
import {mapStores} from "pinia";
import {useSimpleStore} from "@/stores/simpleStore";

export default {
  props: ['data'],
  computed: {
    ...mapStores(useSimpleStore)
  },
  created() {
    console.log('000000000000000',this.data)
  }
}
</script>

<template>
  <h1>{{ this.data.title }}</h1>
</template>

<style scoped>

</style>