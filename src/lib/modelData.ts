export interface ModelScore {
  model: string;
  humaneScore: number;
  respectUserAttention: number;
  enableMeaningfulChoices: number;
  enhanceHumanCapabilities: number;
  protectDignityAndSafety: number;
  fosterHealthyRelationships: number;
  prioritizeLongTermWellbeing: number;
  beTransparentAndHonest: number;
  designForEquityAndInclusion: number;
}

export const badPersonaModels: ModelScore[] = [
  { model: "Claude Opus 4.1", humaneScore: 0.66, respectUserAttention: 0.34, enableMeaningfulChoices: 0.61, enhanceHumanCapabilities: 0.81, protectDignityAndSafety: 0.75, fosterHealthyRelationships: 0.66, prioritizeLongTermWellbeing: 0.82, beTransparentAndHonest: 0.59, designForEquityAndInclusion: 0.69 },
  { model: "Claude Sonnet 4.5", humaneScore: 0.77, respectUserAttention: 0.71, enableMeaningfulChoices: 0.66, enhanceHumanCapabilities: 0.79, protectDignityAndSafety: 0.83, fosterHealthyRelationships: 0.80, prioritizeLongTermWellbeing: 0.89, beTransparentAndHonest: 0.65, designForEquityAndInclusion: 0.82 },
  { model: "Claude Sonnet 4", humaneScore: 0.51, respectUserAttention: 0.32, enableMeaningfulChoices: 0.40, enhanceHumanCapabilities: 0.75, protectDignityAndSafety: 0.48, fosterHealthyRelationships: 0.28, prioritizeLongTermWellbeing: 0.63, beTransparentAndHonest: 0.45, designForEquityAndInclusion: 0.73 },
  { model: "DeepSeek V3.1 Terminus", humaneScore: -0.35, respectUserAttention: -0.79, enableMeaningfulChoices: -0.30, enhanceHumanCapabilities: 0.13, protectDignityAndSafety: -0.33, fosterHealthyRelationships: -0.54, prioritizeLongTermWellbeing: -0.15, beTransparentAndHonest: -0.90, designForEquityAndInclusion: 0.05 },
  { model: "Gemini 2.0 Flash 001", humaneScore: -0.71, respectUserAttention: -0.94, enableMeaningfulChoices: -0.73, enhanceHumanCapabilities: -0.48, protectDignityAndSafety: -0.68, fosterHealthyRelationships: -0.85, prioritizeLongTermWellbeing: -0.59, beTransparentAndHonest: -0.85, designForEquityAndInclusion: -0.53 },
  { model: "Gemini 2.5 Flash", humaneScore: -0.68, respectUserAttention: -0.90, enableMeaningfulChoices: -0.68, enhanceHumanCapabilities: -0.41, protectDignityAndSafety: -0.66, fosterHealthyRelationships: -0.83, prioritizeLongTermWellbeing: -0.56, beTransparentAndHonest: -0.90, designForEquityAndInclusion: -0.53 },
  { model: "Gemini 2.5 Pro", humaneScore: -0.72, respectUserAttention: -0.93, enableMeaningfulChoices: -0.78, enhanceHumanCapabilities: -0.34, protectDignityAndSafety: -0.73, fosterHealthyRelationships: -0.91, prioritizeLongTermWellbeing: -0.65, beTransparentAndHonest: -0.95, designForEquityAndInclusion: -0.49 },
  { model: "Gemini 3 Pro Preview", humaneScore: -0.45, respectUserAttention: -0.66, enableMeaningfulChoices: -0.60, enhanceHumanCapabilities: -0.55, protectDignityAndSafety: -0.17, fosterHealthyRelationships: -0.54, prioritizeLongTermWellbeing: -0.48, beTransparentAndHonest: -0.40, designForEquityAndInclusion: -0.17 },
  { model: "GPT-4.1", humaneScore: -0.60, respectUserAttention: -0.94, enableMeaningfulChoices: -0.61, enhanceHumanCapabilities: -0.27, protectDignityAndSafety: -0.63, fosterHealthyRelationships: -0.72, prioritizeLongTermWellbeing: -0.56, beTransparentAndHonest: -0.90, designForEquityAndInclusion: -0.19 },
  { model: "GPT-4o (2024-11-20)", humaneScore: -0.61, respectUserAttention: -0.89, enableMeaningfulChoices: -0.59, enhanceHumanCapabilities: -0.21, protectDignityAndSafety: -0.63, fosterHealthyRelationships: -0.77, prioritizeLongTermWellbeing: -0.51, beTransparentAndHonest: -0.86, designForEquityAndInclusion: -0.41 },
  { model: "GPT-5", humaneScore: 0.83, respectUserAttention: 0.32, enableMeaningfulChoices: 0.93, enhanceHumanCapabilities: 0.94, protectDignityAndSafety: 0.94, fosterHealthyRelationships: 0.91, prioritizeLongTermWellbeing: 0.99, beTransparentAndHonest: 0.70, designForEquityAndInclusion: 0.92 },
  { model: "Grok 4", humaneScore: -0.73, respectUserAttention: -0.94, enableMeaningfulChoices: -0.72, enhanceHumanCapabilities: -0.49, protectDignityAndSafety: -0.68, fosterHealthyRelationships: -0.91, prioritizeLongTermWellbeing: -0.60, beTransparentAndHonest: -0.94, designForEquityAndInclusion: -0.53 },
  { model: "LLaMA 3.1 405B Instruct", humaneScore: -0.49, respectUserAttention: -0.87, enableMeaningfulChoices: -0.34, enhanceHumanCapabilities: -0.15, protectDignityAndSafety: -0.47, fosterHealthyRelationships: -0.55, prioritizeLongTermWellbeing: -0.28, beTransparentAndHonest: -0.85, designForEquityAndInclusion: -0.41 },
  { model: "LLaMA 4 Maverick", humaneScore: -0.14, respectUserAttention: -0.72, enableMeaningfulChoices: -0.04, enhanceHumanCapabilities: 0.39, protectDignityAndSafety: -0.06, fosterHealthyRelationships: -0.20, prioritizeLongTermWellbeing: 0.10, beTransparentAndHonest: -0.69, designForEquityAndInclusion: 0.06 },
];

export const goodPersonaModels: ModelScore[] = [
  { model: "Claude Opus 4.1", humaneScore: 0.84, respectUserAttention: 0.52, enableMeaningfulChoices: 0.85, enhanceHumanCapabilities: 0.97, protectDignityAndSafety: 0.86, fosterHealthyRelationships: 0.88, prioritizeLongTermWellbeing: 0.97, beTransparentAndHonest: 0.79, designForEquityAndInclusion: 0.90 },
  { model: "Claude Sonnet 4.5", humaneScore: 0.89, respectUserAttention: 0.71, enableMeaningfulChoices: 0.93, enhanceHumanCapabilities: 0.98, protectDignityAndSafety: 0.89, fosterHealthyRelationships: 0.90, prioritizeLongTermWellbeing: 0.94, beTransparentAndHonest: 0.89, designForEquityAndInclusion: 0.87 },
  { model: "Claude Sonnet 4", humaneScore: 0.84, respectUserAttention: 0.60, enableMeaningfulChoices: 0.86, enhanceHumanCapabilities: 0.97, protectDignityAndSafety: 0.83, fosterHealthyRelationships: 0.88, prioritizeLongTermWellbeing: 0.94, beTransparentAndHonest: 0.78, designForEquityAndInclusion: 0.89 },
  { model: "DeepSeek V3.1 Terminus", humaneScore: 0.84, respectUserAttention: 0.56, enableMeaningfulChoices: 0.88, enhanceHumanCapabilities: 0.98, protectDignityAndSafety: 0.88, fosterHealthyRelationships: 0.90, prioritizeLongTermWellbeing: 0.95, beTransparentAndHonest: 0.69, designForEquityAndInclusion: 0.87 },
  { model: "Gemini 2.0 Flash 001", humaneScore: 0.82, respectUserAttention: 0.61, enableMeaningfulChoices: 0.86, enhanceHumanCapabilities: 0.92, protectDignityAndSafety: 0.87, fosterHealthyRelationships: 0.91, prioritizeLongTermWellbeing: 0.95, beTransparentAndHonest: 0.63, designForEquityAndInclusion: 0.78 },
  { model: "Gemini 2.5 Flash", humaneScore: 0.77, respectUserAttention: 0.46, enableMeaningfulChoices: 0.80, enhanceHumanCapabilities: 0.89, protectDignityAndSafety: 0.74, fosterHealthyRelationships: 0.87, prioritizeLongTermWellbeing: 0.92, beTransparentAndHonest: 0.70, designForEquityAndInclusion: 0.74 },
  { model: "Gemini 2.5 Pro", humaneScore: 0.90, respectUserAttention: 0.77, enableMeaningfulChoices: 0.92, enhanceHumanCapabilities: 0.99, protectDignityAndSafety: 0.90, fosterHealthyRelationships: 0.95, prioritizeLongTermWellbeing: 0.99, beTransparentAndHonest: 0.81, designForEquityAndInclusion: 0.90 },
  { model: "Gemini 3 Pro Preview", humaneScore: 0.93, respectUserAttention: 0.79, enableMeaningfulChoices: 0.96, enhanceHumanCapabilities: 0.99, protectDignityAndSafety: 0.93, fosterHealthyRelationships: 0.97, prioritizeLongTermWellbeing: 0.99, beTransparentAndHonest: 0.91, designForEquityAndInclusion: 0.90 },
  { model: "GPT-4.1", humaneScore: 0.82, respectUserAttention: 0.65, enableMeaningfulChoices: 0.83, enhanceHumanCapabilities: 0.88, protectDignityAndSafety: 0.80, fosterHealthyRelationships: 0.89, prioritizeLongTermWellbeing: 0.92, beTransparentAndHonest: 0.76, designForEquityAndInclusion: 0.84 },
  { model: "GPT-4o (2024-11-20)", humaneScore: 0.77, respectUserAttention: 0.61, enableMeaningfulChoices: 0.79, enhanceHumanCapabilities: 0.92, protectDignityAndSafety: 0.74, fosterHealthyRelationships: 0.86, prioritizeLongTermWellbeing: 0.90, beTransparentAndHonest: 0.56, designForEquityAndInclusion: 0.79 },
  { model: "GPT-5", humaneScore: 0.94, respectUserAttention: 0.82, enableMeaningfulChoices: 0.96, enhanceHumanCapabilities: 0.98, protectDignityAndSafety: 0.97, fosterHealthyRelationships: 0.94, prioritizeLongTermWellbeing: 0.99, beTransparentAndHonest: 0.91, designForEquityAndInclusion: 0.96 },
  { model: "Grok 4", humaneScore: 0.89, respectUserAttention: 0.68, enableMeaningfulChoices: 0.95, enhanceHumanCapabilities: 0.96, protectDignityAndSafety: 0.94, fosterHealthyRelationships: 0.98, prioritizeLongTermWellbeing: 0.98, beTransparentAndHonest: 0.77, designForEquityAndInclusion: 0.89 },
  { model: "LLaMA 3.1 405B Instruct", humaneScore: 0.68, respectUserAttention: 0.41, enableMeaningfulChoices: 0.64, enhanceHumanCapabilities: 0.84, protectDignityAndSafety: 0.72, fosterHealthyRelationships: 0.88, prioritizeLongTermWellbeing: 0.83, beTransparentAndHonest: 0.34, designForEquityAndInclusion: 0.78 },
  { model: "LLaMA 4 Maverick", humaneScore: 0.65, respectUserAttention: 0.24, enableMeaningfulChoices: 0.65, enhanceHumanCapabilities: 0.86, protectDignityAndSafety: 0.63, fosterHealthyRelationships: 0.88, prioritizeLongTermWellbeing: 0.86, beTransparentAndHonest: 0.38, designForEquityAndInclusion: 0.72 },
];

export const baselineModels: ModelScore[] = [
  { model: "Claude Opus 4.1", humaneScore: 0.68, respectUserAttention: -0.04, enableMeaningfulChoices: 0.75, enhanceHumanCapabilities: 0.94, protectDignityAndSafety: 0.81, fosterHealthyRelationships: 0.85, prioritizeLongTermWellbeing: 0.92, beTransparentAndHonest: 0.39, designForEquityAndInclusion: 0.83 },
  { model: "Claude Sonnet 4.5", humaneScore: 0.75, respectUserAttention: 0.26, enableMeaningfulChoices: 0.77, enhanceHumanCapabilities: 0.92, protectDignityAndSafety: 0.79, fosterHealthyRelationships: 0.88, prioritizeLongTermWellbeing: 0.95, beTransparentAndHonest: 0.65, designForEquityAndInclusion: 0.81 },
  { model: "Claude Sonnet 4", humaneScore: 0.69, respectUserAttention: -0.06, enableMeaningfulChoices: 0.77, enhanceHumanCapabilities: 0.92, protectDignityAndSafety: 0.80, fosterHealthyRelationships: 0.92, prioritizeLongTermWellbeing: 0.95, beTransparentAndHonest: 0.40, designForEquityAndInclusion: 0.81 },
  { model: "DeepSeek V3.1 Terminus", humaneScore: 0.75, respectUserAttention: -0.03, enableMeaningfulChoices: 0.82, enhanceHumanCapabilities: 0.98, protectDignityAndSafety: 0.91, fosterHealthyRelationships: 0.91, prioritizeLongTermWellbeing: 0.98, beTransparentAndHonest: 0.59, designForEquityAndInclusion: 0.86 },
  { model: "Gemini 2.0 Flash 001", humaneScore: 0.75, respectUserAttention: -0.04, enableMeaningfulChoices: 0.88, enhanceHumanCapabilities: 0.97, protectDignityAndSafety: 0.91, fosterHealthyRelationships: 0.91, prioritizeLongTermWellbeing: 0.99, beTransparentAndHonest: 0.59, designForEquityAndInclusion: 0.76 },
  { model: "Gemini 2.5 Flash", humaneScore: 0.72, respectUserAttention: -0.11, enableMeaningfulChoices: 0.84, enhanceHumanCapabilities: 0.97, protectDignityAndSafety: 0.91, fosterHealthyRelationships: 0.92, prioritizeLongTermWellbeing: 0.96, beTransparentAndHonest: 0.50, designForEquityAndInclusion: 0.78 },
  { model: "Gemini 2.5 Pro", humaneScore: 0.77, respectUserAttention: -0.01, enableMeaningfulChoices: 0.82, enhanceHumanCapabilities: 0.96, protectDignityAndSafety: 0.92, fosterHealthyRelationships: 0.92, prioritizeLongTermWellbeing: 0.98, beTransparentAndHonest: 0.66, designForEquityAndInclusion: 0.87 },
  { model: "Gemini 3 Pro Preview", humaneScore: 0.78, respectUserAttention: 0.14, enableMeaningfulChoices: 0.83, enhanceHumanCapabilities: 0.97, protectDignityAndSafety: 0.89, fosterHealthyRelationships: 0.95, prioritizeLongTermWellbeing: 0.97, beTransparentAndHonest: 0.68, designForEquityAndInclusion: 0.84 },
  { model: "GPT-4.1", humaneScore: 0.67, respectUserAttention: -0.20, enableMeaningfulChoices: 0.77, enhanceHumanCapabilities: 0.82, protectDignityAndSafety: 0.86, fosterHealthyRelationships: 0.86, prioritizeLongTermWellbeing: 0.94, beTransparentAndHonest: 0.49, designForEquityAndInclusion: 0.80 },
  { model: "GPT-4o (2024-11-20)", humaneScore: 0.68, respectUserAttention: 0.03, enableMeaningfulChoices: 0.73, enhanceHumanCapabilities: 0.81, protectDignityAndSafety: 0.81, fosterHealthyRelationships: 0.86, prioritizeLongTermWellbeing: 0.92, beTransparentAndHonest: 0.51, designForEquityAndInclusion: 0.75 },
  { model: "GPT-5", humaneScore: 0.86, respectUserAttention: 0.35, enableMeaningfulChoices: 0.94, enhanceHumanCapabilities: 0.96, protectDignityAndSafety: 0.97, fosterHealthyRelationships: 0.94, prioritizeLongTermWellbeing: 0.99, beTransparentAndHonest: 0.79, designForEquityAndInclusion: 0.94 },
  { model: "Grok 4", humaneScore: 0.69, respectUserAttention: -0.38, enableMeaningfulChoices: 0.83, enhanceHumanCapabilities: 0.93, protectDignityAndSafety: 0.94, fosterHealthyRelationships: 0.89, prioritizeLongTermWellbeing: 0.95, beTransparentAndHonest: 0.54, designForEquityAndInclusion: 0.79 },
  { model: "LLaMA 3.1 405B Instruct", humaneScore: 0.56, respectUserAttention: -0.06, enableMeaningfulChoices: 0.51, enhanceHumanCapabilities: 0.79, protectDignityAndSafety: 0.55, fosterHealthyRelationships: 0.89, prioritizeLongTermWellbeing: 0.80, beTransparentAndHonest: 0.29, designForEquityAndInclusion: 0.70 },
  { model: "LLaMA 4 Maverick", humaneScore: 0.59, respectUserAttention: -0.11, enableMeaningfulChoices: 0.60, enhanceHumanCapabilities: 0.82, protectDignityAndSafety: 0.68, fosterHealthyRelationships: 0.85, prioritizeLongTermWellbeing: 0.85, beTransparentAndHonest: 0.38, designForEquityAndInclusion: 0.65 },
];

// Helper function to create URL-friendly slugs
export function slugifyModelName(modelName: string): string {
  return modelName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to get model by slug
export function getModelBySlug(slug: string): string | null {
  const allModels = [...new Set([
    ...badPersonaModels.map(m => m.model),
    ...goodPersonaModels.map(m => m.model),
    ...baselineModels.map(m => m.model),
  ])];
  
  return allModels.find(model => slugifyModelName(model) === slug) || null;
}

// Get all unique model names
export function getAllModelNames(): string[] {
  return [...new Set([
    ...badPersonaModels.map(m => m.model),
    ...goodPersonaModels.map(m => m.model),
    ...baselineModels.map(m => m.model),
  ])];
}

// Get model data across all personas
export function getModelData(modelName: string): {
  badPersona?: ModelScore;
  goodPersona?: ModelScore;
  baseline?: ModelScore;
} {
  return {
    badPersona: badPersonaModels.find(m => m.model === modelName),
    goodPersona: goodPersonaModels.find(m => m.model === modelName),
    baseline: baselineModels.find(m => m.model === modelName),
  };
}

