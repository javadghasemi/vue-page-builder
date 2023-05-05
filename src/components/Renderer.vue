<template>
  <div id="artboard" class="artboard font-vazir" dir="rtl">
    <component v-for="section in $builder.sections" :is="section.name" :key="section.id" :id="section.id"/>
  </div>
</template>

<script>
export default {
    name: 'Renderer',
    props: {
        data: {
            type: Object,
            default() {
                return {
                    title: '',
                    sections: []
                }
            }
        }
    },
    created() {
        console.log();
        this.$builder.set(this.data);
        this.$builder.isEditing.value = false;
        this.$builder.isRendered = true;
    }
}
</script>

<style>

</style>