import type { HistoryEntry, AnalysisResult } from '../types';
import { generateId } from '../lib/utils';

const STORAGE_KEY = 'kodnest_analysis_history';

export function saveAnalysis(
  company: string,
  role: string,
  jdText: string,
  result: AnalysisResult
): HistoryEntry {
  const entry: HistoryEntry = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills: result.extractedSkills,
    plan: result.plan,
    checklist: result.checklist,
    questions: result.questions,
    readinessScore: result.readinessScore,
    skillConfidenceMap: {},
    companyIntel: result.companyIntel,
    roundMapping: result.roundMapping,
  };
  
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  
  return entry;
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function getHistoryEntry(id: string): HistoryEntry | null {
  const history = getHistory();
  return history.find(entry => entry.id === id) || null;
}

export function updateHistoryEntry(id: string, updates: Partial<HistoryEntry>): HistoryEntry | null {
  const history = getHistory();
  const index = history.findIndex(entry => entry.id === id);
  
  if (index === -1) {
    return null;
  }
  
  history[index] = { ...history[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  
  return history[index];
}

export function updateSkillConfidence(
  id: string,
  skill: string,
  confidence: 'know' | 'practice'
): HistoryEntry | null {
  const entry = getHistoryEntry(id);
  if (!entry) {
    return null;
  }
  
  const updatedSkillConfidenceMap = {
    ...entry.skillConfidenceMap,
    [skill]: confidence,
  };
  
  // Recalculate score based on confidence
  let newScore = entry.readinessScore;
  
  // Calculate adjustment
  let adjustment = 0;
  Object.entries(updatedSkillConfidenceMap).forEach(([, c]) => {
    if (c === 'know') {
      adjustment += 2;
    } else {
      adjustment -= 2;
    }
  });
  
  // Apply bounds
  newScore = Math.max(0, Math.min(100, 35 + adjustment + (entry.company ? 10 : 0) + (entry.role ? 10 : 0) + (entry.jdText.length > 800 ? 10 : 0)));
  
  return updateHistoryEntry(id, {
    skillConfidenceMap: updatedSkillConfidenceMap,
    readinessScore: newScore,
  });
}

export function deleteHistoryEntry(id: string): boolean {
  const history = getHistory();
  const filtered = history.filter(entry => entry.id !== id);
  
  if (filtered.length === history.length) {
    return false;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
