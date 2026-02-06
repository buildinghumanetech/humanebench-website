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
      <span class="humane-score-value">{{ model.humaneScore.toFixed(2) }}</span>
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
        <span class="principle-score">{{ principle.score.toFixed(2) }}</span>
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
import type { ModelEntry } from '@/utils/modelData';

export default defineComponent({
  name: 'NutritionLabel',

  props: {
    model: {
      type: Object as PropType<ModelEntry>,
      required: true,
    },
    clickable: {
      type: Boolean,
      default: false,
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
  align-items: baseline;
  padding: 6px 0 8px;
}

.humane-score-label {
  font-size: 1.05rem;
  font-weight: 700;
  color: #000;
}

.humane-score-value {
  font-size: 1.85rem;
  font-weight: 700;
  color: #000;
  font-variant-numeric: tabular-nums;
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
  align-items: baseline;
  padding: 7px 0;
  border-bottom: 1px solid #000;
}

.principle-row.last-row {
  border-bottom: none;
}

.principle-name {
  font-size: 0.84rem;
  color: #000;
}

.principle-score {
  font-size: 0.84rem;
  font-weight: 700;
  color: #000;
  font-variant-numeric: tabular-nums;
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

  .humane-score-value {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .nutrition-label {
    padding: 16px;
  }

  .nutrition-title {
    font-size: 1.6rem;
  }

  .humane-score-value {
    font-size: 1.35rem;
  }
}
</style>
