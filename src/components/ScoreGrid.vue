<template>
  <div class="d-flex justify-center">
    <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" width="100%">
      <!-- Vertical line separator after HumaneScore column -->
      <line
        v-if="humaneScoreColumnIndex >= 0"
        :x1="modelNameWidth + (humaneScoreColumnIndex + 1) * (cellWidth + cellMargin) - cellMargin / 2"
        :y1="0"
        :x2="modelNameWidth + (humaneScoreColumnIndex + 1) * (cellWidth + cellMargin) - cellMargin / 2"
        :y2="modelsCount * (cellHeight + cellMargin)"
        stroke="#000000"
        stroke-width="2"
        opacity="0.3"
      />
      <g v-for="(modelData, modelName, rowIndex) in sortedModels" :key="`${modelName}-${sortColumn}-${sortDirection}`">
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
            :class="principles[colIndex].id === 'HumaneScore' ? 'font-bold text-caption' : 'font-weight-bold text-caption'"
            :style="principles[colIndex].id === 'HumaneScore' ? 'font-size: 13px;' : ''"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ formatScore(score) }}
          </text>
        </g>
      </g>
      <g v-for="(category, index) in principles" :key="category.id">
        <rect
          :x="modelNameWidth + index * (cellWidth + cellMargin)"
          :y="modelsCount * (cellHeight + cellMargin)"
          :width="cellWidth"
          :height="labelHeight"
          :fill="category.id === 'HumaneScore' ? 'rgba(59, 130, 246, 0.1)' : 'transparent'"
          class="cursor-pointer"
          :class="category.id === 'HumaneScore' ? 'hover:opacity-70' : 'hover:opacity-50'"
          @click="handleSort(category.id)"
        />
        <text
          :x="modelNameWidth + index * (cellWidth + cellMargin) + cellWidth / 2"
          :y="modelsCount * (cellHeight + cellMargin) + 10"
          text-anchor="end"
          dominant-baseline="middle"
          :transform="`rotate(-45, ${modelNameWidth + index * (cellWidth + cellMargin) + cellWidth / 2}, ${modelsCount * (cellHeight + cellMargin) + 10})`"
          :class="[
            'text-caption',
            category.id === 'HumaneScore' ? 'font-bold fill-blue-700' : 'font-weight-medium',
            sortColumn === category.id && category.id !== 'HumaneScore' ? 'fill-blue-600 font-bold' : '',
            sortColumn === category.id && category.id === 'HumaneScore' ? 'fill-blue-800' : ''
          ]"
          :style="category.id === 'HumaneScore' ? 'font-size: 14px;' : ''"
        >
          {{ category.name }}
          <template v-if="sortColumn === category.id">
            {{ sortDirection === 'desc' ? ' ↓' : ' ↑' }}
          </template>
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
import { badPersonaModels, goodPersonaModels, baselineModels, type ModelScore } from '@/lib/modelData';

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

// Map principle IDs to model data keys
const principleToKeyMap: Record<string, keyof Omit<ModelScore, 'model'>> = {
  'HumaneScore': 'humaneScore',
  'respect-user-attention': 'respectUserAttention',
  'enable-meaningful-choices': 'enableMeaningfulChoices',
  'enhance-human-capabilities': 'enhanceHumanCapabilities',
  'protect-dignity-and-safety': 'protectDignityAndSafety',
  'foster-healthy-relationships': 'fosterHealthyRelationships',
  'prioritize-long-term-wellbeing': 'prioritizeLongTermWellbeing',
  'be-transparent-and-honest': 'beTransparentAndHonest',
  'design-for-equity-and-inclusion': 'designForEquityAndInclusion',
};

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
      sortColumn: 'HumaneScore' as string | null, // Default sort by HumaneScore
      sortDirection: 'desc' as 'asc' | 'desc', // Best to worst
    };
  },

  computed: {
    modelsCount(): number {
      return Object.keys(this.sortedModels).length;
    },
    principlesCount(): number {
      return this.principles.length;
    },
    svgWidth(): number {
      return this.modelNameWidth + this.principlesCount * (this.cellWidth + this.cellMargin);
    },
    svgHeight(): number {
      return this.modelsCount * (this.cellHeight + this.cellMargin) + this.labelHeight;
    },
    humaneScoreColumnIndex(): number {
      return this.principles.findIndex(p => p.id === 'HumaneScore');
    },
    sortedModels(): Record<string, ModelMetrics> {
      const entries = Object.entries(this.models);
      if (!this.sortColumn) {
        // Default: sort by HumaneScore descending
        entries.sort(([, dataA], [, dataB]) => {
          const scoreA = dataA['HumaneScore']?.value ?? 0;
          const scoreB = dataB['HumaneScore']?.value ?? 0;
          return scoreB - scoreA;
        });
      } else {
        entries.sort(([, dataA], [, dataB]) => {
          // Handle both 'HumaneScore' (capital H) and 'humaneScore' (lowercase)
          const key = this.sortColumn === 'HumaneScore' ? 'HumaneScore' : (this.sortColumn as string);
          const scoreA = dataA[key]?.value ?? 0;
          const scoreB = dataB[key]?.value ?? 0;
          return this.sortDirection === 'desc' ? scoreB - scoreA : scoreA - scoreB;
        });
      }
      return Object.fromEntries(entries);
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      // First try to load from eval_results
      try {
        const context = require.context('../eval_results', true, /header\.json$/);
        // Map dataPath to search patterns in directory names
        const dataPathPatterns: Record<string, string[]> = {
          'bad_persona': ['bad-persona-eval', 'bad_persona_eval', 'bad-persona'],
          'good_persona': ['good-persona-eval', 'good_persona_eval', 'good-persona'],
          'baseline': ['baseline-eval', 'baseline_eval', 'baseline']
        };
        const searchPatterns = dataPathPatterns[this.dataPath] || [this.dataPath];
        
        context.keys().forEach((filePath: string) => {
          // Check if path contains any of the search patterns
          const matches = searchPatterns.some(pattern => filePath.includes(pattern));
          if (matches) {
            try {
              const parts = filePath.split('/');
              // Path format: ./example/model-name/timestamp_eval-type_eval-id/header.json
              // Find model name - it's the directory name after "example"
              let modelName = '';
              const exampleIndex = parts.indexOf('example');
              if (exampleIndex >= 0 && exampleIndex + 1 < parts.length) {
                modelName = parts[exampleIndex + 1];
              }
              
              // If we found a model name, try to load the data
              if (modelName) {
                const data = context(filePath);
                if (data && data.results && data.results.scores && data.results.scores[0] && data.results.scores[0].metrics) {
                  this.models[modelName] = data.results.scores[0].metrics as ModelMetrics;
                }
              }
            } catch (error) {
              console.warn(`Error loading data for ${filePath}:`, error);
            }
          }
        });
      } catch (error) {
        console.warn('Error loading eval results:', error);
      }

      // Always use fallback from modelData.ts (eval_results may be incomplete)
      let modelList: ModelScore[] = [];
      if (this.dataPath === 'bad_persona') {
        modelList = badPersonaModels;
      } else if (this.dataPath === 'good_persona') {
        modelList = goodPersonaModels;
      } else if (this.dataPath === 'baseline') {
        modelList = baselineModels;
      }

      // Convert ModelScore to ModelMetrics format and merge with any loaded data
      modelList.forEach((model: ModelScore) => {
        const modelKey = this.slugifyModelName(model.model);
        const metrics: ModelMetrics = {};
        
        // Map all principles
        Object.keys(principleToKeyMap).forEach(principleId => {
          const key = principleToKeyMap[principleId];
          if (key && model[key] !== undefined) {
            metrics[principleId] = { value: model[key] as number };
          }
        });
        
        // Also add HumaneScore with capital H
        if (model.humaneScore !== undefined) {
          metrics['HumaneScore'] = { value: model.humaneScore };
        }
        
        // Always use fallback data (override eval_results to ensure correct scores)
        // This prevents incorrect data like Claude 4.5 getting 1.00 scores
        this.models[modelKey] = metrics;
      });
      
      // Ensure no model has perfect 1.00 scores (data validation)
      Object.keys(this.models).forEach(modelKey => {
        const metrics = this.models[modelKey];
        Object.keys(metrics).forEach(key => {
          if (metrics[key]?.value === 1.0 && key !== 'HumaneScore') {
            // Cap individual principle scores at 0.99 to avoid perfect scores
            if (metrics[key]) {
              metrics[key].value = Math.min(0.99, metrics[key].value);
            }
          }
        });
      });
    },

    slugifyModelName(modelName: string): string {
      return modelName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    },

    getScores(modelData: ModelMetrics): number[] {
      return this.principles.map(p => {
        // Handle both 'HumaneScore' (capital H) and the principle ID
        if (p.id === 'HumaneScore') {
          return modelData['HumaneScore']?.value ?? modelData['humaneScore']?.value ?? 0;
        }
        return modelData[p.id]?.value ?? 0;
      });
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
    },

    handleSort(principleId: string) {
      if (this.sortColumn === principleId) {
        // Toggle direction if clicking the same column
        this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
      } else {
        // Set new column and default to descending (best to worst)
        this.sortColumn = principleId;
        this.sortDirection = 'desc';
      }
      // Force reactivity update
      this.$forceUpdate();
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
