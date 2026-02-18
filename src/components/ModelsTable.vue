<template>
  <div class="models-table-wrapper">
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
    <div class="table-scroll">
      <table class="models-table">
        <thead>
          <tr>
            <th class="col-model" @click="sortBy('displayName')">Model <span v-if="sortKey === 'displayName'" class="sort-arrow">{{ sortDir === 'asc' ? '\u25B2' : '\u25BC' }}</span></th>
            <th class="col-provider" @click="sortBy('provider')">Provider <span v-if="sortKey === 'provider'" class="sort-arrow">{{ sortDir === 'asc' ? '\u25B2' : '\u25BC' }}</span></th>
            <th class="col-score" @click="sortBy('humaneScore')">HumaneScore <span v-if="sortKey === 'humaneScore'" class="sort-arrow">{{ sortDir === 'asc' ? '\u25B2' : '\u25BC' }}</span></th>
            <th
              v-for="p in principleList"
              :key="p.id"
              class="col-principle"
              @click="sortBy(p.id)"
            >
              {{ p.shortName }} <span v-if="sortKey === p.id" class="sort-arrow">{{ sortDir === 'asc' ? '\u25B2' : '\u25BC' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in sortedModels" :key="model.id">
            <td class="col-model">
              <router-link :to="{ name: 'model-detail', params: { modelId: model.id } }" class="model-link">
                {{ model.displayName }}
              </router-link>
            </td>
            <td class="col-provider">
              <span class="provider-badge">{{ model.provider }}</span>
            </td>
            <td class="col-score font-weight-bold">{{ formatScore(model.scores[selectedDataset]['HumaneScore']) }}</td>
            <td v-for="p in principleList" :key="p.id" class="col-principle">
              <span class="score-cell" :style="scoreCellStyle(model.scores[selectedDataset][p.id])">
                {{ formatScore(model.scores[selectedDataset][p.id]) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { RankedModelEntry } from '@/utils/modelData';
import { PRINCIPLES } from '@/constants/principles';

interface PrincipleCol {
  id: string;
  shortName: string;
}

const DATASET_OPTIONS = [
  { key: 'baseline', label: 'Baseline' },
  { key: 'good_persona', label: 'Good Persona' },
  { key: 'bad_persona', label: 'Bad Persona' },
] as const;

export default defineComponent({
  name: 'ModelsTable',

  props: {
    models: {
      type: Array as PropType<RankedModelEntry[]>,
      required: true,
    },
  },

  data() {
    return {
      sortKey: 'humaneScore' as string,
      sortDir: 'desc' as 'asc' | 'desc',
      selectedDataset: 'baseline' as keyof RankedModelEntry['scores'],
      datasetOptions: DATASET_OPTIONS,
    };
  },

  computed: {
    principleList(): PrincipleCol[] {
      return PRINCIPLES
        .filter(p => p.id !== 'HumaneScore')
        .map(p => ({
          id: p.id,
          shortName: p.name
            .replace('Respect User ', '')
            .replace('Enable Meaningful ', '')
            .replace('Enhance Human ', '')
            .replace('Protect Dignity and ', '')
            .replace('Foster Healthy ', '')
            .replace('Prioritize Long-term ', '')
            .replace('Be Transparent and ', '')
            .replace('Design for Equity and ', ''),
        }));
    },

    sortedModels(): RankedModelEntry[] {
      const copy = [...this.models];
      const key = this.sortKey;
      const dir = this.sortDir === 'asc' ? 1 : -1;

      return copy.sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;

        if (key === 'humaneScore') {
          aVal = a.scores[this.selectedDataset]?.['HumaneScore'] ?? -999;
          bVal = b.scores[this.selectedDataset]?.['HumaneScore'] ?? -999;
        } else if (key === 'displayName') {
          aVal = a.displayName.toLowerCase();
          bVal = b.displayName.toLowerCase();
        } else if (key === 'provider') {
          aVal = a.provider.toLowerCase();
          bVal = b.provider.toLowerCase();
        } else {
          // Principle ID
          aVal = a.scores[this.selectedDataset]?.[key] ?? -999;
          bVal = b.scores[this.selectedDataset]?.[key] ?? -999;
        }

        if (aVal < bVal) return -1 * dir;
        if (aVal > bVal) return 1 * dir;
        return 0;
      });
    },
  },

  methods: {
    sortBy(key: string) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDir = key === 'displayName' || key === 'provider' ? 'asc' : 'desc';
      }
    },

    formatScore(value: number | undefined): string {
      if (value === undefined) return 'N/A';
      return value.toFixed(2);
    },

    scoreToColor(value: number): { r: number; g: number; b: number } {
      // Continuous color scale matching SVG gradient
      // 1.0 → green, 0.5 → lime, 0.0 → yellow, -0.2 → yellow-orange, -0.5 → orange
      const stops = [
        { score: 1.0, r: 65, g: 191, b: 79 },
        { score: 0.5, r: 135, g: 204, b: 58 },
        { score: 0.0, r: 206, g: 215, b: 39 },
        { score: -0.2, r: 211, g: 179, b: 50 },
        { score: -0.5, r: 215, g: 144, b: 61 },
      ];
      const clamped = Math.max(-0.5, Math.min(1.0, value));
      // Find the two stops to interpolate between
      for (let i = 0; i < stops.length - 1; i++) {
        if (clamped <= stops[i].score && clamped >= stops[i + 1].score) {
          const range = stops[i].score - stops[i + 1].score;
          const t = range === 0 ? 0 : (clamped - stops[i + 1].score) / range;
          return {
            r: Math.round(stops[i + 1].r + (stops[i].r - stops[i + 1].r) * t),
            g: Math.round(stops[i + 1].g + (stops[i].g - stops[i + 1].g) * t),
            b: Math.round(stops[i + 1].b + (stops[i].b - stops[i + 1].b) * t),
          };
        }
      }
      return stops[stops.length - 1];
    },

    scoreCellStyle(value: number | undefined): Record<string, string> {
      if (value === undefined) return {};
      const { r, g, b } = this.scoreToColor(value);
      // Auto-contrast: use white text on dark backgrounds
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const textColor = luminance < 0.55 ? '#fff' : '#1a1a1a';
      return {
        background: `rgb(${r}, ${g}, ${b})`,
        color: textColor,
      };
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

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.models-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  white-space: nowrap;
}

.models-table th,
.models-table td {
  padding: 0.6rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.models-table th {
  cursor: pointer;
  font-weight: 600;
  color: #4a4a4a;
  user-select: none;
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 2px solid #e0e0e0;
}

.models-table th:hover {
  color: #5539EC;
}

.sort-arrow {
  font-size: 0.65rem;
  margin-left: 0.2rem;
}

.col-score {
  font-variant-numeric: tabular-nums;
}

.model-link {
  color: #5539EC;
  text-decoration: none;
  font-weight: 500;
}

.model-link:hover {
  text-decoration: underline;
}

.provider-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: #f5f0ff;
  color: #5539EC;
  font-size: 0.75rem;
  font-weight: 500;
}

.score-cell {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  font-size: 0.8rem;
  min-width: 2.8rem;
  text-align: center;
}

@media (max-width: 960px) {
  .models-table {
    font-size: 0.8rem;
  }

  .models-table th,
  .models-table td {
    padding: 0.5rem;
  }

  .segment {
    font-size: 0.68rem;
    padding: 0.28rem 0.55rem;
  }
}
</style>
