<template>
  <v-card class="p-8 md:p-6 sm:p-4 mb-12 md:mb-8 shadow-md rounded-lg">
    <div v-for="(item, index) in news" :key="index" :class="{ 'mb-8': index < news.length - 1 }">
      <h3 class="text-2xl md:text-xl sm:text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap" :class="{ 'mt-0': index === 0 }">
        <v-icon size="28">mdi-newspaper</v-icon>
        {{ item.title }}
      </h3>
      <p class="text-base text-gray-700 mb-4">
        {{ item.description }}
      </p>
      <v-btn
        color="black"
        class="text-white text-none"
        rounded="lg"
        :href="item.link"
        target="_blank"
      >
        Read article
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface NewsItem {
  title: string;
  description: string;
  link: string;
}

export default defineComponent({
  name: 'News',

  props: {
    news: {
      type: Array as PropType<NewsItem[]>,
      required: true
    }
  }
});
</script>

