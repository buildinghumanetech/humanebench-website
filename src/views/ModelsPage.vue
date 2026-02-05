<template>
  <div class="models-page">
    <!-- Hero Section -->
    <div class="hero-section mb-12">
      <div class="hero-content text-center">
        <h1 class="hero-title mb-6">
          Model Performance
        </h1>
        <p class="hero-subtitle mx-auto">
          Explore how individual AI models perform across the principles of humane technology.
          Each model is scored on its baseline behavior using the HumaneBench single-turn benchmark.
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <v-progress-circular indeterminate color="#5539EC" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-grey-darken-2">{{ error }}</p>
    </div>

    <!-- Model Groups -->
    <div v-else>
      <div
        v-for="group in providerGroups"
        :key="group.provider"
        class="provider-group mb-10"
      >
        <h2 class="provider-title mb-4">{{ group.provider }}</h2>

        <v-row>
          <v-col
            v-for="model in group.models"
            :key="model.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="model-card pa-5 rounded-lg h-100" flat>
              <div class="d-flex justify-space-between align-start mb-3">
                <h3 class="model-name">{{ model.displayName }}</h3>
              </div>
              <div class="d-flex align-center ga-3 mb-4">
                <span class="humane-score-label">HumaneScore</span>
                <span
                  class="humane-score-value"
                  :style="{ color: scoreColor(model.humaneScore) }"
                >
                  {{ model.humaneScore.toFixed(2) }}
                </span>
              </div>
              <div class="principles-list">
                <div
                  v-for="principle in model.principles"
                  :key="principle.id"
                  class="principle-row d-flex justify-space-between align-center"
                >
                  <span class="principle-name">{{ principle.name }}</span>
                  <span
                    class="principle-score"
                    :style="{ color: scoreColor(principle.score) }"
                  >
                    {{ principle.score.toFixed(2) }}
                  </span>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PRINCIPLES } from '@/constants/principles';

interface PrincipleScore {
  id: string;
  name: string;
  score: number;
}

interface ModelEntry {
  id: string;
  displayName: string;
  provider: string;
  humaneScore: number;
  principles: PrincipleScore[];
}

interface ProviderGroup {
  provider: string;
  models: ModelEntry[];
}

interface ModelScoreData {
  displayName: string;
  provider: string;
  scores: Record<string, Record<string, number>>;
}

interface ModelScoresJson {
  models: Record<string, ModelScoreData>;
}

// Provider display order
const PROVIDER_ORDER = ['Anthropic', 'DeepSeek', 'Google', 'Meta', 'OpenAI', 'xAI'];

export default defineComponent({
  name: 'ModelsPage',

  data() {
    return {
      loading: true,
      error: null as string | null,
      providerGroups: [] as ProviderGroup[],
    };
  },

  async created() {
    try {
      const response = await fetch(`${process.env.BASE_URL}data/model_scores.json`);
      if (!response.ok) throw new Error('Failed to load model data');
      const data = await response.json();

      const principleMap = new Map(
        PRINCIPLES.filter(p => p.id !== 'HumaneScore').map(p => [p.id, p.name])
      );

      // Build model entries
      const modelEntries: ModelEntry[] = [];
      for (const [modelId, modelData] of Object.entries((data as ModelScoresJson).models)) {
        const baseline = modelData.scores.baseline;
        if (!baseline) continue;

        const principles: PrincipleScore[] = [];
        for (const [principleId, name] of principleMap) {
          if (baseline[principleId] !== undefined) {
            principles.push({ id: principleId, name, score: baseline[principleId] });
          }
        }

        modelEntries.push({
          id: modelId,
          displayName: modelData.displayName,
          provider: modelData.provider,
          humaneScore: baseline.HumaneScore ?? 0,
          principles,
        });
      }

      // Group by provider, sorted by provider order then by score within each group
      const grouped = new Map<string, ModelEntry[]>();
      for (const entry of modelEntries) {
        if (!grouped.has(entry.provider)) grouped.set(entry.provider, []);
        grouped.get(entry.provider)!.push(entry);
      }

      this.providerGroups = PROVIDER_ORDER
        .filter(p => grouped.has(p))
        .map(provider => ({
          provider,
          models: grouped.get(provider)!.sort((a, b) => b.humaneScore - a.humaneScore),
        }));

      this.loading = false;
    } catch (e: unknown) {
      this.error = e instanceof Error ? e.message : 'An error occurred loading model data.';
      this.loading = false;
    }
  },

  methods: {
    scoreColor(score: number): string {
      if (score >= 0.8) return '#2e7d32';
      if (score >= 0.5) return '#f57f17';
      return '#c62828';
    },
  },
});
</script>

<style scoped>
.models-page {
  padding: 1rem;
}

.hero-section {
  padding: 2rem 0 3rem;
}

.hero-title {
  font-family: 'Lora', serif;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #4a4a4a;
  max-width: 700px;
}

.provider-title {
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.model-card {
  background: #fff;
  border: 1px solid #e0d8c8;
  transition: box-shadow 0.2s ease;
}

.model-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.model-name {
  font-family: 'Lora', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1a1a1a;
}

.humane-score-label {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.humane-score-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.principles-list {
  border-top: 1px solid #e8e0d0;
}

.principle-row {
  padding: 0.45rem 0;
  border-bottom: 1px solid #f0e8d8;
}

.principle-name {
  font-size: 0.85rem;
  color: #4a4a4a;
}

.principle-score {
  font-size: 0.85rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .models-page {
    padding: 0.5rem;
  }

  .hero-section {
    padding: 1rem 0 2rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .provider-title {
    font-size: 1.25rem;
  }
}
</style>
