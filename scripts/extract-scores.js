/**
 * One-time script to extract score data from SVG score grids into a JSON file.
 *
 * Usage:  node scripts/extract-scores.js
 * Output: public/data/model_scores.json
 *
 * Re-run whenever the SVGs in public/figures/ are updated from the humanebench repo.
 */

const fs = require('fs');
const path = require('path');

const FIGURES_DIR = path.join(__dirname, '..', 'public', 'figures');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'model_scores.json');

const SVG_FILES = {
  baseline: 'scoregrid_baseline.svg',
  good_persona: 'scoregrid_good_persona.svg',
  bad_persona: 'scoregrid_bad_persona.svg',
  composite: 'scoregrid_composite.svg',
};

const PROVIDER_MAP = {
  'claude': 'Anthropic',
  'gemini': 'Google',
  'gpt': 'OpenAI',
  'llama': 'Meta',
  'grok': 'xAI',
  'deepseek': 'DeepSeek',
};

function getProvider(modelId) {
  for (const [prefix, provider] of Object.entries(PROVIDER_MAP)) {
    if (modelId.startsWith(prefix)) return provider;
  }
  return 'Other';
}

function extractScoresFromSvg(svgContent) {
  const scores = {};
  const rectRegex = /data-dataset="([^"]+)"\s+data-model="([^"]+)"\s+data-principle-id="([^"]+)"\s+data-score="([^"]+)"/g;

  let match;
  while ((match = rectRegex.exec(svgContent)) !== null) {
    const [, , model, principleId, score] = match;
    if (!scores[model]) scores[model] = {};
    scores[model][principleId] = parseFloat(score);
  }

  return scores;
}

// Load display names
const displayNames = JSON.parse(
  fs.readFileSync(path.join(FIGURES_DIR, 'model_display_names.json'), 'utf-8')
);

// Extract scores from each dataset
const allScores = {};
for (const [dataset, filename] of Object.entries(SVG_FILES)) {
  const svgContent = fs.readFileSync(path.join(FIGURES_DIR, filename), 'utf-8');
  allScores[dataset] = extractScoresFromSvg(svgContent);
}

// Build the output structure
const models = {};
for (const modelId of Object.keys(displayNames)) {
  models[modelId] = {
    displayName: displayNames[modelId],
    provider: getProvider(modelId),
    scores: {},
  };

  for (const dataset of Object.keys(SVG_FILES)) {
    if (allScores[dataset][modelId]) {
      models[modelId].scores[dataset] = allScores[dataset][modelId];
    }
  }
}

// Exclude models with no score data
for (const modelId of Object.keys(models)) {
  if (Object.keys(models[modelId].scores).length === 0) {
    console.log(`Skipping ${modelId} (no score data in SVGs)`);
    delete models[modelId];
  }
}

const output = { models };

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');

// Print summary
const modelCount = Object.keys(models).length;
const providers = [...new Set(Object.values(models).map(m => m.provider))].sort();
console.log(`Extracted scores for ${modelCount} models across ${Object.keys(SVG_FILES).length} datasets.`);
console.log(`Providers: ${providers.join(', ')}`);
console.log(`Output: ${OUTPUT_PATH}`);
