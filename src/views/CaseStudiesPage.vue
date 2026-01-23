<template>
  <div class="case-studies-page">
    <!-- Hero Section -->
    <div class="hero-section mb-12">
      <div class="hero-content text-center">
        <h1 class="hero-title mb-6">
          Real-World Stories of Building Humane AI
        </h1>
        <p class="hero-subtitle mx-auto">
          Discover how organizations are implementing humane AI principles in production.
          These case studies showcase practical approaches to measuring and improving
          AI humaneness at scale.
        </p>
      </div>
    </div>

    <!-- Case Studies Grid -->
    <div class="case-studies-grid">
      <CaseStudyCard
        v-for="(caseStudy, index) in caseStudies"
        :key="index"
        :case-study="caseStudy"
        class="mb-6"
      />
    </div>

    <!-- Call to Action -->
    <div class="cta-section mt-12 text-center">
      <v-card class="pa-8 rounded-lg" color="#f8f4eb">
        <h3 class="cta-title mb-4">Have a story to share?</h3>
        <p class="text-grey-darken-2 mb-6 mx-auto" style="max-width: 500px;">
          If you've implemented HumaneBench or humane AI practices in your organization,
          we'd love to feature your experience.
        </p>
        <v-btn
          color="black"
          class="text-white text-none"
          rounded="lg"
          href="mailto:info@buildinghumanetech.com?subject=Case Study Submission"
        >
          <v-icon left size="18" class="mr-2">mdi-email-outline</v-icon>
          Get in touch
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CaseStudyCard, { CaseStudy } from '@/components/CaseStudyCard.vue';

export default defineComponent({
  name: 'CaseStudiesPage',

  components: {
    CaseStudyCard
  },

  data() {
    return {
      caseStudies: [
        {
          title: 'Building Continuous Humane AI Evaluation',
          company: 'Storytell.ai',
          summary: 'Storytell.ai discovered their AI assistant was creating learned helplessness rather than empowering users. By implementing HumaneBench for continuous evaluation, they identified problematic patterns and developed features like "Expert Lens" to prioritize user capability-building over direct answers.',
          link: 'https://humanetech.substack.com/p/how-storytellai-built-continuous',
          image: undefined
        }
      ] as CaseStudy[]
    };
  }
});
</script>

<style scoped>
.case-studies-page {
  padding: 1rem;
}

.hero-section {
  padding: 2rem 0 3rem;
}

.hero-title {
  font-family: 'Lora', serif;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #4a4a4a;
  max-width: 700px;
}

.case-studies-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cta-title {
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .case-studies-page {
    padding: 0.5rem;
  }

  .hero-section {
    padding: 1rem 0 2rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .cta-title {
    font-size: 1.35rem;
  }
}
</style>
