<script setup>
function onSave(output) {
  console.log(output);
}
</script>

<template>
  <builder @save="onSave" :data="[
      {group: 'Basic', name: 'Heading', data: {title: 'Javad'}},
      {group: 'Basic', name: 'Heading', data: {title: 'Ghasemi'}},
  ]"/>

<!--  <render :data="[-->
<!--      {group: 'Basic', name: 'Heading', data: {title: 'Javad'}},-->
<!--      {group: 'Basic', name: 'Heading', data: {title: 'Ghasemi'}},-->
<!--  ]"/>-->
</template>