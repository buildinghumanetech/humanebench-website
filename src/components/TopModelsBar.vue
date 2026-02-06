<template>
  <div class="top-models-bar">
    <div class="chips-row">
      <router-link
        v-for="model in models"
        :key="model.id"
        :to="{ name: 'model-detail', params: { modelId: model.id } }"
        class="model-chip"
      >
        <span class="rank-badge" :class="rankClass(model.rank)">{{ model.rank }}</span>
        <span class="chip-name">{{ model.displayName }}</span>
        <span class="chip-score">{{ model.humaneScore.toFixed(2) }}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { RankedModelEntry } from '@/utils/modelData';

export default defineComponent({
  name: 'TopModelsBar',

  props: {
    models: {
      type: Array as PropType<RankedModelEntry[]>,
      required: true,
    },
  },

  methods: {
    rankClass(rank: number): string {
      if (rank === 1) return 'rank-gold';
      if (rank === 2) return 'rank-silver';
      if (rank === 3) return 'rank-bronze';
      return 'rank-default';
    },
  },
});
</script>

<style scoped>
.chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.model-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: #1a1a1a;
  font-size: 0.9rem;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
}

.model-chip:hover {
  border-color: #5539EC;
  box-shadow: 0 2px 8px rgba(85, 57, 236, 0.15);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.rank-gold { background: #C9A84C; }
.rank-silver { background: #9E9E9E; }
.rank-bronze { background: #B87333; }
.rank-default { background: #fff; color: #666; border: 2px solid #666; }

.chip-name {
  font-weight: 500;
}

.chip-score {
  font-weight: 700;
  color: #5539EC;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 600px) {
  .model-chip {
    font-size: 0.8rem;
    padding: 0.4rem 0.75rem;
  }

  .rank-badge {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.65rem;
  }
}
</style>
