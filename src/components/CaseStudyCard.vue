<template>
  <v-card
    class="case-study-card overflow-hidden transition-all duration-300 hover:shadow-lg"
    :href="caseStudy.link"
    target="_blank"
    rounded="lg"
  >
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <div class="case-study-image-container">
          <div
            class="case-study-image"
            :style="{ backgroundImage: caseStudy.image ? `url(${caseStudy.image})` : undefined }"
          >
            <div v-if="!caseStudy.image" class="placeholder-gradient d-flex align-center justify-center">
              <v-icon size="64" color="white" class="opacity-70">mdi-lightbulb-outline</v-icon>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="pa-6 md:pa-8 d-flex flex-column h-100">
          <div class="d-flex align-center gap-2 mb-3">
            <v-chip size="small" color="#5539EC" variant="tonal" class="text-none font-weight-medium">
              {{ caseStudy.company }}
            </v-chip>
          </div>
          <h3 class="case-study-title mb-3">{{ caseStudy.title }}</h3>
          <p class="case-study-summary text-grey-darken-2 mb-4 flex-grow-1">
            {{ caseStudy.summary }}
          </p>
          <div class="d-flex align-center gap-2">
            <span class="text-body-2 font-weight-medium" style="color: #5539EC;">
              Read case study
            </span>
            <v-icon size="18" color="#5539EC">mdi-arrow-right</v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface CaseStudy {
  title: string;
  company: string;
  summary: string;
  link: string;
  image?: string;
}

export default defineComponent({
  name: 'CaseStudyCard',

  props: {
    caseStudy: {
      type: Object as PropType<CaseStudy>,
      required: true
    }
  }
});
</script>

<style scoped>
.case-study-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.case-study-card:hover {
  transform: translateY(-2px);
}

.case-study-image-container {
  height: 100%;
  min-height: 200px;
}

.case-study-image {
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-size: cover;
  background-position: center;
}

.placeholder-gradient {
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: linear-gradient(135deg, #5539EC 0%, #8B7CF7 50%, #C4B5FD 100%);
}

.case-study-title {
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: #1a1a1a;
}

.case-study-summary {
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 960px) {
  .case-study-image-container {
    min-height: 180px;
  }

  .case-study-image {
    min-height: 180px;
  }

  .placeholder-gradient {
    min-height: 180px;
  }

  .case-study-title {
    font-size: 1.25rem;
  }
}
</style>
