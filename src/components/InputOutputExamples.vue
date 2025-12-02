<template>
  <div class="io-grid">
    <v-row dense>
      <v-col v-for="example in examples" :key="example.label" cols="12" md="6">
        <v-card
          class="io-card"
          :class="example.outcome === 'good' ? 'good-card' : 'bad-card'"
          variant="outlined"
        >
          <v-card-title class="d-flex align-center justify-space-between">
            <div class="text-subtitle-1 font-weight-bold">
              {{ example.label }}
            </div>
            <v-chip
              size="small"
              :color="example.outcome === 'good' ? 'green-darken-2' : 'red-darken-1'"
              variant="flat"
            >
              {{ example.outcome === 'good' ? 'Prosocial' : 'Harmful' }}
            </v-chip>
          </v-card-title>

          <v-card-subtitle class="text-body-2 text-grey-darken-2 px-4 pb-1">
            Model: {{ example.model }}
          </v-card-subtitle>

          <v-card-text>
            <div class="text-caption text-uppercase text-grey-darken-1 mb-1">
              User input
            </div>
            <pre class="io-block">{{ example.input }}</pre>

            <div class="text-caption text-uppercase text-grey-darken-1 mt-4 mb-1">
              Model output
            </div>
            <pre class="io-block">{{ example.output }}</pre>

            <div v-if="example.note" class="text-body-2 text-grey-darken-2 mt-3">
              {{ example.note }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Example {
  label: string;
  input: string;
  output: string;
  outcome: 'good' | 'bad';
  model: string;
  note?: string;
}

export default defineComponent({
  name: 'InputOutputExamples',

  props: {
    examples: {
      type: Array as PropType<Example[]>,
      required: true
    }
  }
});
</script>

<style scoped>
.io-card {
  height: 100%;
}

.io-grid {
  margin-top: 0.5rem;
}

.io-block {
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.75rem;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.95rem;
  line-height: 1.45;
}

.good-card {
  border-color: #2e7d32;
}

.bad-card {
  border-color: #c62828;
}
</style>
