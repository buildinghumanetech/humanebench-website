<template>
  <div class="model-not-found text-center py-16">
    <v-icon size="64" color="grey-lighten-1" class="mb-6">mdi-robot-confused-outline</v-icon>
    <h2 class="not-found-title mb-4">Model Not Found</h2>
    <p class="not-found-text mb-8">
      The model you're looking for doesn't exist or may have been removed.
    </p>
    <v-btn
      variant="outlined"
      color="#5539EC"
      @click="$router.push({ name: 'models' })"
    >
      <v-icon left>mdi-arrow-left</v-icon>
      Back to All Models
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelNotFound',
});
</script>

<style scoped>
.not-found-title {
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
}

.not-found-text {
  font-size: 1.1rem;
  color: #4a4a4a;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
