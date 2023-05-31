<template>
  <v-container>
    <v-row>
      <v-col>
        <v-locale-provider rtl>
          <v-table>
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
            <tr class="text-right"
                v-for="item in this.categories['mobile']"
                :key="item.id"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
            </tr>
            </tbody>
          </v-table>
        </v-locale-provider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Title} from '../../../../src/Types';
import Editor from './Category.edit.vue';

export default {
  $schema: {
    category: Title
  },
  group: 'categories',
  editor: Editor,
  editorNames: {
    category: 'دسته بندی',
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      categories: {
        mobile: [
          {
            id: 1,
            name: 'گوشی iphone 13',
            price: '40'
          },
          {
            id: 2,
            name: 'گوشی A12',
            price: '12'
          },
        ],
        laptop: [
          {
            id: 1,
            name: 'لپ تاپ asus rog',
            price: '60'
          },
          {
            id: 2,
            name: 'لپ تاپ asus tuf',
            price: '40'
          },
        ]
      }
    }
  },
  created() {
  },
}
</script>


<style scoped>

</style>