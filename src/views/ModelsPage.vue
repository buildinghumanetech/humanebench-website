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
            <NutritionLabel :model="model" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PRINCIPLES } from '@/constants/principles';
import NutritionLabel from '@/components/NutritionLabel.vue';

export interface PrincipleScore {
  id: string;
  name: string;
  score: number;
}

export interface ModelEntry {
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

  components: {
    NutritionLabel,
  },

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
