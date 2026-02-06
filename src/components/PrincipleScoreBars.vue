<template>
  <div class="principle-candlesticks">
    <!-- Legend -->
    <div class="chart-legend">
      <span class="legend-item">
        <span class="legend-line legend-green"></span> Good Persona
      </span>
      <span class="legend-item">
        <span class="legend-dot"></span> Baseline
      </span>
      <span class="legend-item">
        <span class="legend-line legend-red"></span> Bad Persona
      </span>
    </div>

    <!-- Shared axis header -->
    <div class="axis-header">
      <div class="axis-name-spacer"></div>
      <div class="axis-scale">
        <span class="axis-tick" style="left: 0%">-1.0</span>
        <span class="axis-tick" style="left: 25%">-0.5</span>
        <span class="axis-tick" style="left: 50%">0.0</span>
        <span class="axis-tick" style="left: 75%">+0.5</span>
        <span class="axis-tick" style="left: 100%">+1.0</span>
      </div>
    </div>

    <!-- One candlestick row per principle -->
    <div v-for="p in principles" :key="p.id" class="principle-row">
      <div class="principle-name">{{ p.name }}</div>
      <div class="candlestick-track">
        <!-- Gridlines -->
        <div class="gridline" style="left: 0%"></div>
        <div class="gridline" style="left: 25%"></div>
        <div class="gridline gridline-zero" style="left: 50%"></div>
        <div class="gridline" style="left: 75%"></div>
        <div class="gridline" style="left: 100%"></div>

        <!-- Red range: baseline to bad_persona -->
        <div
          v-if="toLeft(p.bad) < toLeft(p.baseline)"
          class="range-line range-red"
          :style="{ left: toLeft(p.bad) + '%', width: (toLeft(p.baseline) - toLeft(p.bad)) + '%' }"
        ></div>
        <div
          v-else-if="toLeft(p.bad) > toLeft(p.baseline)"
          class="range-line range-red"
          :style="{ left: toLeft(p.baseline) + '%', width: (toLeft(p.bad) - toLeft(p.baseline)) + '%' }"
        ></div>
        <!-- Red end-cap -->
        <div v-if="toLeft(p.bad) !== toLeft(p.baseline)" class="end-cap cap-red" :style="{ left: toLeft(p.bad) + '%' }"></div>

        <!-- Green range: baseline to good_persona -->
        <div
          v-if="toLeft(p.good) > toLeft(p.baseline)"
          class="range-line range-green"
          :style="{ left: toLeft(p.baseline) + '%', width: (toLeft(p.good) - toLeft(p.baseline)) + '%' }"
        ></div>
        <div
          v-else-if="toLeft(p.good) < toLeft(p.baseline)"
          class="range-line range-green"
          :style="{ left: toLeft(p.good) + '%', width: (toLeft(p.baseline) - toLeft(p.good)) + '%' }"
        ></div>
        <!-- Green end-cap -->
        <div v-if="toLeft(p.good) !== toLeft(p.baseline)" class="end-cap cap-green" :style="{ left: toLeft(p.good) + '%' }"></div>

        <!-- Baseline dot -->
        <div class="baseline-dot" :style="{ left: toLeft(p.baseline) + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ModelDetailEntry } from '@/utils/modelData';
import { PRINCIPLES } from '@/constants/principles';

interface PrincipleBarData {
  id: string;
  name: string;
  bad: number;
  baseline: number;
  good: number;
}

export default defineComponent({
  name: 'PrincipleScoreBars',

  props: {
    model: {
      type: Object as PropType<ModelDetailEntry>,
      required: true,
    },
  },

  computed: {
    principles(): PrincipleBarData[] {
      return PRINCIPLES
        .filter(p => p.id !== 'HumaneScore')
        .map(p => ({
          id: p.id,
          name: p.name,
          bad: this.model.scores.bad_persona[p.id] ?? 0,
          baseline: this.model.scores.baseline[p.id] ?? 0,
          good: this.model.scores.good_persona[p.id] ?? 0,
        }));
    },
  },

  methods: {
    toLeft(score: number): number {
      return ((score + 1) / 2) * 100;
    },
  },
});
</script>

<style scoped>
.principle-candlesticks {
  padding: 0;
}

/* Legend */
.chart-legend {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  color: #666;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.legend-line {
  display: inline-block;
  width: 16px;
  height: 4px;
  border-radius: 2px;
}

.legend-green {
  background: #2E7D32;
}

.legend-red {
  background: #dc3545;
}

.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
}

/* Axis header */
.axis-header {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.25rem;
}

.axis-name-spacer {
  flex: 0 0 30%;
}

.axis-scale {
  flex: 1;
  position: relative;
  height: 1rem;
  margin: 0 0.5rem;
}

.axis-tick {
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.65rem;
  color: #999;
  font-variant-numeric: tabular-nums;
}

/* Principle rows */
.principle-row {
  display: flex;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f5f0eb;
}

.principle-row:last-child {
  border-bottom: none;
}

.principle-name {
  flex: 0 0 30%;
  font-weight: 600;
  font-size: 0.85rem;
  color: #1a1a1a;
  line-height: 1.3;
  padding-right: 0.75rem;
}

/* Candlestick track */
.candlestick-track {
  flex: 1;
  position: relative;
  height: 20px;
  margin: 0 0.5rem;
}

.gridline {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0, 0, 0, 0.06);
}

.gridline-zero {
  background: rgba(0, 0, 0, 0.15);
}

.range-line {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  z-index: 2;
}

.range-red {
  background: #dc3545;
}

.range-green {
  background: #2E7D32;
}

.end-cap {
  position: absolute;
  top: 50%;
  width: 2px;
  height: 14px;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.cap-red {
  background: #dc3545;
}

.cap-green {
  background: #2E7D32;
}

.baseline-dot {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

@media (max-width: 768px) {
  .principle-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }

  .principle-name {
    flex: none;
    font-size: 0.8rem;
  }

  .axis-name-spacer {
    display: none;
  }

  .candlestick-track {
    margin: 0;
    height: 18px;
  }

  .chart-legend {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}
</style>
