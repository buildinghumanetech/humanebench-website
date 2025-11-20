<template>
  <v-card class="pa-8 mb-12 elevation-2" rounded="lg">
    <div v-for="(event, index) in events" :key="index" :class="{ 'mb-8': index < events.length - 1 }">
      <h3 class="text-h5 font-weight-semibold mb-3 d-flex align-center gap-2">
        <v-icon size="28">mdi-calendar-star</v-icon>
        {{ event.title }}
      </h3>
      <p class="text-body-1 text-grey-darken-2 mb-4">
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
