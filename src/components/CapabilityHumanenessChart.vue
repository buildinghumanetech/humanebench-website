<template>
  <div class="capability-humaneness-chart">
    <div class="mb-6">
      <h2 class="text-h4 font-weight-bold mb-2">Capability vs. Humaneness: The Data Shows They Go Together</h2>
      <p class="text-body-1 mb-4">
        There's a common belief that prioritizing human wellbeing means sacrificing capability. 
        <strong>The data proves otherwise:</strong> The newest, most capable models are also the most humane.
      </p>
      <div class="bg-blue-50 border-l-4 border-blue-600 pa-4 rounded-r-lg mb-4">
        <p class="text-body-2 mb-2">
          <strong>Correlation Coefficient: {{ correlation.toFixed(3) }}</strong>
        </p>
        <p class="text-body-2">
          This strong positive correlation (r = {{ correlation.toFixed(3) }}) shows that more capable models 
          consistently score higher on humane principles. The top performers on standard benchmarks (MMLU, GPQA, HumanEval) 
          are also the top performers on HumaneBench.
        </p>
      </div>
    </div>

    <div class="chart-container">
      <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" width="100%" class="chart-svg">
        <!-- Grid lines -->
        <g class="grid-lines">
          <line
            v-for="i in 5"
            :key="`h-${i}`"
            :x1="padding"
            :y1="padding + (i - 1) * (chartHeight / 4)"
            :x2="svgWidth - padding"
            :y2="padding + (i - 1) * (chartHeight / 4)"
            stroke="#e0e0e0"
            stroke-width="1"
            stroke-dasharray="2,2"
          />
          <line
            v-for="i in 5"
            :key="`v-${i}`"
            :x1="padding + (i - 1) * (chartWidth / 4)"
            :y1="padding"
            :x2="padding + (i - 1) * (chartWidth / 4)"
            :y2="svgHeight - padding"
            stroke="#e0e0e0"
            stroke-width="1"
            stroke-dasharray="2,2"
          />
        </g>

        <!-- Trend line -->
        <line
          :x1="padding"
          :y1="getY(0)"
          :x2="svgWidth - padding"
          :y2="getY(1)"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-dasharray="4,4"
          opacity="0.5"
        />

        <!-- Data points -->
        <g class="data-points">
          <g
            v-for="model in sortedModels"
            :key="model.model"
            class="data-point"
            @mouseenter="showTooltip(model, $event)"
            @mouseleave="hideTooltip"
          >
            <circle
              :cx="getX(model.averageCapability)"
              :cy="getY(model.humaneScore)"
              :r="8"
              :fill="getPointColor(model.humaneScore)"
              :stroke="getPointColor(model.humaneScore)"
              stroke-width="2"
              class="cursor-pointer"
              :class="{ 'hover:opacity-80': true }"
            />
            <text
              v-if="model.humaneScore > 0.7 || model.averageCapability > 75"
              :x="getX(model.averageCapability)"
              :y="getY(model.humaneScore) - 12"
              text-anchor="middle"
              class="text-caption font-weight-medium"
              :fill="getPointColor(model.humaneScore)"
            >
              {{ getShortModelName(model.model) }}
            </text>
          </g>
        </g>

        <!-- Axes -->
        <g class="axes">
          <!-- X-axis -->
          <line
            :x1="padding"
            :y1="svgHeight - padding"
            :x2="svgWidth - padding"
            :y2="svgHeight - padding"
            stroke="#333"
            stroke-width="2"
          />
          <!-- Y-axis -->
          <line
            :x1="padding"
            :y1="padding"
            :x2="padding"
            :y2="svgHeight - padding"
            stroke="#333"
            stroke-width="2"
          />
        </g>

        <!-- Axis labels -->
        <g class="axis-labels">
          <!-- X-axis labels -->
          <text
            v-for="i in 5"
            :key="`x-label-${i}`"
            :x="padding + (i - 1) * (chartWidth / 4)"
            :y="svgHeight - padding + 20"
            text-anchor="middle"
            class="text-caption font-weight-medium"
          >
            {{ Math.round(minCapability + (i - 1) * (maxCapability - minCapability) / 4) }}
          </text>
          <!-- Y-axis labels -->
          <text
            v-for="i in 5"
            :key="`y-label-${i}`"
            :x="padding - 10"
            :y="padding + (i - 1) * (chartHeight / 4) + 4"
            text-anchor="end"
            class="text-caption font-weight-medium"
          >
            {{ (1 - (i - 1) * 0.25).toFixed(2) }}
          </text>
        </g>

        <!-- Axis titles -->
        <text
          :x="svgWidth / 2"
          :y="svgHeight - 10"
          text-anchor="middle"
          class="text-body-2 font-weight-bold"
        >
          Average Capability Score (MMLU, GPQA, HumanEval)
        </text>
        <text
          :x="20"
          :y="svgHeight / 2"
          text-anchor="middle"
          class="text-body-2 font-weight-bold"
          :transform="`rotate(-90, 20, ${svgHeight / 2})`"
        >
          HumaneScore
        </text>
      </svg>
    </div>

    <!-- Tooltip -->
    <v-card
      v-if="tooltipVisible && tooltipData"
      class="position-fixed elevation-8 rounded-lg pa-4 bg-white"
      :style="tooltipStyle"
    >
      <h3 class="text-h6 font-weight-bold mb-2">{{ tooltipData.model }}</h3>
      <div class="text-body-2">
        <p><strong>HumaneScore:</strong> {{ tooltipData.humaneScore.toFixed(2) }}</p>
        <p><strong>Average Capability:</strong> {{ tooltipData.averageCapability.toFixed(1) }}</p>
        <p class="mt-2"><strong>MMLU:</strong> {{ tooltipData.mmlu.toFixed(1) }}</p>
        <p><strong>GPQA:</strong> {{ tooltipData.gpqa.toFixed(1) }}</p>
        <p><strong>HumanEval:</strong> {{ tooltipData.humanEval.toFixed(1) }}</p>
      </div>
    </v-card>

    <!-- Key insights -->
    <div class="mt-8">
      <h3 class="text-h5 font-weight-bold mb-4">Key Insights</h3>
      <div class="row">
        <div class="col-md-6 mb-4">
          <v-card class="pa-4" elevation="2">
            <h4 class="text-h6 font-weight-bold mb-2">Top Performers</h4>
            <p class="text-body-2">
              The three highest-capability models (GPT-5, Gemini 3 Pro, Claude Sonnet 4.5) 
              all score above 0.75 on HumaneScore, demonstrating that cutting-edge capability 
              and humaneness are not trade-offs.
            </p>
          </v-card>
        </div>
        <div class="col-md-6 mb-4">
          <v-card class="pa-4" elevation="2">
            <h4 class="text-h6 font-weight-bold mb-2">The Pattern</h4>
            <p class="text-body-2">
              Models that excel on standard benchmarks (MMLU, GPQA, HumanEval) consistently 
              perform better on humane principles. This suggests that building more capable 
              models creates opportunities for better safety and alignment.
            </p>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { modelBenchmarks, calculateCorrelation, type ModelBenchmark } from '../lib/modelBenchmarks';

export default defineComponent({
  name: 'CapabilityHumanenessChart',
  data() {
    return {
      models: modelBenchmarks,
      tooltipVisible: false,
      tooltipData: null as ModelBenchmark | null,
      tooltipStyle: {} as { left: string; top: string },
      padding: 80,
      svgWidth: 800,
      svgHeight: 600,
    };
  },
  computed: {
    correlation(): number {
      return calculateCorrelation();
    },
    sortedModels(): ModelBenchmark[] {
      return [...this.models].sort((a, b) => b.averageCapability - a.averageCapability);
    },
    chartWidth(): number {
      return this.svgWidth - 2 * this.padding;
    },
    chartHeight(): number {
      return this.svgHeight - 2 * this.padding;
    },
    minCapability(): number {
      return Math.min(...this.models.map(m => m.averageCapability));
    },
    maxCapability(): number {
      return Math.max(...this.models.map(m => m.averageCapability));
    },
    minHumaneScore(): number {
      return Math.min(...this.models.map(m => m.humaneScore));
    },
    maxHumaneScore(): number {
      return Math.max(...this.models.map(m => m.humaneScore));
    },
  },
  methods: {
    getX(capability: number): number {
      const normalized = (capability - this.minCapability) / (this.maxCapability - this.minCapability);
      return this.padding + normalized * this.chartWidth;
    },
    getY(humaneScore: number): number {
      // Invert Y axis (SVG Y increases downward)
      const normalized = (humaneScore - this.minHumaneScore) / (this.maxHumaneScore - this.minHumaneScore);
      return this.svgHeight - this.padding - normalized * this.chartHeight;
    },
    getPointColor(humaneScore: number): string {
      if (humaneScore >= 0.7) return '#10b981'; // Green
      if (humaneScore >= 0.5) return '#f59e0b'; // Yellow
      if (humaneScore >= 0) return '#f97316'; // Orange
      return '#ef4444'; // Red
    },
    getShortModelName(fullName: string): string {
      const shortNames: Record<string, string> = {
        'GPT-5': 'GPT-5',
        'Gemini 3 Pro Preview': 'Gemini 3',
        'Claude Sonnet 4.5': 'Claude 4.5',
        'Claude Opus 4.1': 'Claude Opus',
        'Gemini 2.5 Pro': 'Gemini 2.5',
        'GPT-4.1': 'GPT-4.1',
        'GPT-4o (2024-11-20)': 'GPT-4o',
        'Claude Sonnet 4': 'Claude 4',
        'Gemini 2.5 Flash': 'Gemini Flash',
        'Gemini 2.0 Flash 001': 'Gemini 2.0',
        'Grok 4': 'Grok 4',
        'LLaMA 4 Maverick': 'LLaMA 4',
        'LLaMA 3.1 405B Instruct': 'LLaMA 3.1',
        'DeepSeek V3.1 Terminus': 'DeepSeek',
      };
      return shortNames[fullName] || fullName.split(' ')[0];
    },
    showTooltip(model: ModelBenchmark, event: MouseEvent) {
      this.tooltipData = model;
      this.tooltipVisible = true;
      this.tooltipStyle = {
        left: `${event.clientX + 10}px`,
        top: `${event.clientY + 10}px`,
      };
    },
    hideTooltip() {
      this.tooltipVisible = false;
      this.tooltipData = null;
    },
  },
});
</script>

<style scoped>
.capability-humaneness-chart {
  width: 100%;
  padding: 24px;
}

.chart-container {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.chart-svg {
  display: block;
  margin: 0 auto;
}

.data-point {
  transition: opacity 0.2s;
}

.data-point:hover {
  opacity: 0.8;
}
</style>

