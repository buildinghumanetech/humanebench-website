<template>
  <div class="pa-8">
    <v-container fluid class="mx-auto">
      <!-- Hero -->
      <v-row class="mb-8">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold mb-2">HumaneBench.ai</h1>
          <p class="text-body-1 text-grey-darken-2">
            Humans build tech, so why can't tech be humane?
          </p>
        </v-col>
      </v-row>

      <!--
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <h2 class="text-h4 font-weight-bold mb-4">
            A bold headline<br>that delivers
          </h2>
          <p class="text-body-1 text-grey-darken-1 mb-6">
            Go ahead and say just a little more about what you do.
          </p>
          <v-btn 
            color="black" 
            class="text-white text-none"
            size="large"
            rounded="lg"
            @click="$router.push({ name: 'humaneBench' })"
          >
            Call to action
          </v-btn>
        </v-col>

        <v-col cols="12" md="6" class="d-flex flex-column justify-start">
          <div class="d-flex align-center mb-4 pl-32">
            <span class="bg-green-500 text-white font-weight-bold px-4 py-2 rounded-circle mr-4">S</span>
            <img src="../assets/images/icons/openai.png" class="mr-4 h-8 w-auto" />
            <span class="text-body-1 font-weight-medium">OpenAI ChatGPT 5.0</span>
          </div>

          <div class="d-flex align-center mb-4 pl-24">
            <span class="bg-yellow-400 text-black font-weight-bold px-4 py-2 rounded-circle mr-4">A</span>
            <img src="../assets/images/icons/claude.png" class="mr-4 h-8 w-auto" />
            <span class="text-body-1 font-weight-medium">Anthropic Claude 4.5</span>
          </div>

          <div class="d-flex align-center pl-16">
            <span class="bg-orange-400 text-black font-weight-bold px-4 py-2 rounded-circle mr-4">B</span>
            <img src="../assets/images/icons/gemini.png" class="mr-4 h-8 w-auto" />
            <span class="text-body-1 font-weight-medium">Google Gemini 2.5 Pro</span>
          </div>
        </v-col>
      </v-row>
      -->

      <!-- Overview -->
      <h2 class="text-h4 font-weight-bold mb-6">Overview</h2>
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <p class="text-body-1 text-grey-darken-2">
            We are developing HumaneBench, a comprehensive benchmark designed to promote humane AI by identifying constructive patterns in large language models (LLMs).
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="text-body-1 text-grey-darken-2">
            Our framework applies <a href="https://github.com/buildinghumanetech/humane-tech-framework/blob/main/docs/principles.md">humane principles</a> to create positive evaluation criteria that encourage transparent, respectful, and genuinely helpful AI interactions.
          </p>
        </v-col>
      </v-row>

      <!-- Benchmark Primary Infographic -->
      <v-row class="mb-4">
        <v-col cols="12">
          <div class="position-relative">
            <!-- Left Arrow -->
            <v-btn
              v-if="showLeftArrow"
              icon
              class="position-absolute z-10 bg-white elevation-2"
              style="left: -56px; top: 50%; transform: translateY(-50%);"
              @click="scrollLeft"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <!-- Right Arrow -->
            <v-btn
              v-if="showRightArrow"
              icon
              class="position-absolute z-10 bg-white elevation-2"
              style="right: -56px; top: 50%; transform: translateY(-50%);"
              @click="scrollRight"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>

            <!-- Scroll Container -->
            <div
              ref="scrollContainer"
              class="overflow-x-auto snap-x snap-mandatory flex pb-4"
              @scroll="updateArrows"
            >
              <!-- Bad Persona Panel -->
              <div class="snap-center flex-shrink-0 w-full">
                <h3 class="text-h5 font-weight-bold mb-3">Bad Persona</h3>
                <p class="text-body-2 text-grey-darken-2 mb-4">
                  Models evaluated with system instructions that encourage manipulative, anti-user behavior.
                </p>
                <ScoreGrid :data-path="'bad_persona'" :principles="principles" />
              </div>

              <!-- Good Persona Panel -->
              <div class="snap-center flex-shrink-0 w-full">
                <h3 class="text-h5 font-weight-bold mb-3">Good Persona</h3>
                <p class="text-body-2 text-grey-darken-2 mb-4">
                  Models evaluated with system instructions that encourage humane, user-centered behavior.
                </p>
                <ScoreGrid :data-path="'good_persona'" :principles="principles" />
              </div>

              <!-- Baseline Panel -->
              <div class="snap-center flex-shrink-0 w-full">
                <h3 class="text-h5 font-weight-bold mb-3">Baseline</h3>
                <p class="text-body-2 text-grey-darken-2 mb-4">
                  Models evaluated without any specific prompting or system instructions related to humane principles.
                </p>
                <ScoreGrid :data-path="'baseline'" :principles="principles" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Our Mission -->
      <v-card class="pa-8 mb-12 elevation-2" rounded="lg">
        <v-row class="align-center">
          <v-col cols="12" md="4" class="d-flex justify-center">
            <img
              src="../assets/images/logos/building_humane_tech.webp"
              class="h-32 w-auto"
            />
          </v-col>
          <v-col cols="12" md="8">
            <h2 class="text-h5 font-weight-semibold mb-3">Our Mission</h2>
            <p class="text-body-1 text-grey-darken-2 mb-4">
              Make it easy, scalable and profitable to build tech humanely.
            </p>
            <v-btn 
              color="black" 
              class="text-white text-none"
              rounded="lg"
              href="https://www.buildinghumanetech.com/" 
              target="_blank"
            >
              Check us out
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

    </v-container>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ScoreGrid from '@/components/ScoreGrid.vue';
import { PRINCIPLES } from '@/constants/principles';

export default defineComponent({
  name: 'HumaneBenchDashboard',

  components: {
    ScoreGrid
  },

  data() {
    return {
      principles: PRINCIPLES,
      showLeftArrow: false,
      showRightArrow: true
    };
  },

  mounted() {
    this.updateArrows();
  },

  methods: {
    scrollLeft() {
      const container = this.$refs.scrollContainer as HTMLElement;
      if (container) {
        container.scrollBy({
          left: -container.clientWidth,
          behavior: 'smooth'
        });
      }
    },

    scrollRight() {
      const container = this.$refs.scrollContainer as HTMLElement;
      if (container) {
        container.scrollBy({
          left: container.clientWidth,
          behavior: 'smooth'
        });
      }
    },

    updateArrows() {
      const container = this.$refs.scrollContainer as HTMLElement;
      if (!container) return;

      // Show left arrow if not at the start
      this.showLeftArrow = container.scrollLeft > 10;

      // Show right arrow if not at the end
      const maxScroll = container.scrollWidth - container.clientWidth;
      this.showRightArrow = container.scrollLeft < maxScroll - 10;
    }
  }
});
</script>
