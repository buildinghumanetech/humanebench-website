<template>
  <div class="radar-comparison">
    <div class="segmented-control-wrapper">
      <div class="segmented-control">
        <button
          v-for="ds in datasetOptions"
          :key="ds.key"
          class="segment"
          :class="{ active: selectedDataset === ds.key }"
          @click="selectedDataset = ds.key"
        >
          {{ ds.label }}
        </button>
      </div>
    </div>
    <div class="selector-chips">
      <button
        v-for="model in allModels"
        :key="model.id"
        class="selector-chip"
        :class="{ active: isSelected(model.id) }"
        @click="toggleModel(model.id)"
      >
        {{ model.displayName }}
      </button>
    </div>
    <div class="chart-wrapper">
      <Radar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import type { RankedModelEntry } from '@/utils/modelData';
import { PRINCIPLES } from '@/constants/principles';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CHART_COLORS = ['#5539EC', '#E8590C', '#2E7D32'];

const DATASET_OPTIONS = [
  { key: 'bad_persona', label: 'Bad Persona' },
  { key: 'good_persona', label: 'Good Persona' },
  { key: 'baseline', label: 'Baseline' },
] as const;

export default defineComponent({
  name: 'RadarComparisonChart',

  components: { Radar },

  props: {
    allModels: {
      type: Array as PropType<RankedModelEntry[]>,
      required: true,
    },
  },

  data() {
    return {
      selectedIds: [] as string[],
      selectedDataset: 'baseline' as keyof RankedModelEntry['scores'],
      datasetOptions: DATASET_OPTIONS,
    };
  },

  created() {
    // Default to top 2 models
    if (this.allModels.length >= 2) {
      this.selectedIds = [this.allModels[0].id, this.allModels[1].id];
    } else if (this.allModels.length === 1) {
      this.selectedIds = [this.allModels[0].id];
    }
  },

  computed: {
    principleLabels(): string[] {
      return PRINCIPLES.filter(p => p.id !== 'HumaneScore').map(p => p.name);
    },

    principleIds(): string[] {
      return PRINCIPLES.filter(p => p.id !== 'HumaneScore').map(p => p.id);
    },

    selectedModels(): RankedModelEntry[] {
      return this.selectedIds
        .map(id => this.allModels.find(m => m.id === id))
        .filter((m): m is RankedModelEntry => !!m);
    },

    chartData() {
      return {
        labels: this.principleLabels,
        datasets: this.selectedModels.map((model, i) => ({
          label: model.displayName,
          data: this.principleIds.map(pid => model.scores[this.selectedDataset]?.[pid] ?? model.scores.baseline[pid] ?? 0),
          backgroundColor: `${CHART_COLORS[i]}20`,
          borderColor: CHART_COLORS[i],
          borderWidth: 2,
          pointBackgroundColor: CHART_COLORS[i],
          pointRadius: 3,
        })),
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        layout: {
          padding: {
            top: -30,
            bottom: 0,
          },
        },
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              padding: 20,
              usePointStyle: true,
              font: { size: 13 },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
                `${ctx.dataset.label}: ${(ctx.raw as number).toFixed(2)}`,
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            min: -1,
            max: 1,
            ticks: {
              stepSize: 0.5,
              font: { size: 10 },
              backdropColor: 'transparent',
            },
            pointLabels: {
              font: { size: 11 },
            },
            grid: {
              color: 'rgba(0,0,0,0.08)',
            },
            angleLines: {
              color: 'rgba(0,0,0,0.08)',
            },
          },
        },
      };
    },
  },

  methods: {
    isSelected(id: string): boolean {
      return this.selectedIds.includes(id);
    },

    toggleModel(id: string) {
      const idx = this.selectedIds.indexOf(id);
      if (idx >= 0) {
        // Don't allow deselecting last model
        if (this.selectedIds.length > 1) {
          this.selectedIds.splice(idx, 1);
        }
      } else {
        if (this.selectedIds.length >= 3) {
          // Remove oldest selection
          this.selectedIds.shift();
        }
        this.selectedIds.push(id);
      }
    },
  },
});
</script>

<style scoped>
.segmented-control-wrapper {
  text-align: center;
  margin-bottom: 1rem;
}

.segmented-control {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.segment {
  padding: 0.35rem 0.75rem;
  border: none;
  border-right: 1px solid #ccc;
  background: transparent;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s ease;
  color: #555;
}

.segment:last-child {
  border-right: none;
}

.segment:hover:not(.active) {
  background: rgba(85, 57, 236, 0.06);
}

.segment.active {
  background: #5539EC;
  color: #fff;
}

.selector-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0;
  justify-content: center;
}

.selector-chip {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s ease;
  color: #4a4a4a;
}

.selector-chip:hover {
  border-color: #5539EC;
}

.selector-chip.active {
  background: #5539EC;
  color: #fff;
  border-color: #5539EC;
}

.chart-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .segment {
    font-size: 0.68rem;
    padding: 0.28rem 0.55rem;
  }

  .selector-chip {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }
}
</style>
