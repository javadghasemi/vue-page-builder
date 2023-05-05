<template>
  <section class="header">
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500">
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3" v-html="$sectionData.title" v-styler:title="$sectionData.title"></h1>
          <p class="lead" v-html="$sectionData.content" v-styler:content="$sectionData.content"></p>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a type="button" class="btn btn-primary btn-lg px-4 me-md-2" v-styler:shopButton="$sectionData.shopButton" v-html="$sectionData.shopButton.text" :href="$sectionData.shopButton.href"/>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">دیدن محصول</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as Types from './../../../../src/Types';

export default {
  name: 'Hero1',
  cover: 'img/covers/hero1.png',
  group: 'hero',
  $schema: {
    title: Types.Title,
    content: Types.Text,
    classes: Types.ClassList,
    shopButton: Types.Button
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created() {
    console.log();
  }
}
</script>

<style>

</style>