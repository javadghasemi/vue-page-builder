<script>
import {mapStores} from "pinia";
import {useSimpleStore} from "@/stores/simpleStore";

export default {
  computed: {
    ...mapStores(useSimpleStore)
  },
}
</script>

<template>
  <h1>{{ simpleStore.getHeading }}</h1>
</template>

<style scoped>

</style>