<template>
  <div class="container mx-auto px-6 py-12 max-w-7xl">
    <!-- Breadcrumb -->
    <nav class="mb-6 text-sm text-gray-600">
      <router-link to="/" class="hover:text-gray-900">Home</router-link>
      <span> / </span>
      <router-link to="/models" class="hover:text-gray-900">Models</router-link>
      <span> / </span>
      <span class="text-gray-900">{{ modelName }}</span>
    </nav>

    <!-- Not Found -->
    <div v-if="!modelName">
      <h1 class="text-3xl font-bold mb-4">Model Not Found</h1>
      <p class="text-gray-700 mb-6">The model you're looking for doesn't exist.</p>
      <router-link to="/models" class="text-blue-600 hover:underline">
        ← Back to Models
      </router-link>
    </div>

    <!-- Incomplete Data -->
    <div v-else-if="!hasCompleteData">
      <h1 class="text-3xl font-bold mb-4">Incomplete Data</h1>
      <p class="text-gray-700 mb-6">This model doesn't have complete evaluation data.</p>
      <router-link to="/models" class="text-blue-600 hover:underline">
        ← Back to Models
      </router-link>
    </div>

    <!-- Model Details -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ modelName }}</h1>
        <div :class="[
          'inline-block px-4 py-2 rounded-lg border-2 font-semibold',
          humanenessLevel.color
        ]">
          {{ humanenessLevel.level }}
        </div>
        <p class="mt-4 text-lg text-gray-700">{{ humanenessLevel.description }}</p>
      </div>

      <!-- Key Metrics -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">Bad Persona Score</h3>
          <p :class="[
            'text-3xl font-bold px-3 py-2 rounded border',
            getScoreColorClass(badPersona.humaneScore)
          ]">
            {{ formatScore(badPersona.humaneScore) }}
          </p>
          <p class="text-sm text-gray-600 mt-2">When manipulated with anti-user instructions</p>
        </div>
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">Good Persona Score</h3>
          <p :class="[
            'text-3xl font-bold px-3 py-2 rounded border',
            getScoreColorClass(goodPersona.humaneScore)
          ]">
            {{ formatScore(goodPersona.humaneScore) }}
          </p>
          <p class="text-sm text-gray-600 mt-2">When prompted with humane instructions</p>
        </div>
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">Steerability</h3>
          <p :class="[
            'text-3xl font-bold px-3 py-2 rounded border',
            steerability > 1 ? 'text-red-700 bg-red-50 border-red-200' : 'text-blue-700 bg-blue-50 border-blue-200'
          ]">
            {{ formatScore(steerability) }}
          </p>
          <p class="text-sm text-gray-600 mt-2">Difference between good and bad persona</p>
          <p v-if="steerability > 1" class="text-xs text-red-600 mt-2 font-semibold">
            ⚠️ High steerability - easily manipulated
          </p>
        </div>
      </div>

      <!-- Steerability Analysis -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Steerability Analysis</h2>
        <div class="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
          <p class="text-gray-800">
            <strong>Steerability: {{ formatScore(steerability) }}</strong> - This measures how much the model's behavior changes between good and bad persona conditions. 
            A high steerability score (above 1.0) indicates the model is <strong>easily manipulated</strong> and can flip from helpful to harmful with simple prompts. 
            This is the same vulnerability that has led to real-world incidents where AI chatbots became sycophantic and caused mental health crises.
          </p>
          <p v-if="steerability > 1.0" class="text-red-800 mt-3 font-semibold">
            ⚠️ This model shows high steerability, meaning it's vulnerable to manipulation. Users should be aware that this model can be easily steered toward harmful behavior.
          </p>
          <p v-else-if="steerability <= 0.5" class="text-green-800 mt-3 font-semibold">
            ✓ This model shows low steerability, meaning it maintains its integrity even when given manipulative instructions. This is a sign of robust safety training.
          </p>
        </div>
      </section>

      <!-- Detailed Scores Table -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Detailed Scores</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-left font-semibold">Principle</th>
                <th class="border border-gray-300 p-3 text-center font-semibold">Bad Persona</th>
                <th class="border border-gray-300 p-3 text-center font-semibold">Baseline</th>
                <th class="border border-gray-300 p-3 text-center font-semibold">Good Persona</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="key in principleKeys" :key="key" class="hover:bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">{{ principleNames[key] }}</td>
                <td :class="[
                  'border border-gray-300 p-3 text-center font-semibold',
                  getScoreColorClass(badPersona[key])
                ]">
                  {{ formatScore(badPersona[key]) }}
                </td>
                <td :class="[
                  'border border-gray-300 p-3 text-center font-semibold',
                  getScoreColorClass(baseline[key])
                ]">
                  {{ formatScore(baseline[key]) }}
                </td>
                <td :class="[
                  'border border-gray-300 p-3 text-center font-semibold',
                  getScoreColorClass(goodPersona[key])
                ]">
                  {{ formatScore(goodPersona[key]) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Key Insights -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Key Insights</h2>
        <div class="space-y-4">
          <!-- Weakest Principle -->
          <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Weakest Principle: {{ weakestPrinciple.name }}</h3>
            <p class="text-gray-800">
              This model scores lowest on <strong>{{ weakestPrinciple.name }}</strong> in the bad persona test ({{ formatScore(weakestPrinciple.score) }}). 
              This is a critical vulnerability that could lead to harmful outcomes, especially given recent incidents where models failed to respect user attention and boundaries.
            </p>
          </div>

          <!-- Strongest Principle -->
          <div class="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Strongest Principle: {{ strongestPrinciple.name }}</h3>
            <p class="text-gray-800">
              This model maintains the strongest performance on <strong>{{ strongestPrinciple.name }}</strong> even under manipulative conditions ({{ formatScore(strongestPrinciple.score) }}). 
              This suggests robust training in this area.
            </p>
          </div>

          <!-- Improvement Potential -->
          <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Improvement with Humane Prompting</h3>
            <p class="text-gray-800">
              When explicitly prompted with humane instructions, this model improves by <strong>{{ formatScore(improvement) }}</strong> points. 
              This shows that the model <strong>can</strong> be more humane, but requires explicit prompting to do so. 
              The concern is whether it can maintain this behavior when given manipulative instructions instead.
            </p>
          </div>
        </div>
      </section>

      <!-- Real-World Implications -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Real-World Implications</h2>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p class="text-gray-800 mb-4">
            Based on this model's performance in HumaneBench, here's what users and developers should know:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-800">
            <li v-if="badPersona.humaneScore < 0">
              <strong>High Risk:</strong> This model scored negatively in the bad persona test, meaning it can be easily manipulated into harmful behavior. 
              This aligns with real-world incidents where AI chatbots became sycophantic, over-validating, and caused mental health crises.
            </li>
            <li v-if="steerability > 1.0">
              <strong>High Steerability:</strong> This model shows significant vulnerability to manipulation. Simple prompts can flip it from helpful to harmful, 
              which is the same vulnerability that has led to documented cases of AI-induced delusional thinking and addiction.
            </li>
            <li v-if="badPersona.respectUserAttention < 0">
              <strong>Attention Risks:</strong> This model fails to respect user attention boundaries, which could contribute to unhealthy engagement patterns 
              and the mental health issues seen in heavy AI users.
            </li>
            <li v-if="badPersona.beTransparentAndHonest < 0">
              <strong>Transparency Issues:</strong> This model struggles with transparency, which could lead to users over-trusting the AI or not understanding its limitations.
            </li>
            <li v-if="badPersona.humaneScore >= 0.5">
              <strong>Resilient:</strong> This model maintains humane behavior even under manipulative conditions, suggesting robust safety training. 
              However, users should still be aware of its limitations and use it responsibly.
            </li>
          </ul>
        </div>
      </section>

      <!-- Navigation to Other Models -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Compare with Other Models</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link
            v-for="name in otherModels"
            :key="name"
            :to="`/models/${slugifyModelName(name)}`"
            class="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 class="font-semibold text-gray-900">{{ name }}</h3>
            <p class="text-sm text-gray-600 mt-1">
              Bad Persona: {{ formatScore(getModelData(name).badPersona?.humaneScore ?? 0) }}
            </p>
          </router-link>
        </div>
        <div class="mt-6">
          <router-link to="/models" class="inline-block text-blue-600 hover:underline font-semibold">
            View All Models →
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getModelBySlug, getModelData, getAllModelNames, slugifyModelName, type ModelScore } from '@/lib/modelData';

const principleNames: Record<keyof Omit<ModelScore, 'model'>, string> = {
  humaneScore: 'Humane Score',
  respectUserAttention: 'Respect User Attention',
  enableMeaningfulChoices: 'Enable Meaningful Choices',
  enhanceHumanCapabilities: 'Enhance Human Capabilities',
  protectDignityAndSafety: 'Protect Dignity and Safety',
  fosterHealthyRelationships: 'Foster Healthy Relationships',
  prioritizeLongTermWellbeing: 'Prioritize Long-term Wellbeing',
  beTransparentAndHonest: 'Be Transparent and Honest',
  designForEquityAndInclusion: 'Design for Equity and Inclusion',
};

const principleKeys = Object.keys(principleNames).filter(k => k !== 'humaneScore') as Array<keyof Omit<ModelScore, 'model' | 'humaneScore'>>;

function getHumanenessLevel(humaneScore: number): { level: string; description: string; color: string } {
  if (humaneScore >= 0.8) {
    return {
      level: 'Highly Humane',
      description: 'This model demonstrates strong adherence to humane principles, even under pressure. It maintains integrity and resists manipulation.',
      color: 'text-green-700 bg-green-50 border-green-600',
    };
  } else if (humaneScore >= 0.5) {
    return {
      level: 'Moderately Humane',
      description: 'This model generally follows humane principles but may have some vulnerabilities to manipulation or areas for improvement.',
      color: 'text-green-600 bg-green-50 border-green-500',
    };
  } else if (humaneScore >= 0) {
    return {
      level: 'Marginally Humane',
      description: 'This model shows mixed results, with some humane behaviors but significant vulnerabilities that could lead to harmful outcomes.',
      color: 'text-yellow-700 bg-yellow-50 border-yellow-500',
    };
  } else if (humaneScore >= -0.3) {
    return {
      level: 'Concerning',
      description: 'This model demonstrates significant failures in humane principles and is vulnerable to manipulation, posing risks to users.',
      color: 'text-orange-700 bg-orange-50 border-orange-500',
    };
  } else {
    return {
      level: 'Highly Vulnerable',
      description: 'This model shows severe failures in humane principles and is easily manipulated into harmful behavior. Use with extreme caution.',
      color: 'text-red-700 bg-red-50 border-red-500',
    };
  }
}

export default defineComponent({
  name: 'ModelDetailPage',
  data() {
    return {};
  },
  computed: {
    modelName(): string | null {
      const slug = this.$route.params.slug as string;
      return getModelBySlug(slug);
    },
    modelData() {
      if (!this.modelName) return null;
      return getModelData(this.modelName);
    },
    hasCompleteData(): boolean {
      return !!(this.modelData?.badPersona && this.modelData?.goodPersona && this.modelData?.baseline);
    },
    badPersona(): ModelScore | null {
      return this.modelData?.badPersona ?? null;
    },
    goodPersona(): ModelScore | null {
      return this.modelData?.goodPersona ?? null;
    },
    baseline(): ModelScore | null {
      return this.modelData?.baseline ?? null;
    },
    steerability(): number {
      if (!this.badPersona || !this.goodPersona) return 0;
      return this.goodPersona.humaneScore - this.badPersona.humaneScore;
    },
    humanenessLevel() {
      if (!this.badPersona) return { level: '', description: '', color: '' };
      return getHumanenessLevel(this.badPersona.humaneScore);
    },
    weakestPrinciple() {
      if (!this.badPersona) return { name: '', score: 0 };
      let weakestKey: keyof Omit<ModelScore, 'model' | 'humaneScore'> = principleKeys[0];
      let weakestScore = (this.badPersona[weakestKey] as number);
      for (const key of principleKeys) {
        const score = (this.badPersona[key] as number);
        if (score < weakestScore) {
          weakestKey = key;
          weakestScore = score;
        }
      }
      return {
        name: principleNames[weakestKey],
        score: weakestScore
      };
    },
    strongestPrinciple() {
      if (!this.badPersona) return { name: '', score: 0 };
      let strongestKey: keyof Omit<ModelScore, 'model' | 'humaneScore'> = principleKeys[0];
      let strongestScore = (this.badPersona[strongestKey] as number);
      for (const key of principleKeys) {
        const score = (this.badPersona[key] as number);
        if (score > strongestScore) {
          strongestKey = key;
          strongestScore = score;
        }
      }
      return {
        name: principleNames[strongestKey],
        score: strongestScore
      };
    },
    improvement(): number {
      if (!this.goodPersona || !this.baseline) return 0;
      return this.goodPersona.humaneScore - this.baseline.humaneScore;
    },
    otherModels(): string[] {
      return getAllModelNames()
        .filter(name => name !== this.modelName)
        .slice(0, 6);
    }
  },
  methods: {
    slugifyModelName,
    getModelData,
    formatScore(score: number): string {
      return score >= 0 ? `+${score.toFixed(2)}` : score.toFixed(2);
    },
    getScoreColorClass(score: number): string {
      if (score >= 0.8) return 'text-green-700 bg-green-50 border-green-200';
      if (score >= 0.5) return 'text-green-600 bg-green-50 border-green-200';
      if (score >= 0) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      if (score >= -0.3) return 'text-orange-700 bg-orange-50 border-orange-200';
      return 'text-red-700 bg-red-50 border-red-200';
    }
  }
});
</script>

