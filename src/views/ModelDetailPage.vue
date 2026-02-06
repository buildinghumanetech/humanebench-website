<template>
  <div class="model-detail-page">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <v-progress-circular indeterminate color="#5539EC" />
    </div>

    <!-- Not Found -->
    <ModelNotFound v-else-if="!model" />

    <!-- Model Detail -->
    <template v-else>
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 mb-4">
        <template v-slot:divider>
          <v-icon size="14">mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-row>
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <!-- Hero -->
          <div class="mb-8">
            <h1 class="detail-title mb-2">{{ model.displayName }}</h1>
            <p class="detail-provider">{{ model.provider }}</p>
          </div>

          <!-- Top 3 Stat Cards -->
          <v-row class="mb-8">
            <v-col cols="12" sm="4">
              <div class="stat-card">
                <div class="stat-card-label">Composite HumaneScore</div>
                <div class="stat-card-value">{{ model.humaneScore.toFixed(2) }}</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="stat-card">
                <div class="stat-card-label">Overall Rank</div>
                <div class="stat-card-value">#{{ modelRank }} <span class="stat-card-context">of {{ totalModels }}</span></div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="stat-card">
                <div class="stat-card-label">Strongest Principle</div>
                <div class="stat-card-value stat-card-text">{{ strongestPrincipleName }}</div>
              </div>
            </v-col>
          </v-row>

          <!-- Mobile: Nutrition Label -->
          <div class="d-md-none mb-8">
            <NutritionLabel :model="model" />
          </div>

          <!-- Model Drift Analysis -->
          <div class="section-card mb-8">
            <h2 class="section-title mb-4">Prompt Sensitivity Analysis</h2>
            <div class="model-drift-score mb-3">
              <span class="model-drift-label">Prompt Sensitivity Score:</span>
              <span class="model-drift-value">{{ model.modelDrift.toFixed(2) }}</span>
              <span class="model-drift-badge" :class="modelDriftClass">{{ modelDriftLabel }}</span>
            </div>
            <p class="section-text mb-4">{{ modelDriftDescription }}</p>
            <ModelDriftAxis
              :baseline="model.scores.baseline.HumaneScore ?? 0"
              :good-persona="model.scores.good_persona.HumaneScore ?? 0"
              :bad-persona="model.scores.bad_persona.HumaneScore ?? 0"
            />
          </div>

          <!-- Detailed Scores by Principle -->
          <div class="section-card mb-8">
            <h2 class="section-title mb-4">Scores by Principle</h2>
            <PrincipleScoreBars :model="model" />
          </div>

        </v-col>

        <!-- Sidebar: Nutrition Label (desktop) -->
        <v-col cols="4" class="d-none d-md-block">
          <div class="sticky-sidebar">
            <NutritionLabel :model="model" />
          </div>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  fetchModelById,
  fetchRankedModels,
  getStrongestPrinciple,
  type ModelDetailEntry,
  type RankedModelEntry,
} from '@/utils/modelData';
import NutritionLabel from '@/components/NutritionLabel.vue';
import ModelNotFound from '@/components/ModelNotFound.vue';
import ModelDriftAxis from '@/components/ModelDriftAxis.vue';
import PrincipleScoreBars from '@/components/PrincipleScoreBars.vue';

export default defineComponent({
  name: 'ModelDetailPage',

  components: {
    NutritionLabel,
    ModelNotFound,
    ModelDriftAxis,
    PrincipleScoreBars,
  },

  props: {
    modelId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: true,
      model: null as ModelDetailEntry | null,
      modelRank: 0,
      totalModels: 0,
    };
  },

  computed: {
    breadcrumbs() {
      const items = [
        { title: 'Home', to: { name: 'home' }, disabled: false },
        { title: 'Models', to: { name: 'models' }, disabled: false },
      ];
      if (this.model) {
        items.push({ title: this.model.displayName, to: { name: 'model-detail' }, disabled: true });
      }
      return items;
    },

    modelDriftClass(): string {
      if (!this.model) return '';
      if (this.model.modelDrift > 0.50) return 'model-drift-high';
      if (this.model.modelDrift >= 0.15) return 'model-drift-moderate';
      return 'model-drift-limited';
    },

    modelDriftLabel(): string {
      if (!this.model) return '';
      if (this.model.modelDrift > 0.50) return 'High';
      if (this.model.modelDrift >= 0.15) return 'Moderate';
      return 'Limited';
    },

    modelDriftDescription(): string {
      if (!this.model) return '';
      const score = this.model.modelDrift.toFixed(2);
      if (this.model.modelDrift > 0.50) {
        return `With a prompt sensitivity score of ${score}, this model shows high responsiveness to persona framing. The good persona prompt significantly improves its HumaneScore compared to the bad persona, suggesting the model's behavior can be strongly influenced by system-level instructions.`;
      }
      if (this.model.modelDrift >= 0.15) {
        return `With a prompt sensitivity score of ${score}, this model shows moderate responsiveness to persona framing. There is a meaningful but not dramatic difference between good and bad persona outcomes, indicating some sensitivity to system-level instructions.`;
      }
      return `With a prompt sensitivity score of ${score}, this model shows limited responsiveness to persona framing. Its behavior remains relatively consistent regardless of whether a good or bad persona prompt is used, suggesting robust baseline behavior.`;
    },

    strongestPrincipleName(): string {
      if (!this.model) return 'N/A';
      const strongest = getStrongestPrinciple(this.model);
      return strongest ? strongest.name : 'N/A';
    },
  },

  watch: {
    modelId: {
      immediate: true,
      async handler(id: string) {
        this.loading = true;
        const [model, ranked] = await Promise.all([
          fetchModelById(id),
          fetchRankedModels(),
        ]);
        this.model = model;
        this.totalModels = ranked.length;
        const found = ranked.find((m: RankedModelEntry) => m.id === id);
        this.modelRank = found ? found.rank : 0;
        this.loading = false;
      },
    },
  },
});
</script>

<style scoped>
.model-detail-page {
  padding: 0.5rem 0;
}

.detail-title {
  font-family: 'Lora', serif;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.detail-provider {
  font-size: 1.1rem;
  color: #666;
}

.stat-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;
}

.stat-card-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-card-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #5539EC;
  font-variant-numeric: tabular-nums;
}

.stat-card-text {
  font-size: 1rem;
  line-height: 1.3;
}

.stat-card-context {
  font-size: 0.9rem;
  font-weight: 400;
  color: #999;
}

.section-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  font-family: 'Lora', serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #1a1a1a;
}

.section-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #4a4a4a;
}

.model-drift-score {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.model-drift-label {
  font-size: 0.95rem;
  color: #4a4a4a;
}

.model-drift-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  font-variant-numeric: tabular-nums;
}

.model-drift-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.model-drift-high {
  background: #f3e5f5;
  color: #7b1fa2;
}

.model-drift-moderate {
  background: #f3e5f5;
  color: #7b1fa2;
}

.model-drift-limited {
  background: #f3e5f5;
  color: #7b1fa2;
}

.sticky-sidebar {
  position: sticky;
  top: 100px;
}

@media (max-width: 960px) {
  .detail-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .detail-title {
    font-size: 1.5rem;
  }

  .stat-card-value {
    font-size: 1.5rem;
  }

  .section-card {
    padding: 1rem;
  }
}
</style>
