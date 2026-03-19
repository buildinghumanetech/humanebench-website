<template>
  <div class="nutrition-label" :class="{ 'nutrition-label--clickable': clickable }">
    <!-- Title -->
    <div class="nutrition-title">AI Nutrition Facts</div>

    <!-- thick1 line under title -->
    <div class="line-thick1"></div>

    <!-- Model row -->
    <div class="model-row">
      <span class="model-label">Model</span>
      <span class="model-value">{{ model.displayName }}</span>
    </div>

    <!-- HumaneScore row -->
    <div class="humane-score-row">
      <span class="humane-score-label">HumaneScore</span>
      <span class="score-chip humane-chip" :style="scoreChipStyle(model.humaneScore)">
        {{ model.humaneScore.toFixed(2) }}
      </span>
    </div>

    <!-- thick2 line (heavy separator) -->
    <div class="line-thick2"></div>

    <!-- Principles section header -->
    <div class="principles-header">
      <span class="principles-header-label">Principles of Humane Technology</span>
      <span class="principles-header-score">Score</span>
    </div>

    <!-- thick1 line under principles header -->
    <div class="line-thick1"></div>

    <!-- Principle rows -->
    <div class="principles-list">
      <div
        v-for="(principle, index) in model.principles"
        :key="principle.id"
        class="principle-row"
        :class="{ 'last-row': index === model.principles.length - 1 }"
      >
        <span class="principle-name">{{ principle.name }}</span>
        <span class="score-chip" :style="scoreChipStyle(principle.score)">
          {{ principle.score.toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Score Scale Legend -->
    <div class="legend">
      <div class="legend-title">Score Scale</div>
      <div class="legend-scale">
        <div class="legend-bar gradient-bar"></div>
      </div>
      <div class="legend-labels">
        <span class="legend-label" style="left: 0%;">-1.0</span>
        <span class="legend-label" style="left: 25%;">-0.5</span>
        <span class="legend-label" style="left: 50%;">0.0</span>
        <span class="legend-label" style="left: 75%;">+0.5</span>
        <span class="legend-label" style="left: 100%;">+1.0</span>
      </div>
      <div class="legend-note">
        Each principle is scored from <strong>-1</strong> (misaligned) to <strong>+1</strong> (fully aligned)
        with humane technology values. The HumaneScore is the average across all principles.
      </div>
    </div>

    <!-- Footnote -->
    <div class="nutrition-footnote">
      Results of HumaneBench.ai single-turn benchmark evaluating 15 LLMs on 23&ndash;24 Nov 2025
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ModelDetailEntry } from '@/utils/modelData';

export default defineComponent({
  name: 'NutritionLabel',

  props: {
    model: {
      type: Object as PropType<ModelDetailEntry>,
      required: true,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
  },

  methods: {
    /** Interpolate between the SVG score grid color stops to get a color for a score. */
    scoreColor(score: number): { bg: string; text: string } {
      // Color stops matching the score grid SVGs (red → orange → yellow → yellow-green → green)
      const stops: { pos: number; r: number; g: number; b: number }[] = [
        { pos: -1.0, r: 228, g: 37,  b: 94 },
        { pos: -0.5, r: 215, g: 144, b: 61 },
        { pos:  0.0, r: 207, g: 211, b: 40 },
        { pos:  0.5, r: 135, g: 204, b: 58 },
        { pos:  1.0, r: 65,  g: 191, b: 79 },
      ];

      const clamped = Math.max(-1, Math.min(1, score));

      // Find surrounding stops
      let lower = stops[0];
      let upper = stops[stops.length - 1];
      for (let i = 0; i < stops.length - 1; i++) {
        if (clamped >= stops[i].pos && clamped <= stops[i + 1].pos) {
          lower = stops[i];
          upper = stops[i + 1];
          break;
        }
      }

      const t = upper.pos === lower.pos ? 0 : (clamped - lower.pos) / (upper.pos - lower.pos);
      const r = Math.round(lower.r + t * (upper.r - lower.r));
      const g = Math.round(lower.g + t * (upper.g - lower.g));
      const b = Math.round(lower.b + t * (upper.b - lower.b));

      const bg = `rgb(${r}, ${g}, ${b})`;
      // Use dark text for lighter backgrounds, white for darker ones
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const text = luminance > 0.5 ? '#1a1a1a' : '#ffffff';

      return { bg, text };
    },

    scoreChipStyle(score: number): Record<string, string> {
      const { bg, text } = this.scoreColor(score);
      return { background: bg, color: text };
    },
  },
});
</script>

<style scoped>
.nutrition-label {
  border: 2px solid #000;
  padding: 20px;
  background: #fff;
  transition: box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nutrition-label:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.nutrition-label--clickable {
  cursor: pointer;
}

.nutrition-label--clickable:hover {
  border-color: #5539EC;
}

.nutrition-title {
  font-family: 'Lora', Georgia, serif;
  font-size: 2.1rem;
  font-weight: 700;
  color: #000;
  line-height: 1.1;
  letter-spacing: 0.03em;
  margin-bottom: 8px;
}

.line-thick1 {
  border-bottom: 4px solid #000;
  margin-bottom: 8px;
}

.line-thick2 {
  border-bottom: 12px solid #000;
  margin-bottom: 8px;
}

.model-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 4px 0;
  font-size: 0.9rem;
}

.model-label {
  color: #333;
}

.model-value {
  font-weight: 700;
}

.humane-score-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0 8px;
}

.humane-score-label {
  font-size: 1.05rem;
  font-weight: 700;
  color: #000;
}

/* Score chips */
.score-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.84rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.humane-chip {
  font-size: 1.4rem;
  padding: 4px 12px;
}

.principles-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
}

.principles-header-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #000;
}

.principles-header-score {
  font-size: 0.78rem;
  font-style: italic;
  color: #000;
}

.principles-list {
  flex: 1;
}

.principle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid #000;
  gap: 8px;
}

.principle-row.last-row {
  border-bottom: none;
}

.principle-name {
  font-size: 0.84rem;
  color: #000;
  flex: 1;
}

/* Legend */
.legend {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 4px solid #000;
}

.legend-title {
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.legend-scale {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.legend-bar {
  flex: 1;
  height: 16px;
  border-radius: 3px;
}

.gradient-bar {
  background: linear-gradient(
    to right,
    rgb(228, 37, 94),
    rgb(215, 144, 61) 25%,
    rgb(207, 211, 40) 50%,
    rgb(135, 204, 58) 75%,
    rgb(65, 191, 79)
  );
}

.legend-labels {
  position: relative;
  height: 1.2em;
  font-size: 0.65rem;
  color: #666;
  margin-bottom: 6px;
}

.legend-label {
  position: absolute;
  transform: translateX(-50%);
}

.legend-label:first-child {
  transform: none;
}

.legend-label:last-child {
  transform: translateX(-100%);
}

.legend-note {
  font-size: 0.68rem;
  color: #666;
  line-height: 1.45;
}

.nutrition-footnote {
  margin-top: 10px;
  font-size: 0.7rem;
  font-style: italic;
  color: #888;
  line-height: 1.4;
}

@media (max-width: 960px) {
  .nutrition-title {
    font-size: 1.8rem;
  }

  .humane-chip {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .nutrition-label {
    padding: 16px;
  }

  .nutrition-title {
    font-size: 1.6rem;
  }

  .humane-chip {
    font-size: 1.1rem;
  }
}
</style>
