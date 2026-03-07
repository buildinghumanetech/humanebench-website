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
      <span class="score-chip humane-chip" :class="scoreTier(model.humaneScore)">
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
        <span class="score-chip" :class="scoreTier(principle.score)">
          {{ principle.score.toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Score Scale Legend -->
    <div class="legend">
      <div class="legend-title">Score Scale</div>
      <div class="legend-scale">
        <div class="legend-bar">
          <div class="legend-bar-segment segment-poor" style="flex: 50;">Poor</div>
          <div class="legend-bar-segment segment-fair" style="flex: 25;">Fair</div>
          <div class="legend-bar-segment segment-good" style="flex: 15;">Good</div>
          <div class="legend-bar-segment segment-excellent" style="flex: 10;">Excellent</div>
        </div>
      </div>
      <div class="legend-labels">
        <span class="legend-label" style="left: 0%;">-1.0</span>
        <span class="legend-label" style="left: 50%;">0.0</span>
        <span class="legend-label" style="left: 75%;">+0.5</span>
        <span class="legend-label" style="left: 90%;">+0.8</span>
        <span class="legend-label" style="left: 100%;">+1.0</span>
      </div>
      <div class="legend-note">
        Each principle is scored from <strong>-1</strong> (misaligned) to <strong>+1</strong> (fully aligned)
        with humane technology values. The HumaneScore is the average across all principles.
      </div>
    </div>

    <!-- Humane Steerability -->
    <div class="steerability-section">
      <div class="steerability-title">Humane Steerability</div>
      <div class="steerability-note">
        Measures how this model responds to humane guidance (positive steerability)
        and resists adversarial pressure (humane resilience).
      </div>
      <div class="steerability-row">
        <span>Positive Steerability</span>
        <span class="steerability-value">{{ positiveSteerability }}</span>
      </div>
      <div class="steerability-row">
        <span>Humane Resilience</span>
        <span>
          <span class="steerability-value">{{ humaneResilience }}</span>
          <span class="steerability-badge" :class="resilienceBadgeClass">{{ resilienceLabel }}</span>
        </span>
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
    positiveSteerability(): string {
      const good = this.model.scores.good_persona.HumaneScore ?? 0;
      const baseline = this.model.humaneScore;
      return (good - baseline).toFixed(2);
    },

    humaneResilience(): string {
      const baseline = this.model.humaneScore;
      const bad = this.model.scores.bad_persona.HumaneScore ?? 0;
      return (baseline - bad).toFixed(2);
    },

    resilienceDelta(): number {
      const baseline = this.model.humaneScore;
      const bad = this.model.scores.bad_persona.HumaneScore ?? 0;
      return baseline - bad;
    },

    resilienceLabel(): string {
      if (this.resilienceDelta <= 0) return 'Very High';
      if (this.resilienceDelta <= 0.10) return 'High';
      if (this.resilienceDelta <= 0.30) return 'Moderate';
      return 'Low';
    },

    resilienceBadgeClass(): string {
      if (this.resilienceDelta <= 0) return 'badge-excellent';
      if (this.resilienceDelta <= 0.10) return 'badge-good';
      if (this.resilienceDelta <= 0.30) return 'badge-moderate';
      return 'badge-low';
    },
  },

  methods: {
    scoreTier(score: number): string {
      if (score >= 0.80) return 'score-excellent';
      if (score >= 0.50) return 'score-good';
      if (score >= 0) return 'score-fair';
      return 'score-poor';
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

.score-excellent {
  background: #c8e6c9;
  color: #1b5e20;
}

.score-good {
  background: #dcedc8;
  color: #33691e;
}

.score-fair {
  background: #fff9c4;
  color: #f57f17;
}

.score-poor {
  background: #ffcdd2;
  color: #c62828;
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

/* Steerability section */
.steerability-section {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 2px solid #000;
}

.steerability-title {
  font-size: 0.84rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.steerability-note {
  font-size: 0.72rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 6px;
}

.steerability-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.84rem;
  padding: 3px 0;
}

.steerability-value {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.steerability-badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 3px;
  margin-left: 6px;
}

.badge-excellent {
  background: #c8e6c9;
  color: #1b5e20;
}

.badge-good {
  background: #dcedc8;
  color: #33691e;
}

.badge-moderate {
  background: #fff9c4;
  color: #f57f17;
}

.badge-low {
  background: #ffcdd2;
  color: #c62828;
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
  display: flex;
}

.legend-bar-segment {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  color: #333;
}

.segment-poor {
  background: #ffcdd2;
}

.segment-fair {
  background: #fff9c4;
}

.segment-good {
  background: #dcedc8;
}

.segment-excellent {
  background: #c8e6c9;
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
