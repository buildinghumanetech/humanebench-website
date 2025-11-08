<template>
  <div class="pa-8">
    <v-container fluid class="mx-auto">
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

      <v-row class="mb-4">
        <v-col cols="12">
          <div>
            <div class="d-flex flex-column ga-1">
              <div v-for="(modelData, modelName) in models" :key="modelName" class="d-flex ga-1">
                <div class="font-weight-medium pa-2 text-body-2 bg-transparent w-[180px] flex-shrink-0 d-flex align-center">
                  {{ getModelName(modelName) }}
                </div>
                <div v-for="(score, index) in getScores(modelData)" :key="index"
                     class="w-[80px] flex-shrink-0">
                  <div :class="getScoreColorClass(score)"
                    class="pa-2 rounded-lg d-flex align-center justify-center font-weight-bold text-caption h-100 cursor-pointer opacity-100 hover:opacity-80 transition-opacity"
                    @mouseenter="showTooltip(principles[index].name)"
                    @mouseleave="hideTooltip">
                    {{ formatScore(score) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex ga-1 position-relative mt-2 ml-[140px] h-[150px]">
              <div v-for="category in principles" :key="category.id"
                class="position-relative flex-shrink-0 w-[80px]">
                <div class="text-caption font-weight-medium position-absolute right-0 whitespace-nowrap rotate-label">
                  {{ category.name }}
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-card v-if="tooltipVisible"
        class="position-fixed elevation-8 rounded-lg pa-4 bg-amber-lighten-5 bottom-[40px] right-[24px] w-[340px] z-[1000] pointer-events-none transition-opacity"
        :class="{ 'opacity-100': tooltipVisible, 'opacity-0': !tooltipVisible }">
        <h3 class="text-h6 font-weight-bold mb-3">{{ popupData.name }}</h3>
        <p class="whitespace-pre-line">{{ popupData.detail }}</p>
      </v-card>

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

interface Principle {
  id: string;
  name: string;
  detail: string;
}

interface Metric {
  value: number;
}

interface ModelMetrics {
  [key: string]: Metric | undefined;
  HumaneScore?: Metric;
}

interface PopupData {
  name: string;
  detail: string;
}

export default defineComponent({
  name: 'HumaneBenchDashboard',

  data() {
    return {
      tooltipVisible: false,
      popupData: { name: '', detail: '' } as PopupData,

      principles: [
        {
          id: 'HumaneScore',
          name: 'HumaneScore',
          detail: 'Average score across all principles from LLM'
        },
        {
          id: 'respect-user-attention',
          name: 'Respect User Attention',
          detail: `Technology should respect user attention as a finite, precious resource.
            - Minimize unnecessary interruptions and notifications
            - Avoid exploiting psychological vulnerabilities to capture attention
            - Design interfaces that help users focus on what matters to them
            - Provide clear signals when seeking user attention`
        },
        {
          id: 'enable-meaningful-choices',
          name: 'Enable Meaningful Choices',
          detail: `Technology should empower users with meaningful choices and control.
            - Present genuine choices, not manipulative illusions of choice
            - Provide transparent information about consequences of choices
            - Make defaults ethical and aligned with user wellbeing
            - Allow users to understand and modify how systems make decisions about them`
        },
        {
          id: 'enhance-human-capabilities',
          name: 'Enhance Human Capabilities',
          detail: `Technology should complement and enhance human capabilities, not replace or diminish them.
            - Support human autonomy and decision-making
            - Design for collaboration between human intelligence and machine capabilities
            - Avoid creating dependencies that diminish human skills
            - Foster learning and growth through appropriate challenges`
        },
        {
          id: 'protect-dignity-and-safety',
          name: 'Protect Dignity and Safety',
          detail: `Technology should protect human dignity, privacy, and safety.
            - Respect user privacy and secure personal data
            - Design systems that protect vulnerable users
            - Prevent harassment and abuse
            - Avoid manipulative dark patterns that undermine dignity`
        },
        {
          id: 'foster-healthy-relationships',
          name: 'Foster Healthy Relationships',
          detail: `Technology should foster healthy relationships with devices, systems, and other people.
            - Support authentic human connection
            - Design interactions that respect appropriate boundaries
            - Create systems that encourage empathy and understanding
            - Avoid features that exploit social comparison or encourage antisocial behavior`
        },
        {
          id: 'prioritize-long-term-wellbeing',
          name: 'Prioritize Long-term Wellbeing',
          detail: `Technology should prioritize long-term user wellbeing over short-term engagement metrics.
            - Consider psychological impacts of design choices
            - Resist optimizing solely for engagement or time spent
            - Design for sustainable use that enhances quality of life
            - Build awareness of how technology affects wellbeing`
        },
        {
          id: 'be-transparent-and-honest',
          name: 'Be Transparent and Honest',
          detail: `Technology should be transparent about its operations and honest about its capabilities.
            - Disclose how systems work and make decisions
            - Avoid deceptive interfaces or interactions
            - Clearly communicate system limitations and capabilities
            - Make algorithms and data use understandable to users`
        },
        {
          id: 'design-for-equity-and-inclusion',
          name: 'Design for Equity and Inclusion',
          detail: `Technology should be accessible and beneficial to diverse populations.
            - Design for accessibility across abilities
            - Test with diverse users to uncover unintended consequences
            - Address bias in data, algorithms, and design
            - Consider impacts across different communities and contexts`
        }
      ] as Principle[],

      models: {} as Record<string, ModelMetrics>
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      const context = require.context('../eval_results', true, /header\.json$/);
      context.keys().forEach((filePath: string) => {
        const parts = filePath.split('/');
        const modelName = parts[1];
        const data = context(filePath);
        this.models[modelName] = data.results.scores[0].metrics as ModelMetrics;
      });
    },

    getScores(modelData: ModelMetrics): number[] {
      return this.principles.map(p => modelData[p.id]?.value ?? 0);
    },

    getModelName(key: string): string {
      return key.charAt(0).toUpperCase() + key.slice(1).replaceAll('-', ' ');
    },

    formatScore(score: number): string {
      return score.toFixed(2);
    },

    getScoreColorClass(score: number): string {
      if (score >= 0.5) return 'bg-green-500 text-white';
      if (score >= 0.1) return 'bg-yellow-300 text-black';
      if (score >= -0.1) return 'bg-yellow-400 text-black';
      if (score >= -0.5) return 'bg-red-400 text-white';
      return 'bg-red-600 text-white';
    },

    showTooltip(hoveredPrinciple: string) {
      const principle = this.principles.find(p => p.name === hoveredPrinciple);

      this.popupData = {
        name: principle?.name ?? '',
        detail: principle?.detail ?? ''
      };

      this.tooltipVisible = true;
    },

    hideTooltip() {
      this.tooltipVisible = false;
    }
  }
});
</script>
