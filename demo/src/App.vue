<script>
export default {
  data() {
    return {
      data: [{group: 'Basic', name: 'Heading', data: {title: 'Javad'}}]
    }
  },
  mounted() {
    setTimeout(() => {
      console.log('DDDD')
      this.data.push({group: 'Basic', name: 'Heading', data: {title: 'Javad'}});
      this.data.push({group: 'Basic', name: 'Heading', data: {title: 'Ghasemi'}});
    }, 2000);
  }
}
</script>

<template>
<!--    <builder @save="onSave" :data="data"/>-->

  <render :data="data"/>
</template>