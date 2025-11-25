<template>
  <v-card class="p-8 md:p-6 sm:p-4 mb-12 md:mb-8 shadow-md rounded-lg">
    <div v-for="(article, index) in articles" :key="index" :class="{ 'mb-8': index < articles.length - 1 }">
      <h3 class="text-2xl md:text-xl sm:text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap" :class="{ 'mt-0': index === 0 }">
        <v-icon size="28">mdi-newspaper</v-icon>
        <a :href="article.link" target="_blank" rel="noopener noreferrer" class="text-black hover:underline">
          {{ article.title }}
        </a>
      </h3>
      <p class="text-base text-gray-700 mb-2">
        {{ article.publication }} — {{ article.date }}
      </p>
      <p v-if="article.description" class="text-base text-gray-600">
        {{ article.description }}
      </p>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Article {
  title: string;
  publication: string;
  date: string;
  link: string;
  description?: string;
}

export default defineComponent({
  name: 'News',

  props: {
    articles: {
      type: Array as PropType<Article[]>,
      required: true
    }
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}
</style>

