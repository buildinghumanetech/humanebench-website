<template>
  <div class="position-relative">
    <!-- Left Arrow -->
    <v-btn
      v-if="showLeftArrow"
      icon
      class="position-absolute z-10 elevation-2"
      style="left: -56px; top: 50%; transform: translateY(-50%); background-color: #262626;"
      @click="scrollLeft"
    >
      <v-icon color="white">mdi-chevron-left</v-icon>
    </v-btn>

    <!-- Right Arrow -->
    <v-btn
      v-if="showRightArrow"
      icon
      class="position-absolute z-10 elevation-2"
      style="right: -56px; top: 50%; transform: translateY(-50%); background-color: #262626;"
      @click="scrollRight"
    >
      <v-icon color="white">mdi-chevron-right</v-icon>
    </v-btn>

    <!-- Scroll Container -->
    <div
      ref="scrollContainer"
      class="overflow-x-auto snap-x snap-mandatory flex pb-4"
      @scroll="updateArrows"
    >
      <div
        v-for="(panel, index) in panels"
        :key="index"
        class="snap-center flex-shrink-0 w-full"
      >
        <h3 class="text-h5 font-weight-bold mb-3">
          <a
            v-if="panel.link"
            :href="panel.link"
            target="_blank"
            rel="noopener noreferrer"
            class="panel-title-link"
          >{{ panel.title }}</a>
          <template v-else>{{ panel.title }}</template>
        </h3>
        <p class="text-body-2 text-grey-darken-2 mb-4" v-html="md(panel.description)"></p>
        <ScoreGrid :data-path="panel.dataPath" :principles="principles" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { marked } from 'marked';
import ScoreGrid from '@/components/ScoreGrid.vue';
import { PRINCIPLES } from '@/constants/principles';

interface Panel {
  title: string;
  description: string;
  dataPath: string;
  link?: string;
}

export default defineComponent({
  name: 'ScoreCarousel',

  components: {
    ScoreGrid
  },

  props: {
    panels: {
      type: Array as PropType<Panel[]>,
      required: true
    }
  },

  data() {
    return {
      principles: PRINCIPLES,
      showLeftArrow: false,
      showRightArrow: true
    };
  },

  mounted() {
    this.updateArrows();
  },

  methods: {
    md(input: string): string {
      const html = marked(input) as string;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
      return doc.body.innerHTML;
    },

    scrollLeft() {
      const container = this.$refs.scrollContainer as HTMLElement;
      if (container) {
        container.scrollBy({
          left: -container.clientWidth,
          behavior: 'smooth'
        });
      }
    },

    scrollRight() {
      const container = this.$refs.scrollContainer as HTMLElement;
      if (container) {
        container.scrollBy({
          left: container.clientWidth,
          behavior: 'smooth'
        });
      }
    },

    updateArrows() {
      const container = this.$refs.scrollContainer as HTMLElement;
      if (!container) return;

      // Show left arrow if not at the start
      this.showLeftArrow = container.scrollLeft > 10;

      // Show right arrow if not at the end
      const maxScroll = container.scrollWidth - container.clientWidth;
      this.showRightArrow = container.scrollLeft < maxScroll - 10;
    }
  }
});
</script>

<style scoped>
.panel-title-link {
  color: #5539EC;
  text-decoration: none;
}

.panel-title-link:hover {
  text-decoration: underline;
}
</style>
