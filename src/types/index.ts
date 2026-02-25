export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloud: string[];
  testing: string[];
}

export interface RoundChecklist {
  round: string;
  items: string[];
  whyItMatters: string;
}

export interface CompanyIntel {
  name: string;
  industry: string;
  sizeCategory: 'Startup' | 'Mid-size' | 'Enterprise';
  hiringFocus: string;
}

export interface RoundMapping {
  rounds: {
    name: string;
    description: string;
    whyItMatters: string;
  }[];
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  plan: string[];
  checklist: RoundChecklist[];
  questions: string[];
  readinessScore: number;
  skillConfidenceMap: Record<string, 'know' | 'practice'>;
  companyIntel?: CompanyIntel;
  roundMapping?: RoundMapping;
}

export interface AnalysisResult {
  extractedSkills: ExtractedSkills;
  plan: string[];
  checklist: RoundChecklist[];
  questions: string[];
  readinessScore: number;
  companyIntel?: CompanyIntel;
  roundMapping?: RoundMapping;
}

export type SkillConfidence = 'know' | 'practice';
