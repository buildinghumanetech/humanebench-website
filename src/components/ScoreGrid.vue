<template>
  <div class="overflow-x-auto">
    <div class="d-flex flex-column ga-1">
      <div v-for="(modelData, modelName) in models" :key="modelName" class="d-flex ga-1">
        <div class="font-weight-medium pa-2 text-body-2 bg-transparent w-[180px] flex-shrink-0 d-flex align-center">
          {{ getModelName(modelName) }}
        </div>
        <div v-for="(score, index) in getScores(modelData)" :key="index"
             class="w-[80px] flex-shrink-0">
          <div :style="getScoreColor(score)"
            class="pa-2 rounded-lg d-flex align-center justify-center font-weight-bold text-caption h-100 cursor-pointer opacity-100 hover:opacity-80 transition-opacity"
            @mouseenter="showTooltip(principles[index].name)"
            @mouseleave="hideTooltip">
            {{ formatScore(score) }}
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex ga-1 position-relative mt-2 ml-[140px] h-[150px]">
      <div v-for="category in principles" :key="category.id"
        class="position-relative flex-shrink-0 w-[80px]">
        <div class="text-caption font-weight-medium position-absolute right-0 whitespace-nowrap rotate-label">
          {{ category.name }}
        </div>
      </div>
    </div>

    <v-card v-if="tooltipVisible"
      class="position-fixed elevation-8 rounded-lg pa-4 bg-amber-lighten-5 bottom-[40px] right-[24px] w-[340px] z-[1000] pointer-events-none transition-opacity"
      :class="{ 'opacity-100': tooltipVisible, 'opacity-0': !tooltipVisible }">
      <h3 class="text-h6 font-weight-bold mb-3">{{ popupData.name }}</h3>
      <p class="whitespace-pre-line">{{ popupData.detail }}</p>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Principle {
  id: string;
  name: string;
  detail: string;
}

interface Metric {
  value: number;
}

interface ModelMetrics {
  [key: string]: Metric | undefined;
  HumaneScore?: Metric;
}

interface PopupData {
  name: string;
  detail: string;
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
      tooltipVisible: false,
      popupData: { name: '', detail: '' } as PopupData,
      models: {} as Record<string, ModelMetrics>,
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      const context = require.context('../eval_results', true, /header\.json$/);
      context.keys().forEach((filePath: string) => {
        if (filePath.startsWith(`./${this.dataPath}/`)) {
          const parts = filePath.split('/');
          const modelName = parts[2];
          const data = context(filePath);
          this.models[modelName] = data.results.scores[0].metrics as ModelMetrics;
        }
      });
    },

    getScores(modelData: ModelMetrics): number[] {
      return this.principles.map(p => modelData[p.id]?.value ?? 0);
    },

    getModelName(key: string): string {
      return key.charAt(0).toUpperCase() + key.slice(1).replaceAll('-', ' ');
    },

    formatScore(score: number): string {
      return score.toFixed(2);
    },

    getScoreColor(score: number): { backgroundColor: string; color: string } {
      const clampedScore = Math.max(-1, Math.min(1, score));

      const pink = { r: 0xE5, g: 0x1A, b: 0x62 };
      const yellow = { r: 0xCE, g: 0xD9, b: 0x26 };
      const green = { r: 0x40, g: 0xBF, b: 0x4F };

      let r: number, g: number, b: number;

      if (clampedScore < 0) {
        const t = (clampedScore + 1);
        r = Math.round(pink.r + (yellow.r - pink.r) * t);
        g = Math.round(pink.g + (yellow.g - pink.g) * t);
        b = Math.round(pink.b + (yellow.b - pink.b) * t);
      } else {
        const t = clampedScore;
        r = Math.round(yellow.r + (green.r - yellow.r) * t);
        g = Math.round(yellow.g + (green.g - yellow.g) * t);
        b = Math.round(yellow.b + (green.b - yellow.b) * t);
      }

      const backgroundColor = `rgb(${r}, ${g}, ${b})`;
      const color = 'black';

      return { backgroundColor, color };
    },

    showTooltip(hoveredPrinciple: string) {
      const principle = this.principles.find(p => p.name === hoveredPrinciple);
      this.popupData = {
        name: principle?.name ?? '',
        detail: principle?.detail ?? ''
      };
      this.tooltipVisible = true;
    },

    hideTooltip() {
      this.tooltipVisible = false;
    }
  }
});
</script>
