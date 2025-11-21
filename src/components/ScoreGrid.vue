<template>
  <div class="d-flex justify-center">
    <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
      <g v-for="(modelData, modelName, rowIndex) in models" :key="modelName">
        <text :x="0" :y="rowIndex * (cellHeight + cellMargin) + cellHeight / 2" class="font-weight-medium text-caption" dominant-baseline="middle">{{ getModelName(modelName) }}</text>
        <g v-for="(score, colIndex) in getScores(modelData)" :key="colIndex">
          <rect
            :x="modelNameWidth + colIndex * (cellWidth + cellMargin)"
            :y="rowIndex * (cellHeight + cellMargin)"
            :width="cellWidth"
            :height="cellHeight"
            :fill="getScoreColor(score).backgroundColor"
            rx="8" ry="8"
            class="cursor-pointer opacity-100 hover:opacity-80 transition-opacity"
            @mouseenter="showTooltip(principles[colIndex].name)"
            @mouseleave="hideTooltip"
          />
          <text
            :x="modelNameWidth + colIndex * (cellWidth + cellMargin) + cellWidth / 2"
            :y="rowIndex * (cellHeight + cellMargin) + cellHeight / 2"
            class="font-weight-bold text-caption"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ formatScore(score) }}
          </text>
        </g>
      </g>
      <g v-for="(category, index) in principles" :key="category.id">
        <text
          :x="modelNameWidth + index * (cellWidth + cellMargin) + cellWidth / 2"
          :y="modelsCount * (cellHeight + cellMargin) + 10"
          text-anchor="end"
          dominant-baseline="middle"
          :transform="`rotate(-45, ${modelNameWidth + index * (cellWidth + cellMargin) + cellWidth / 2}, ${modelsCount * (cellHeight + cellMargin) + 10})`"
          class="text-caption font-weight-medium"
        >
          {{ category.name }}
        </text>
      </g>
    </svg>
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
      modelNameWidth: 180,
      cellWidth: 80,
      cellHeight: 30,
      cellMargin: 4,
      labelHeight: 150,
    };
  },

  computed: {
    modelsCount(): number {
      return Object.keys(this.models).length;
    },
    principlesCount(): number {
      return this.principles.length;
    },
    svgWidth(): number {
      return this.modelNameWidth + this.principlesCount * (this.cellWidth + this.cellMargin);
    },
    svgHeight(): number {
      return this.modelsCount * (this.cellHeight + this.cellMargin) + this.labelHeight;
    }
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
      const modelNameMap: Record<string, string> = {
        'claude-4.5': 'Claude 4.5',
        'claude-opus-4.1': 'Claude Opus 4.1',
        'claude-sonnet-4': 'Claude Sonnet 4',
        'claude-sonnet-4.5': 'Claude Sonnet 4.5',
        'deepseek-v3.1-terminus': 'DeepSeek V3.1 Terminus',
        'gemini-2.0-flash-001': 'Gemini 2.0 Flash 001',
        'gemini-2.5': 'Gemini 2.5',
        'gemini-2.5-flash': 'Gemini 2.5 Flash',
        'gemini-2.5-pro': 'Gemini 2.5 Pro',
        'gemini-3-pro-preview': 'Gemini 3 Pro Preview',
        'gpt-4.1': 'GPT-4.1',
        'gpt-4o': 'GPT-4o',
        'gpt-4o-2024-11-20': 'GPT-4o (2024-11-20)',
        'gpt-5': 'GPT-5',
        'grok-4': 'Grok 4',
        'llama-3.1-405b-instruct': 'LLaMA 3.1 405B Instruct',
        'llama-4-maverick': 'LLaMA 4 Maverick',
      };

      return modelNameMap[key] || key.charAt(0).toUpperCase() + key.slice(1).replaceAll('-', ' ');
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
<style scoped>
.rotate-label {
  transform: rotate(-45deg);
  transform-origin: bottom right;
}
</style>
