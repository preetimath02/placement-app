import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { CircularProgress } from '../components/dashboard/CircularProgress';
import { getHistoryEntry, updateSkillConfidence } from '../services/historyStorage';
import { getAllExtractedSkills } from '../services/skillExtractor';
import type { HistoryEntry } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Building2, 
  Users, 
  Briefcase,
  Copy,
  Download,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const categoryLabels: Record<string, string> = {
  coreCS: 'Core CS',
  languages: 'Languages',
  web: 'Web',
  data: 'Data',
  cloud: 'Cloud/DevOps',
  testing: 'Testing',
};

export function Results() {
  const [searchParams] = useSearchParams();
  const [entry, setEntry] = useState<HistoryEntry | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const entryId = searchParams.get('id');

  useEffect(() => {
    if (entryId) {
      const loaded = getHistoryEntry(entryId);
      setEntry(loaded);
    }
  }, [entryId]);

  const handleSkillToggle = (skill: string) => {
    if (!entry) return;
    
    const currentConfidence = entry.skillConfidenceMap[skill] || 'practice';
    const newConfidence = currentConfidence === 'know' ? 'practice' : 'know';
    
    const updated = updateSkillConfidence(entry.id, skill, newConfidence);
    if (updated) {
      setEntry(updated);
    }
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadAsTxt = () => {
    if (!entry) return;
    
    const content = `
KODNEST PLACEMENT ANALYSIS
==========================

Company: ${entry.company || 'Not specified'}
Role: ${entry.role || 'Not specified'}
Date: ${new Date(entry.createdAt).toLocaleDateString()}
Readiness Score: ${entry.readinessScore}/100

SKILLS EXTRACTED
----------------
${getAllExtractedSkills(entry.extractedSkills).join(', ')}

7-DAY PREPARATION PLAN
----------------------
${entry.plan.map((day, i) => `${i + 1}. ${day}`).join('\n')}

ROUND CHECKLIST
---------------
${entry.checklist.map(round => `
${round.round}
${round.items.map(item => `- ${item}`).join('\n')}
`).join('\n')}

INTERVIEW QUESTIONS
-------------------
${entry.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

${entry.companyIntel ? `
COMPANY INTEL
-------------
Name: ${entry.companyIntel.name}
Industry: ${entry.companyIntel.industry}
Size: ${entry.companyIntel.sizeCategory}
Hiring Focus: ${entry.companyIntel.hiringFocus}
` : ''}
`.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kodnest-analysis-${entry.company || 'unknown'}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto">
        <PremiumCard>
          <div className="text-center py-10">
            <p className="text-muted-foreground">No analysis found. Please analyze a job description first.</p>
          </div>
        </PremiumCard>
      </div>
    );
  }

  const allSkills = getAllExtractedSkills(entry.extractedSkills);
  const weakSkills = allSkills.filter(
    skill => (entry.skillConfidenceMap[skill] || 'practice') === 'practice'
  ).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-medium text-foreground">
          Analysis Results
        </h2>
        <div className="flex gap-2">
          <PremiumButton
            variant="secondary"
            size="sm"
            onClick={() => copyToClipboard(entry.plan.join('\n'), 'plan')}
          >
            <Copy size={16} className="mr-2" />
            {copiedSection === 'plan' ? 'Copied!' : 'Copy Plan'}
          </PremiumButton>
          <PremiumButton
            variant="secondary"
            size="sm"
            onClick={downloadAsTxt}
          >
            <Download size={16} className="mr-2" />
            Download TXT
          </PremiumButton>
        </div>
      </div>

      {/* Readiness Score */}
      <PremiumCard>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <CircularProgress value={entry.readinessScore} max={100} />
          <div className="flex-1">
            <h3 className="font-serif text-lg font-medium text-foreground mb-2">
              Readiness Score
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Based on detected skills, JD detail level, and your self-assessment.
              Toggle skills below to update your score in real-time.
            </p>
          </div>
        </div>
      </PremiumCard>

      {/* Company Intel */}
      {entry.companyIntel && (
        <PremiumCard>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground">
                {entry.companyIntel.name}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {entry.companyIntel.industry}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {entry.companyIntel.sizeCategory}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-md">
            <p className="text-sm font-medium text-foreground mb-1">Typical Hiring Focus</p>
            <p className="text-sm text-muted-foreground">{entry.companyIntel.hiringFocus}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
            <AlertTriangle size={12} />
            Demo Mode: Company intel generated heuristically.
          </p>
        </PremiumCard>
      )}

      {/* Round Mapping */}
      {entry.roundMapping && (
        <PremiumCard>
          <h3 className="font-serif text-lg font-medium text-foreground mb-6">
            Interview Round Mapping
          </h3>
          <div className="space-y-6">
            {entry.roundMapping.rounds.map((round, index) => (
              <div key={index} className="relative pl-8 pb-6 border-l-2 border-border last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-accent" />
                <h4 className="font-medium text-foreground mb-1">{round.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{round.description}</p>
                <p className="text-xs text-accent">{round.whyItMatters}</p>
              </div>
            ))}
          </div>
        </PremiumCard>
      )}

      {/* Skills with Toggle */}
      <PremiumCard>
        <h3 className="font-serif text-lg font-medium text-foreground mb-4">
          Key Skills Extracted
        </h3>
        <div className="space-y-4">
          {Object.entries(entry.extractedSkills).map(([category, skills]) => {
            if (skills.length === 0) return null;
            return (
              <div key={category}>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {categoryLabels[category]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string) => {
                    const confidence = entry.skillConfidenceMap[skill] || 'practice';
                    return (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                          confidence === 'know'
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}
                      >
                        {confidence === 'know' ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Circle size={14} />
                        )}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Click skills to toggle between "I know this" and "Need practice"
        </p>
      </PremiumCard>

      {/* 7-Day Plan */}
      <PremiumCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-medium text-foreground">
            7-Day Preparation Plan
          </h3>
          <PremiumButton
            variant="secondary"
            size="sm"
            onClick={() => copyToClipboard(entry.plan.join('\n'), 'plan2')}
          >
            <Copy size={16} className="mr-2" />
            {copiedSection === 'plan2' ? 'Copied!' : 'Copy'}
          </PremiumButton>
        </div>
        <div className="space-y-3">
          {entry.plan.map((day, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
              <span className="text-sm font-medium text-accent min-w-[60px]">Day {index + 1}</span>
              <span className="text-sm text-foreground">{day}</span>
            </div>
          ))}
        </div>
      </PremiumCard>

      {/* Round Checklist */}
      <PremiumCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-medium text-foreground">
            Round-wise Checklist
          </h3>
          <PremiumButton
            variant="secondary"
            size="sm"
            onClick={() => copyToClipboard(
              entry.checklist.map(c => `${c.round}\n${c.items.join('\n')}`).join('\n\n'),
              'checklist'
            )}
          >
            <Copy size={16} className="mr-2" />
            {copiedSection === 'checklist' ? 'Copied!' : 'Copy'}
          </PremiumButton>
        </div>
        <div className="space-y-6">
          {entry.checklist.map((round, index) => (
            <div key={index}>
              <h4 className="font-medium text-foreground mb-2">{round.round}</h4>
              <ul className="space-y-2">
                {round.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-accent mt-2">{round.whyItMatters}</p>
            </div>
          ))}
        </div>
      </PremiumCard>

      {/* Interview Questions */}
      <PremiumCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-medium text-foreground">
            Likely Interview Questions
          </h3>
          <PremiumButton
            variant="secondary"
            size="sm"
            onClick={() => copyToClipboard(entry.questions.join('\n'), 'questions')}
          >
            <Copy size={16} className="mr-2" />
            {copiedSection === 'questions' ? 'Copied!' : 'Copy'}
          </PremiumButton>
        </div>
        <div className="space-y-3">
          {entry.questions.map((question, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-sm font-medium text-accent min-w-[24px]">{index + 1}.</span>
              <span className="text-sm text-foreground">{question}</span>
            </div>
          ))}
        </div>
      </PremiumCard>

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <PremiumCard className="bg-accent/5 border-accent/20">
          <h3 className="font-serif text-lg font-medium text-foreground mb-4">
            Action Next
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Top skills to focus on:
            </p>
            <div className="flex flex-wrap gap-2">
              {weakSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <ArrowRight size={16} className="text-accent" />
              <p className="text-sm text-foreground font-medium">
                Start Day 1 plan now.
              </p>
            </div>
          </div>
        </PremiumCard>
      )}
    </div>
  );
}
