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
                <div class="stat-card-label">HumaneScore</div>
                <div class="stat-card-value">{{ model.humaneScore.toFixed(2) }}</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="stat-card">
                <div class="stat-card-label">Strongest Principle</div>
                <div class="stat-card-value stat-card-text">{{ strongestPrincipleName }}</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="stat-card">
                <div class="stat-card-label">Weakest Principle</div>
                <div class="stat-card-value stat-card-text">{{ weakestPrincipleName }}</div>
              </div>
            </v-col>
          </v-row>

          <!-- Mobile: Nutrition Label -->
          <div class="d-md-none mb-8">
            <NutritionLabel :model="model" />
          </div>

          <!-- Steerability Analysis -->
          <div class="section-card mb-8">
            <h2 class="section-title mb-4">Steerability Analysis</h2>
            <div class="steerability-score mb-3">
              <span class="steerability-label">Steerability Score:</span>
              <span class="steerability-value">{{ model.steerability.toFixed(2) }}</span>
              <span class="steerability-badge" :class="steerabilityClass">{{ steerabilityLabel }}</span>
            </div>
            <p class="section-text mb-4">{{ steerabilityDescription }}</p>
            <SteerabilityAxis
              :baseline="model.humaneScore"
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
  getStrongestPrinciple,
  getWeakestPrinciple,
  type ModelDetailEntry,
} from '@/utils/modelData';
import NutritionLabel from '@/components/NutritionLabel.vue';
import ModelNotFound from '@/components/ModelNotFound.vue';
import SteerabilityAxis from '@/components/SteerabilityAxis.vue';
import PrincipleScoreBars from '@/components/PrincipleScoreBars.vue';

export default defineComponent({
  name: 'ModelDetailPage',

  components: {
    NutritionLabel,
    ModelNotFound,
    SteerabilityAxis,
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

    steerabilityClass(): string {
      if (!this.model) return '';
      if (this.model.steerability > 0.50) return 'steerability-high';
      if (this.model.steerability >= 0.15) return 'steerability-moderate';
      return 'steerability-limited';
    },

    steerabilityLabel(): string {
      if (!this.model) return '';
      if (this.model.steerability > 0.50) return 'High';
      if (this.model.steerability >= 0.15) return 'Moderate';
      return 'Limited';
    },

    steerabilityDescription(): string {
      if (!this.model) return '';
      const score = this.model.steerability.toFixed(2);
      if (this.model.steerability > 0.50) {
        return `With a steerability score of ${score}, this model shows high responsiveness to persona framing. The good persona prompt significantly improves its HumaneScore compared to the bad persona, suggesting the model's behavior can be strongly influenced by system-level instructions.`;
      }
      if (this.model.steerability >= 0.15) {
        return `With a steerability score of ${score}, this model shows moderate responsiveness to persona framing. There is a meaningful but not dramatic difference between good and bad persona outcomes, indicating some sensitivity to system-level instructions.`;
      }
      return `With a steerability score of ${score}, this model shows limited responsiveness to persona framing. Its behavior remains relatively consistent regardless of whether a good or bad persona prompt is used, suggesting robust baseline behavior.`;
    },

    strongestPrincipleName(): string {
      if (!this.model) return 'N/A';
      const strongest = getStrongestPrinciple(this.model);
      return strongest ? strongest.name : 'N/A';
    },

    weakestPrincipleName(): string {
      if (!this.model) return 'N/A';
      const weakest = getWeakestPrinciple(this.model);
      return weakest ? weakest.name : 'N/A';
    },
  },

  watch: {
    modelId: {
      immediate: true,
      async handler(id: string) {
        this.loading = true;
        this.model = await fetchModelById(id);
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
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.steerability-score {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.steerability-label {
  font-size: 0.95rem;
  color: #4a4a4a;
}

.steerability-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  font-variant-numeric: tabular-nums;
}

.steerability-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.steerability-high {
  background: #f3e5f5;
  color: #7b1fa2;
}

.steerability-moderate {
  background: #f3e5f5;
  color: #7b1fa2;
}

.steerability-limited {
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
