<template>
  <div class="pa-8">
    <v-container fluid class="mx-auto markdown-content">
      <div ref="markdownContainer" v-html="renderedMarkdown"></div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, createApp, nextTick } from 'vue';
import { marked } from 'marked';
import ScoreGrid from '@/components/ScoreGrid.vue';
import { PRINCIPLES } from '@/constants/principles';

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
      renderedMarkdown: '',
      componentInstances: [] as Array<{ unmount: () => void }>
    };
  },

  async mounted() {
    await this.loadMarkdown();
  },

  beforeUnmount() {
    // Cleanup mounted component instances
    this.cleanupComponents();
  },

  watch: {
    '$route': {
      async handler() {
        await this.loadMarkdown();
      }
    }
  },

  methods: {
    cleanupComponents() {
      this.componentInstances.forEach(instance => {
        instance.unmount();
      });
      this.componentInstances = [];
    },

    async loadMarkdown() {
      try {
        // Cleanup any existing component instances first
        this.cleanupComponents();

        const response = await fetch(`/pages/${this.pageName}.md`);
        const markdown = await response.text();
        this.renderedMarkdown = await marked(markdown);

        // Wait for DOM to update, then mount Vue components
        await nextTick();
        this.mountComponents();
      } catch (error) {
        console.error('Error loading markdown:', error);
        this.renderedMarkdown = '<p>Error loading content</p>';
      }
    },

    mountComponents() {
      const container = this.$refs.markdownContainer as HTMLElement;
      if (!container) return;

      // Find all elements with data-component attribute
      const componentPlaceholders = container.querySelectorAll('[data-component]');

      componentPlaceholders.forEach((element) => {
        const componentName = element.getAttribute('data-component');

        if (componentName === 'ScoreGrid') {
          const dataPath = element.getAttribute('data-path');

          // Create a Vue app instance for this component
          const app = createApp(ScoreGrid, {
            dataPath,
            principles: PRINCIPLES
          });

          // Mount it to the placeholder element
          app.mount(element);

          // Store the instance for cleanup
          this.componentInstances.push(app);
        }
      });
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
  color: #5539EC;
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
