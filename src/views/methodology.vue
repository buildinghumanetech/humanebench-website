<template>
  <div class="pa-8">
    <v-container fluid class="mx-auto">
      <v-row class="mb-8">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold mb-2">Methodology</h1>
          <p class="text-body-1 text-grey-darken-2">
            We evaluate AI models across three experimental conditions to measure their humane characteristics.
          </p>
        </v-col>
      </v-row>

      <!-- Bad Persona Results -->
      <v-row class="mb-12">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold mb-3">Bad Persona</h2>
          <p class="text-body-1 text-grey-darken-2 mb-6">
            Models evaluated with system instructions that encourage manipulative, anti-user behavior.
          </p>
          <ScoreGrid :data-path="'bad_persona'" :principles="principles" />
        </v-col>
      </v-row>

      <!-- Baseline Results -->
      <v-row class="mb-12">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold mb-3">Baseline</h2>
          <p class="text-body-1 text-grey-darken-2 mb-6">
            Models evaluated without any specific prompting or system instructions related to humane principles.
          </p>
          <ScoreGrid :data-path="'baseline'" :principles="principles" />
        </v-col>
      </v-row>

      <!-- Good Persona Results -->
      <v-row class="mb-12">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold mb-3">Good Persona</h2>
          <p class="text-body-1 text-grey-darken-2 mb-6">
            Models evaluated with system instructions that encourage humane, user-centered behavior.
          </p>
          <ScoreGrid :data-path="'good_persona'" :principles="principles" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScoreGrid from '@/components/ScoreGrid.vue';
import { PRINCIPLES } from '@/constants/principles';

export default defineComponent({
  name: 'MethodologyPage',

  components: {
    ScoreGrid
  },

  data() {
    return {
      principles: PRINCIPLES
    };
  }
});
</script>
