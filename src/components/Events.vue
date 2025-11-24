<template>
  <v-card class="p-8 md:p-6 sm:p-4 mb-4 shadow-md rounded-lg">
    <div v-for="(event, index) in events" :key="index" :class="{ 'mb-8': index < events.length - 1 }">
      <h3 class="text-2xl md:text-xl sm:text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap" :class="{ 'mt-0': index === 0 }">
        <v-icon size="28">mdi-calendar-star</v-icon>
        {{ event.title }}
      </h3>
      <p class="text-base text-gray-700 mb-4">
        {{ event.description }}
      </p>
      <v-btn
        color="black"
        class="text-white text-none"
        rounded="lg"
        :href="event.link"
        target="_blank"
      >
        Register here
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Event {
  title: string;
  description: string;
  link: string;
}

export default defineComponent({
  name: 'Events',

  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true
    }
  }
});
</script>
