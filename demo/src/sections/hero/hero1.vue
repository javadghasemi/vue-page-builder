<template>
  <section class="header">
    <div class="container">
      <div class="grid">
        <div class="column is-desktop-6 add0center-vertical">
          <h3 class="header-title" v-html="$sectionData.title" v-styler="$sectionData.title"></h3>
          <p class="header-content" v-html="$sectionData.content"></p>
          <a href="" class="button">

          </a>
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
    content: Types.Text
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created() {
    console.log('ssss', this.$sectionData);
  }
}
</script>

<style>

</style>