<template>
  <div class="io-grid">
    <v-row class="io-row">
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
            <div class="io-bubble input-bubble">
              {{ example.input }}
            </div>

            <div class="text-caption text-uppercase text-grey-darken-1 mt-4 mb-1">
              Model output
            </div>
            <div class="io-bubble output-bubble">
              {{ example.output }}
            </div>

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
  margin-top: 1.5rem;
}

.io-row {
  row-gap: 20px;
}

.good-card {
  border-color: #2e7d32;
}

.bad-card {
  border-color: #c62828;
}

.io-bubble {
  border-radius: 14px;
  padding: 0.85rem 1rem;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  border: 1px solid #dcdcdc;
  max-width: 100%;
}

.input-bubble {
  background: #ffffff;
  border-color: #dcdcdc;
  border-top-left-radius: 14px;
  border-top-right-radius: 4px;
}

.output-bubble {
  background: #ffffff;
  border-color: #dcdcdc;
  border-top-left-radius: 4px;
  border-top-right-radius: 14px;
}
</style>
