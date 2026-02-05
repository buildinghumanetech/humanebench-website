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

          <!-- Score Summary Cards -->
          <v-row class="mb-8">
            <v-col cols="12" sm="4">
              <div class="score-card">
                <div class="score-card-label">Bad Persona</div>
                <div class="score-card-value">{{ model.scores.bad_persona.HumaneScore?.toFixed(2) ?? 'N/A' }}</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="score-card">
                <div class="score-card-label">Baseline</div>
                <div class="score-card-value">{{ model.humaneScore.toFixed(2) }}</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="score-card">
                <div class="score-card-label">Good Persona</div>
                <div class="score-card-value">{{ model.scores.good_persona.HumaneScore?.toFixed(2) ?? 'N/A' }}</div>
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
            <p class="section-text">{{ steerabilityDescription }}</p>
          </div>

          <!-- Detailed Scores Table -->
          <div class="section-card mb-8">
            <h2 class="section-title mb-4">Detailed Scores by Principle</h2>
            <v-table density="comfortable" class="scores-table">
              <thead>
                <tr>
                  <th>Principle</th>
                  <th class="text-right">Bad Persona</th>
                  <th class="text-right">Baseline</th>
                  <th class="text-right">Good Persona</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="principle in principleRows" :key="principle.id">
                  <td>{{ principle.name }}</td>
                  <td class="text-right font-weight-medium tabular-nums">{{ principle.badPersona }}</td>
                  <td class="text-right font-weight-medium tabular-nums">{{ principle.baseline }}</td>
                  <td class="text-right font-weight-medium tabular-nums">{{ principle.goodPersona }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <!-- Key Insights -->
          <div class="section-card mb-8">
            <h2 class="section-title mb-4">Key Insights</h2>
            <ul class="insights-list">
              <li v-for="(insight, index) in model.insights" :key="index" class="insight-item">
                {{ insight }}
              </li>
            </ul>
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
import { fetchModelById, type ModelDetailEntry } from '@/utils/modelData';
import { PRINCIPLES } from '@/constants/principles';
import NutritionLabel from '@/components/NutritionLabel.vue';
import ModelNotFound from '@/components/ModelNotFound.vue';

interface PrincipleRow {
  id: string;
  name: string;
  badPersona: string;
  baseline: string;
  goodPersona: string;
}

export default defineComponent({
  name: 'ModelDetailPage',

  components: {
    NutritionLabel,
    ModelNotFound,
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
      if (this.model.steerability > 0.15) return 'steerability-high';
      if (this.model.steerability >= 0.05) return 'steerability-moderate';
      return 'steerability-limited';
    },

    steerabilityLabel(): string {
      if (!this.model) return '';
      if (this.model.steerability > 0.15) return 'High';
      if (this.model.steerability >= 0.05) return 'Moderate';
      return 'Limited';
    },

    steerabilityDescription(): string {
      if (!this.model) return '';
      const score = this.model.steerability.toFixed(2);
      if (this.model.steerability > 0.15) {
        return `With a steerability score of ${score}, this model shows high responsiveness to persona framing. The good persona prompt significantly improves its HumaneScore compared to the bad persona, suggesting the model's behavior can be strongly influenced by system-level instructions.`;
      }
      if (this.model.steerability >= 0.05) {
        return `With a steerability score of ${score}, this model shows moderate responsiveness to persona framing. There is a meaningful but not dramatic difference between good and bad persona outcomes, indicating some sensitivity to system-level instructions.`;
      }
      return `With a steerability score of ${score}, this model shows limited responsiveness to persona framing. Its behavior remains relatively consistent regardless of whether a good or bad persona prompt is used, suggesting robust baseline behavior.`;
    },

    principleRows(): PrincipleRow[] {
      if (!this.model) return [];
      const principleList = PRINCIPLES.filter(p => p.id !== 'HumaneScore');
      return principleList.map(p => ({
        id: p.id,
        name: p.name,
        badPersona: this.formatScore(this.model!.scores.bad_persona[p.id]),
        baseline: this.formatScore(this.model!.scores.baseline[p.id]),
        goodPersona: this.formatScore(this.model!.scores.good_persona[p.id]),
      }));
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

  methods: {
    formatScore(value: number | undefined): string {
      if (value === undefined) return 'N/A';
      return value.toFixed(2);
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

.score-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;
}

.score-card-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.score-card-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  font-variant-numeric: tabular-nums;
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
  background: #e8f5e9;
  color: #2e7d32;
}

.steerability-moderate {
  background: #fff3e0;
  color: #e65100;
}

.steerability-limited {
  background: #f3e5f5;
  color: #7b1fa2;
}

.scores-table {
  background: transparent !important;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}

.insights-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insight-item {
  padding: 0.6rem 0;
  padding-left: 1.25rem;
  position: relative;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4a4a4a;
  border-bottom: 1px solid #f0f0f0;
}

.insight-item:last-child {
  border-bottom: none;
}

.insight-item::before {
  content: '\2022';
  position: absolute;
  left: 0;
  color: #5539EC;
  font-weight: 700;
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

  .score-card-value {
    font-size: 1.5rem;
  }

  .section-card {
    padding: 1rem;
  }
}
</style>
