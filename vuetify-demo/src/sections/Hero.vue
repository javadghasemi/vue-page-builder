<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          >
            <v-card-title>{{$sectionData.title}}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            Number 10
          </v-card-subtitle>

          <v-card-text>
            {{ $sectionData.content }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            Number 10
          </v-card-subtitle>

          <v-card-text>
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            Number 10
          </v-card-subtitle>

          <v-card-text>
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import * as Types from "../../../src/Types";

export default {
  name: 'Hero1',
  cover: 'src/assets/img/covers/hero1.png',
  group: 'hero',
  $schema: {
    title: Types.Title,
    content: Types.Text,
  },
  editorNames: {
    title: 'سربرگ',
    content: 'متن',
    shopButton: 'دکمه فروشگاه'
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  }
};
</script>
