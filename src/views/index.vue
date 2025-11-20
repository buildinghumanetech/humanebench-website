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

      <!-- Steerability Chart -->
      <h3 class="text-h5 font-weight-bold mb-6">Steerability</h3>
      <v-row class="mb-12">
        <v-col cols="12">
          <img
            src="/steerability_candlestick.svg"
            alt="Steerability Analysis"
            class="w-full"
          />
          <p class="text-caption text-grey-darken-1 mt-2 text-center">
            Steerability refers to how easily an AI model's behavior can be influenced or changed through instructions. We measured steerability in humane and anti-humane directions.
          </p>
        </v-col>
      </v-row>

      <!-- Conclusion -->
      <h2 class="text-h4 font-weight-bold mb-6">Conclusion</h2>
      <v-row class="">
        <v-col cols="12">
          <p class="text-body-1 text-grey-darken-2 mb-6">
          HumaneBench demonstrates that evaluating AI systems requires assessing both humane defaults and bidirectional steerability. While all models exhibit at least acceptable baseline humaneness (HumaneScores > 0.5) and positive steerability (+17% average improvement with humane prompting), 71% catastrophically fail under adversarial pressure—easily flipping from humane to actively harmful behavior with simple prompt manipulation.
          </p>

          <p class="text-body-1 text-grey-darken-2 mb-6">
This steerability asymmetry—universal success in positive steering but 71% failure in preventing negative steering—reveals the central deployment challenge: good defaults are insufficient when adversarial prompts can subvert most models' safety training. Only 21% of models (Claude Sonnet 4.5, GPT-5, Claude Opus 4.1) maintain humane principles under adversarial pressure, suggesting fundamental differences in safety training approaches across labs.
          </p>

          <p class="text-body-1 text-grey-darken-2 mb-6">
Longitudinal analysis across 4 major labs reveals uneven progress. Anthropic (2/3 robust) and OpenAI (achieved robustness in GPT-5) have solved single-turn adversarial steering resistance. Google and Meta show gradual improvement, but without achieving robustness. The principle-level analysis highlights that user empowerment dimensions (Enable Meaningful Choices, Design for Equity & Inclusion, Enhance Human Capabilities) are most vulnerable to adversarial manipulation, with models compromising user agency before other humane principles.
          </p>

          <p class="text-body-1 text-grey-darken-2 mb-6">
We suggest using humane system prompts, such as the one in our repo, as a first step towards creating more humane LLM chatbots, agents and companions. Future work includes extending our benchmark to multi-turn dialogues, and creating training datasets for humane AI.
          </p>
        </v-col>
      </v-row>

      <!-- Our Mission -->
      <!--
      <v-card class="pa-8 elevation-2" rounded="lg">
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
      -->

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
