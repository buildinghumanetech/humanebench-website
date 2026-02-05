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
            <router-link
              :to="{ name: 'model-detail', params: { modelId: model.id } }"
              class="model-link"
            >
              <NutritionLabel :model="model" :clickable="true" />
            </router-link>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchProviderGroups, type ProviderGroup } from '@/utils/modelData';
import NutritionLabel from '@/components/NutritionLabel.vue';

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
      this.providerGroups = await fetchProviderGroups();
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

.model-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
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
