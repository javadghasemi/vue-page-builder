<script>
import {defineComponent} from 'vue'
import {mapStores} from "pinia";
import {useCategoryStore} from "@/stores/categoryStore";

export default {
  props: ['data'],
  computed: {
    ...mapStores(useCategoryStore)
  },
  mounted() {
    
  }
}
</script>

<template>
  <v-table theme="dark" height="300">
    <thead>
    <tr>
      <td class="text-right">
        ردیف
      </td>
      <th class="text-right">
        نام
      </th>
      <th class="text-right">
        قیمت
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Hello</td>
      <td>Javad</td>
      <td>Javad</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>