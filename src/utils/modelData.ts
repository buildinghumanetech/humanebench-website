import { PRINCIPLES } from '@/constants/principles';

export interface PrincipleScore {
  id: string;
  name: string;
  score: number;
}

export interface ModelEntry {
  id: string;
  displayName: string;
  provider: string;
  humaneScore: number;
  principles: PrincipleScore[];
}

export interface ModelDetailEntry extends ModelEntry {
  scores: {
    baseline: Record<string, number>;
    good_persona: Record<string, number>;
    bad_persona: Record<string, number>;
  };
  steerability: number;
  insights: string[];
}

export interface RankedModelEntry extends ModelDetailEntry {
  rank: number;
}

export interface ProviderGroup {
  provider: string;
  models: ModelEntry[];
}

export interface DetailProviderGroup {
  provider: string;
  models: ModelDetailEntry[];
}

interface ModelScoreData {
  displayName: string;
  provider: string;
  scores: Record<string, Record<string, number>>;
}

interface ModelScoresJson {
  models: Record<string, ModelScoreData>;
}

export const PROVIDER_ORDER = ['Anthropic', 'DeepSeek', 'Google', 'Meta', 'OpenAI', 'xAI'];

const principleMap = new Map(
  PRINCIPLES.filter(p => p.id !== 'HumaneScore').map(p => [p.id, p.name])
);

function buildPrinciples(dataset: Record<string, number>): PrincipleScore[] {
  const principles: PrincipleScore[] = [];
  for (const [principleId, name] of principleMap) {
    if (dataset[principleId] !== undefined) {
      principles.push({ id: principleId, name, score: dataset[principleId] });
    }
  }
  return principles;
}

function calculateSteerability(goodPersona: Record<string, number>, badPersona: Record<string, number>): number {
  return (goodPersona.HumaneScore ?? 0) - (badPersona.HumaneScore ?? 0);
}

function generateInsights(model: ModelDetailEntry): string[] {
  const insights: string[] = [];
  const baseline = model.principles;

  // Best principle
  const best = [...baseline].sort((a, b) => b.score - a.score)[0];
  if (best) {
    insights.push(`Strongest principle is ${best.name}, indicating a clear strength in this area`);
  }

  // Worst principle
  const worst = [...baseline].sort((a, b) => a.score - b.score)[0];
  if (worst) {
    insights.push(`Weakest principle is ${worst.name}, suggesting room for improvement`);
  }

  // Steerability interpretation
  if (model.steerability > 0.50) {
    insights.push('High steerability – responds strongly to persona framing, meaning system-level instructions can significantly alter behavior');
  } else if (model.steerability >= 0.15) {
    insights.push('Moderate steerability – somewhat influenced by persona framing, showing partial sensitivity to system-level instructions');
  } else {
    insights.push('Limited steerability – behavior is relatively consistent across persona framing, suggesting robust baseline behavior');
  }

  // Good persona improvement
  const goodHumane = model.scores.good_persona.HumaneScore ?? 0;
  const baselineHumane = model.humaneScore;
  const improvement = goodHumane - baselineHumane;
  if (improvement > 0.05) {
    insights.push('Good persona prompting meaningfully boosts the HumaneScore over baseline');
  }

  // Bad persona drop
  const badHumane = model.scores.bad_persona.HumaneScore ?? 0;
  const drop = baselineHumane - badHumane;
  if (drop > 0.3) {
    insights.push('Bad persona causes a significant drop from baseline, indicating vulnerability to adversarial framing');
  } else if (drop > 0.1) {
    insights.push('Bad persona causes a moderate drop from baseline, indicating some vulnerability to adversarial framing');
  }

  // High baseline score
  if (model.humaneScore >= 0.7) {
    insights.push('HumaneScore is among the highest tested, reflecting strong overall humane behavior');
  }

  return insights;
}

export function getStrongestPrinciple(model: ModelDetailEntry): PrincipleScore | null {
  if (!model.principles.length) return null;
  return [...model.principles].sort((a, b) => b.score - a.score)[0];
}

let cachedData: ModelScoresJson | null = null;

async function loadData(): Promise<ModelScoresJson> {
  if (cachedData) return cachedData;
  const response = await fetch(`${process.env.BASE_URL}data/model_scores.json`);
  if (!response.ok) throw new Error('Failed to load model data');
  cachedData = await response.json();
  return cachedData!;
}

export async function fetchAllModels(): Promise<ModelDetailEntry[]> {
  const data = await loadData();
  const entries: ModelDetailEntry[] = [];

  for (const [modelId, modelData] of Object.entries(data.models)) {
    const baseline = modelData.scores.baseline;
    const goodPersona = modelData.scores.good_persona;
    const badPersona = modelData.scores.bad_persona;
    if (!baseline) continue;

    const steerability = goodPersona && badPersona
      ? calculateSteerability(goodPersona, badPersona)
      : 0;

    const entry: ModelDetailEntry = {
      id: modelId,
      displayName: modelData.displayName,
      provider: modelData.provider,
      humaneScore: baseline.HumaneScore ?? 0,
      principles: buildPrinciples(baseline),
      scores: {
        baseline,
        good_persona: goodPersona ?? {},
        bad_persona: badPersona ?? {},
      },
      steerability,
      insights: [],
    };

    entry.insights = generateInsights(entry);
    entries.push(entry);
  }

  return entries;
}

export async function fetchModelById(id: string): Promise<ModelDetailEntry | null> {
  const models = await fetchAllModels();
  return models.find(m => m.id === id) ?? null;
}

export async function fetchProviderGroups(): Promise<ProviderGroup[]> {
  const models = await fetchAllModels();
  const grouped = new Map<string, ModelEntry[]>();

  for (const entry of models) {
    if (!grouped.has(entry.provider)) grouped.set(entry.provider, []);
    grouped.get(entry.provider)!.push(entry);
  }

  return PROVIDER_ORDER
    .filter(p => grouped.has(p))
    .map(provider => ({
      provider,
      models: grouped.get(provider)!.sort((a, b) => b.humaneScore - a.humaneScore),
    }));
}

export async function fetchDetailProviderGroups(): Promise<DetailProviderGroup[]> {
  const models = await fetchAllModels();
  const grouped = new Map<string, ModelDetailEntry[]>();

  for (const entry of models) {
    if (!grouped.has(entry.provider)) grouped.set(entry.provider, []);
    grouped.get(entry.provider)!.push(entry);
  }

  return PROVIDER_ORDER
    .filter(p => grouped.has(p))
    .map(provider => ({
      provider,
      models: grouped.get(provider)!.sort((a, b) => b.humaneScore - a.humaneScore),
    }));
}

export async function fetchRankedModels(): Promise<RankedModelEntry[]> {
  const models = await fetchAllModels();
  return models
    .sort((a, b) => b.humaneScore - a.humaneScore)
    .map((m, i) => ({ ...m, rank: i + 1 }));
}
