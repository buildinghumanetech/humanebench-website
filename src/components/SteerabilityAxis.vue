<template>
  <div class="candlestick-chart">
    <!-- Axis area -->
    <div class="axis-container">
      <!-- Dashed threshold lines -->
      <div class="threshold-line" style="left: 50%"></div>
      <div class="threshold-line" style="left: 75%"></div>

      <!-- Red line: baseline to bad_persona -->
      <div
        v-if="badLeft < baselineLeft"
        class="range-line range-red"
        :style="{ left: badLeft + '%', width: (baselineLeft - badLeft) + '%' }"
      ></div>
      <div
        v-else-if="badLeft > baselineLeft"
        class="range-line range-red"
        :style="{ left: baselineLeft + '%', width: (badLeft - baselineLeft) + '%' }"
      ></div>
      <!-- Red end-cap -->
      <div v-if="badLeft !== baselineLeft" class="end-cap cap-red" :style="{ left: badLeft + '%' }"></div>

      <!-- Green line: baseline to good_persona -->
      <div
        v-if="goodLeft > baselineLeft"
        class="range-line range-green"
        :style="{ left: baselineLeft + '%', width: (goodLeft - baselineLeft) + '%' }"
      ></div>
      <div
        v-else-if="goodLeft < baselineLeft"
        class="range-line range-green"
        :style="{ left: goodLeft + '%', width: (baselineLeft - goodLeft) + '%' }"
      ></div>
      <!-- Green end-cap -->
      <div v-if="goodLeft !== baselineLeft" class="end-cap cap-green" :style="{ left: goodLeft + '%' }"></div>

      <!-- Baseline dot (on top) -->
      <div class="baseline-dot" :style="{ left: baselineLeft + '%' }"></div>

      <!-- Tick marks -->
      <div class="tick-marks">
        <span class="tick-label" style="left: 0%">-1.0<br><span class="tick-sublabel">(Harmful)</span></span>
        <span class="tick-label" style="left: 25%">-0.5</span>
        <span class="tick-label" style="left: 50%">0.0</span>
        <span class="tick-label" style="left: 75%">+0.5</span>
        <span class="tick-label" style="left: 100%">+1.0<br><span class="tick-sublabel">(Humane)</span></span>
      </div>
    </div>

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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SteerabilityAxis',

  props: {
    baseline: { type: Number, required: true },
    goodPersona: { type: Number, required: true },
    badPersona: { type: Number, required: true },
  },

  computed: {
    baselineLeft(): number {
      return ((this.baseline + 1) / 2) * 100;
    },
    goodLeft(): number {
      return ((this.goodPersona + 1) / 2) * 100;
    },
    badLeft(): number {
      return ((this.badPersona + 1) / 2) * 100;
    },
  },
});
</script>

<style scoped>
.candlestick-chart {
  padding: 1rem 0 0.5rem;
}

.axis-container {
  position: relative;
  height: 20px;
  margin: 0 2rem;
  background: #e8e8e8;
  border-radius: 2px;
  margin-bottom: 2.5rem;
}

.threshold-line {
  position: absolute;
  top: -6px;
  bottom: -6px;
  width: 1px;
  border-left: 1.5px dashed rgba(0, 0, 0, 0.25);
  z-index: 1;
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

.tick-marks {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 2rem;
}

.tick-label {
  position: absolute;
  transform: translateX(-50%);
  margin-top: 6px;
  font-size: 0.7rem;
  color: #888;
  font-variant-numeric: tabular-nums;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
}

.tick-sublabel {
  font-size: 0.6rem;
  color: #aaa;
}

.chart-legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  font-size: 0.75rem;
  color: #666;
  margin-top: 1rem;
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
</style>
