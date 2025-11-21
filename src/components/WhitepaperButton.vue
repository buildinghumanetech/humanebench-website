<template>
  <div class="text-center my-8">
    <v-btn
      color="black"
      class="text-white text-none"
      rounded="lg"
      @click="$router.push({ name: 'whitepaper' })"
    >
      Read the Whitepaper
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WhitepaperButton',
});
</script>
