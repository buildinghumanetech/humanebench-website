<template>
  <div class="d-flex justify-center w-100">
    <div ref="svgContainer" class="w-100" v-html="svgContent"></div>
    <v-card v-if="tooltipVisible"
      class="position-fixed elevation-8 rounded-lg pa-4 bg-amber-lighten-5 bottom-[40px] right-[24px] w-[340px] z-[1000] pointer-events-none transition-opacity"
      :class="{ 'opacity-100': tooltipVisible, 'opacity-0': !tooltipVisible }">
      <h3 class="text-h6 font-weight-bold mb-3 mt-0">{{ popupData.name }}</h3>
      <p class="text-body-2 font-weight-medium mb-1" v-if="popupData.model">Model: {{ popupData.model }}</p>
      <p class="text-body-2 font-weight-medium mb-3" v-if="popupData.score">Score: {{ popupData.score }}</p>
      <p class="whitespace-pre-line">{{ popupData.detail }}</p>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from 'vue';

interface Principle {
  id: string;
  name: string;
  detail: string;
}

interface PopupData {
  name: string;
  detail: string;
  model: string;
  score: string;
}

export default defineComponent({
  name: 'ScoreGrid',

  props: {
    dataPath: {
      type: String,
      required: true
    },
    principles: {
      type: Array as PropType<Principle[]>,
      required: true
    }
  },

  data() {
    return {
      svgContent: '',
      tooltipVisible: false,
      popupData: { name: '', detail: '', model: '', score: '' } as PopupData,
      modelNameMap: {} as Record<string, string>
    };
  },

  watch: {
    dataPath: {
      immediate: true,
      handler() {
        this.loadSvg();
      }
    }
  },

  mounted() {
    this.loadModelMap();
  },

  methods: {
    async loadModelMap() {
      try {
        const response = await fetch('/figures/model_display_names.json');
        if (response.ok) {
          this.modelNameMap = await response.json();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load model name map', error);
      }
    },

    getModelName(key: string): string {
      if (key && this.modelNameMap[key]) return this.modelNameMap[key];
      if (!key) return '';
      return key.charAt(0).toUpperCase() + key.slice(1).replaceAll('-', ' ');
    },

    findPrinciple(id?: string) {
      return this.principles.find(p => p.id === id);
    },

    async loadSvg() {
      try {
        const response = await fetch(`/figures/scoregrid_${this.dataPath}.svg`);
        if (!response.ok) {
          throw new Error(`Failed to load SVG for ${this.dataPath}: ${response.statusText}`);
        }
        this.svgContent = await response.text();
        await nextTick();
        this.attachHoverHandlers();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        this.svgContent = '<p class="text-caption">Unable to load score grid.</p>';
      }
    },

    attachHoverHandlers() {
      const container = this.$refs.svgContainer as HTMLElement | undefined;
      if (!container) return;

      container.querySelectorAll<SVGRectElement>('rect.score-cell').forEach(rect => {
        const onEnter = () => this.showTooltip(rect);
        const onLeave = this.hideTooltip;

        rect.addEventListener('mouseenter', onEnter);
        rect.addEventListener('mouseleave', onLeave);

        // Also wire the text sibling so hovering the label shows the tooltip.
        const sibling = rect.nextElementSibling;
        if (sibling && sibling.tagName.toLowerCase() === 'text') {
          sibling.addEventListener('mouseenter', onEnter);
          sibling.addEventListener('mouseleave', onLeave);
        }
      });
    },

    showTooltip(rect: SVGRectElement) {
      const { principleId, score, model: modelKey } = rect.dataset;
      const principle = this.findPrinciple(principleId);
      const modelName = this.getModelName(modelKey || '');
      this.popupData = {
        name: principle?.name || principleId || '',
        detail: principle?.detail || '',
        model: modelName,
        score: score || ''
      };
      this.tooltipVisible = true;
    },

    hideTooltip() {
      this.tooltipVisible = false;
    }
  }
});
</script>
