<template>

  <v-app>
    <v-main>
<!--      <hero />-->
      <page-builder @saved="onSave"/>

    </v-main>
  </v-app>
</template>

<script setup>
  import hero from "@/sections/Hero.vue";
  function onSave(builder) {
    console.log(builder.export('json'));
  }
</script>
