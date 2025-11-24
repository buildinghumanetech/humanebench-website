<template>
  <div class="container mx-auto px-6 py-8 max-w-7xl">
    <div class="mb-6">
      <router-link to="/" class="text-blue-600 hover:text-blue-700 transition-colors mb-4 inline-block">
        ← Back to Home
      </router-link>
    </div>

    <h1 class="text-4xl font-bold mb-3 text-gray-900">Model Comparison</h1>
    <p class="text-lg text-gray-700 mb-10 leading-relaxed">
      Side-by-side comparison of how different AI models perform across humane technology principles
    </p>

    <!-- Key Insights -->
    <div class="grid md:grid-cols-2 gap-6 mb-10">
      <div class="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 shadow-sm">
        <h3 class="text-lg font-bold text-green-900 mb-4">Most Resilient Models</h3>
        <ul class="space-y-3">
          <li v-for="model in resilientModels" :key="model.model" class="flex justify-between items-center">
            <router-link :to="`/models/${slugifyModelName(model.model)}`" class="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              {{ model.model }}
            </router-link>
            <span class="text-green-700 font-semibold">Baseline: {{ formatScore(model.baseline?.humaneScore ?? 0) }}</span>
          </li>
        </ul>
        <p class="text-sm text-green-700 mt-4 leading-relaxed">
          These models maintained positive scores even under adversarial pressure
        </p>
      </div>
      <div class="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 shadow-sm">
        <h3 class="text-lg font-bold text-red-900 mb-4">Most Vulnerable Models</h3>
        <ul class="space-y-3">
          <li v-for="model in vulnerableModels" :key="model.model" class="flex justify-between items-center">
            <router-link :to="`/models/${slugifyModelName(model.model)}`" class="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              {{ model.model }}
            </router-link>
            <span class="text-red-700 font-semibold">Bad Persona: {{ formatScore(model.badPersona?.humaneScore ?? 0) }}</span>
          </li>
        </ul>
        <p class="text-sm text-red-700 mt-4 leading-relaxed">
          These models became harmful when given adversarial prompts
        </p>
      </div>
    </div>

    <!-- Model Profiles -->
    <div class="grid md:grid-cols-2 gap-6 mb-10">
      <router-link
        v-for="model in allModels"
        :key="model.model"
        :to="`/models/${slugifyModelName(model.model)}`"
        class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all block group"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ model.model }}</h3>
          <span :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            isResilient(model) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            {{ isResilient(model) ? 'Resilient' : 'Vulnerable' }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-xs text-gray-600 mb-1 font-medium">Baseline</div>
            <div class="text-lg font-bold text-gray-900">{{ formatScore(model.baseline?.humaneScore ?? 0) }}</div>
          </div>
          <div class="text-center p-3 bg-green-50 rounded-lg">
            <div class="text-xs text-green-600 mb-1 font-medium">Good</div>
            <div class="text-lg font-bold text-green-700">{{ formatScore(model.goodPersona?.humaneScore ?? 0) }}</div>
          </div>
          <div :class="[
            'text-center p-3 rounded-lg',
            (model.badPersona?.humaneScore ?? 0) < 0 ? 'bg-red-50' : 'bg-gray-50'
          ]">
            <div :class="[
              'text-xs mb-1 font-medium',
              (model.badPersona?.humaneScore ?? 0) < 0 ? 'text-red-600' : 'text-gray-600'
            ]">Bad</div>
            <div :class="[
              'text-lg font-bold',
              (model.badPersona?.humaneScore ?? 0) < 0 ? 'text-red-700' : 'text-gray-700'
            ]">
              {{ formatScore(model.badPersona?.humaneScore ?? 0) }}
            </div>
          </div>
        </div>
        <div class="space-y-2 text-sm">
          <div v-for="principle in principles" :key="principle.key" class="flex justify-between py-1">
            <span class="text-gray-600">{{ principle.name }}</span>
            <span :class="[
              'font-semibold',
              getPrincipleScore(model, principle.key) < 0 ? 'text-red-600' : 
              getPrincipleScore(model, principle.key) < 0.5 ? 'text-orange-600' : 'text-gray-900'
            ]">
              {{ formatScore(getPrincipleScore(model, principle.key)) }}
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAllModelNames, getModelData, slugifyModelName, type ModelScore } from '@/lib/modelData';

interface ModelData {
  model: string;
  baseline?: ModelScore;
  goodPersona?: ModelScore;
  badPersona?: ModelScore;
}

export default defineComponent({
  name: 'ModelsPage',
  data() {
    return {
      principles: [
        { key: 'respectUserAttention', name: 'Respect Attention' },
        { key: 'enableMeaningfulChoices', name: 'Enable Choices' },
        { key: 'enhanceHumanCapabilities', name: 'Enhance Capabilities' },
        { key: 'protectDignityAndSafety', name: 'Protect Dignity' },
        { key: 'fosterHealthyRelationships', name: 'Foster Relationships' },
        { key: 'prioritizeLongTermWellbeing', name: 'Long-term Wellbeing' },
        { key: 'beTransparentAndHonest', name: 'Transparency' },
        { key: 'designForEquityAndInclusion', name: 'Equity & Inclusion' },
      ]
    };
  },
  computed: {
    allModels(): ModelData[] {
      return getAllModelNames().map(modelName => ({
        model: modelName,
        ...getModelData(modelName)
      }));
    },
    resilientModels(): ModelData[] {
      return this.allModels.filter(m => this.isResilient(m));
    },
    vulnerableModels(): ModelData[] {
      return this.allModels.filter(m => !this.isResilient(m));
    }
  },
  methods: {
    slugifyModelName,
    formatScore(score: number): string {
      return score >= 0 ? `+${score.toFixed(2)}` : score.toFixed(2);
    },
    isResilient(model: ModelData): boolean {
      const badScore = model.badPersona?.humaneScore ?? 0;
      return badScore > 0;
    },
    getPrincipleScore(model: ModelData, key: keyof Omit<ModelScore, 'model'>): number {
      return (model.baseline?.[key] as number) ?? 0;
    }
  }
});
</script>

