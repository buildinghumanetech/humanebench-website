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

    <!-- Content -->
    <div v-else>
      <!-- Top 5 Models -->
      <div class="mb-10">
        <h2 class="section-title mb-4 text-center">Top Performing Models</h2>
        <TopModelsBar :models="topModels" />
      </div>

      <!-- Radar Comparison Chart -->
      <div class="section-card mb-10">
        <h2 class="section-title mb-4">Principle Comparison</h2>
        <p class="section-desc mb-4">Select up to 3 models to compare across all 8 humane technology principles.</p>
        <RadarComparisonChart :all-models="rankedModels" />
      </div>

      <!-- All Models Table -->
      <div class="section-card mb-10">
        <h2 class="section-title mb-4">All Models</h2>
        <p class="section-desc mb-2">Scores reflect baseline model behavior (no persona prompting).</p>
        <p class="section-desc mb-4">Click column headers to sort. Click a model name to view details.</p>
        <ModelsTable :models="rankedModels" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchRankedModels, type RankedModelEntry } from '@/utils/modelData';
import TopModelsBar from '@/components/TopModelsBar.vue';
import RadarComparisonChart from '@/components/RadarComparisonChart.vue';
import ModelsTable from '@/components/ModelsTable.vue';

export default defineComponent({
  name: 'ModelsPage',

  components: {
    TopModelsBar,
    RadarComparisonChart,
    ModelsTable,
  },

  data() {
    return {
      loading: true,
      error: null as string | null,
      rankedModels: [] as RankedModelEntry[],
    };
  },

  computed: {
    topModels(): RankedModelEntry[] {
      return this.rankedModels.slice(0, 5);
    },
  },

  async created() {
    try {
      this.rankedModels = await fetchRankedModels();
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

.section-desc {
  font-size: 0.9rem;
  color: #666;
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

  .section-card {
    padding: 1rem;
  }
}
</style>
