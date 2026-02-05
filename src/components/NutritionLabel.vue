<template>
  <div class="nutrition-label">
    <!-- Title -->
    <div class="nutrition-title">AI Nutrition Facts</div>

    <!-- Thick divider -->
    <div class="thick-divider"></div>

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

    <!-- Thick divider -->
    <div class="thick-divider"></div>

    <!-- Principles section header -->
    <div class="principles-header">Principles of Humane Technology</div>

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
import type { ModelEntry } from '@/views/ModelsPage.vue';

export default defineComponent({
  name: 'NutritionLabel',

  props: {
    model: {
      type: Object as PropType<ModelEntry>,
      required: true,
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

.nutrition-title {
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #000;
  line-height: 1.2;
}

.thick-divider {
  height: 8px;
  background: #000;
  margin: 6px -4px;
}

.model-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0 4px;
}

.model-label {
  font-size: 0.85rem;
  color: #000;
}

.model-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000;
  text-align: right;
}

.humane-score-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 4px 0 6px;
}

.humane-score-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #000;
}

.humane-score-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  font-variant-numeric: tabular-nums;
}

.principles-header {
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 20px;
  margin: 0 -20px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.principles-list {
  flex: 1;
}

.principle-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0;
  border-bottom: 1px solid #000;
}

.principle-row.last-row {
  border-bottom: none;
}

.principle-name {
  font-size: 0.8rem;
  color: #000;
}

.principle-score {
  font-size: 0.8rem;
  font-weight: 600;
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
    font-size: 1.5rem;
  }

  .humane-score-value {
    font-size: 1.3rem;
  }
}

@media (max-width: 600px) {
  .nutrition-label {
    padding: 16px;
  }

  .nutrition-title {
    font-size: 1.35rem;
  }

  .humane-score-value {
    font-size: 1.2rem;
  }

  .principles-header {
    margin: 0 -16px;
    padding: 4px 16px;
  }
}
</style>
