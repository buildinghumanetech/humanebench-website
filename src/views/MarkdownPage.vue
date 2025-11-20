<template>
  <div class="pa-8">
    <v-container fluid class="mx-auto markdown-content">
      <div v-html="renderedMarkdown"></div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { marked } from 'marked';

export default defineComponent({
  name: 'MarkdownPage',

  props: {
    pageName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      renderedMarkdown: ''
    };
  },

  async mounted() {
    await this.loadMarkdown();
  },

  methods: {
    async loadMarkdown() {
      try {
        const response = await fetch(`/pages/${this.pageName}.md`);
        const markdown = await response.text();
        this.renderedMarkdown = await marked(markdown);
      } catch (error) {
        console.error('Error loading markdown:', error);
        this.renderedMarkdown = '<p>Error loading content</p>';
      }
    }
  }
});
</script>

<style scoped>
.markdown-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
}

.markdown-content :deep(h2) {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  margin-top: 1rem;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1rem;
  margin-left: 2rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.markdown-content :deep(a) {
  color: #1976d2;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(hr) {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #e0e0e0;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  color: #666;
  font-style: italic;
}

.markdown-content :deep(code) {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(em) {
  font-style: italic;
}
</style>
