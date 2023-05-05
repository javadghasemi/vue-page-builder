<script setup>
function onSave(builder) {
  console.log(builder.export('json'));
}
</script>

<template>
  <page-builder @saved="onSave"/>
</template>

<style scoped>
</style>
