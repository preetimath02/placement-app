import type { ExtractedSkills, RoundChecklist, AnalysisResult } from '../types';
import { extractSkills, getDetectedCategories, hasAnySkills } from './skillExtractor';
import { generateCompanyIntel } from './companyIntel';
import { generateRoundMapping } from './roundMapping';

export function generateChecklist(skills: ExtractedSkills): RoundChecklist[] {
  const hasDSA = skills.coreCS.includes('DSA') || skills.coreCS.includes('Data Structures');
  const hasWeb = skills.web.length > 0;
  const hasDB = skills.data.length > 0;
  const hasCloud = skills.cloud.length > 0;
  
  const checklist: RoundChecklist[] = [
    {
      round: 'Round 1: Aptitude / Basics',
      items: [
        'Practice 20+ quantitative aptitude problems',
        'Review logical reasoning patterns',
        'Solve 10 verbal ability questions',
        'Time yourself: 1 minute per question',
        'Review basic probability and statistics',
      ],
      whyItMatters: 'First filter round. Speed and accuracy here determine if you proceed.',
    },
    {
      round: 'Round 2: DSA + Core CS',
      items: [
        hasDSA ? 'Master arrays, strings, linked lists, trees, graphs' : 'Review basic programming concepts',
        hasDSA ? 'Practice 50+ problems on each data structure' : 'Practice coding fundamentals',
        'Review time and space complexity analysis',
        'Study sorting and searching algorithms',
        hasDSA ? 'Practice dynamic programming patterns' : 'Focus on problem-solving approach',
        'Mock interview with timer (45 min)',
      ],
      whyItMatters: 'Core technical competency. This round tests your algorithmic thinking.',
    },
    {
      round: 'Round 3: Tech Interview',
      items: [
        hasWeb ? 'Review React/Node lifecycle and hooks' : 'Review your primary language deeply',
        hasDB ? 'Practice SQL queries: joins, aggregations, indexing' : 'Understand database fundamentals',
        hasCloud ? 'Study basic AWS services and deployment' : 'Learn about system architecture basics',
        'Prepare 2-3 project deep dives',
        'Practice explaining your code clearly',
        'Review REST API design principles',
      ],
      whyItMatters: 'Tests practical knowledge and ability to apply concepts to real scenarios.',
    },
    {
      round: 'Round 4: Managerial / HR',
      items: [
        'Prepare STAR format answers for behavioral questions',
        'Research company values and mission',
        'Practice "Tell me about yourself" (2 min version)',
        'Prepare questions to ask the interviewer',
        'Review your resume thoroughly',
        'Mock HR interview with friend',
      ],
      whyItMatters: 'Cultural fit and communication skills. Often the final deciding factor.',
    },
  ];
  
  return checklist;
}

export function generatePlan(skills: ExtractedSkills): string[] {
  const hasDSA = skills.coreCS.includes('DSA') || skills.coreCS.includes('Data Structures');
  const hasWeb = skills.web.includes('React') || skills.web.includes('Node.js');
  const hasDB = skills.data.includes('SQL') || skills.data.includes('MySQL');
  
  return [
    'Day 1: Review Core CS fundamentals - OS, DBMS, Networks basics',
    'Day 2: Deep dive into OOP concepts + Practice 5 problems',
    hasDSA ? 'Day 3: Arrays and Strings - Solve 10 problems' : 'Day 3: Programming fundamentals + Practice exercises',
    hasDSA ? 'Day 4: Trees and Graphs - Solve 8 problems' : 'Day 4: Advanced concepts in your tech stack',
    hasWeb ? 'Day 5: React/Node project review + Resume alignment' : 'Day 5: Project deep dive + Documentation',
    hasDB ? 'Day 6: SQL practice + Mock interview questions' : 'Day 6: Database concepts + Mock questions',
    'Day 7: Full mock interview + Revision of weak areas',
  ];
}

export function generateQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = [];
  const hasDSA = skills.coreCS.includes('DSA') || skills.coreCS.includes('Data Structures');
  const hasReact = skills.web.includes('React');
  const hasNode = skills.web.includes('Node.js');
  const hasSQL = skills.data.includes('SQL') || skills.data.includes('MySQL') || skills.data.includes('PostgreSQL');
  const hasAWS = skills.cloud.includes('AWS');
  const hasJava = skills.languages.includes('Java');
  
  // DSA questions
  if (hasDSA) {
    questions.push('How would you optimize search in a sorted array? Compare binary vs linear search.');
    questions.push('Explain the difference between DFS and BFS. When would you use each?');
    questions.push('How do you detect a cycle in a linked list?');
  }
  
  // React questions
  if (hasReact) {
    questions.push('Explain React state management options: useState, useReducer, Context API, Redux.');
    questions.push('What are React hooks rules and why do they exist?');
    questions.push('How does React virtual DOM work and why is it performant?');
  }
  
  // Node.js questions
  if (hasNode) {
    questions.push('Explain the event loop in Node.js with examples.');
    questions.push('How do you handle errors in async/await vs callbacks?');
  }
  
  // SQL questions
  if (hasSQL) {
    questions.push('Explain indexing in databases and when it helps vs hurts performance.');
    questions.push('Write a query to find the second highest salary in a table.');
    questions.push('What is normalization and when would you denormalize?');
  }
  
  // AWS questions
  if (hasAWS) {
    questions.push('Explain the difference between EC2, Lambda, and ECS.');
    questions.push('How would you design a highly available architecture on AWS?');
  }
  
  // Java questions
  if (hasJava) {
    questions.push('Explain the difference between Abstract Class and Interface in Java.');
    questions.push('How does Java garbage collection work?');
  }
  
  // General questions
  questions.push('Tell me about a challenging bug you fixed and how you approached it.');
  questions.push('How do you stay updated with new technologies in your field?');
  questions.push('Describe a time you had to learn a new technology quickly.');
  
  // Ensure we have exactly 10 questions
  while (questions.length < 10) {
    questions.push('Explain a project you are proud of and your specific contributions.');
  }
  
  return questions.slice(0, 10);
}

export function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdLength: number
): number {
  let score = 35;
  
  // +5 per detected category (max 30)
  const categories = getDetectedCategories(skills);
  score += Math.min(categories.length * 5, 30);
  
  // +10 if company name provided
  if (company && company.trim().length > 0) {
    score += 10;
  }
  
  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10;
  }
  
  // +10 if JD length > 800 chars
  if (jdLength > 800) {
    score += 10;
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

export function analyzeJD(
  jdText: string,
  company: string,
  role: string
): AnalysisResult {
  const extractedSkills = extractSkills(jdText);
  
  // If no skills detected, show general fresher stack
  if (!hasAnySkills(extractedSkills)) {
    extractedSkills.coreCS = ['DSA', 'OOP'];
    extractedSkills.languages = ['Java', 'Python'];
  }
  
  const plan = generatePlan(extractedSkills);
  const checklist = generateChecklist(extractedSkills);
  const questions = generateQuestions(extractedSkills);
  const readinessScore = calculateReadinessScore(extractedSkills, company, role, jdText.length);
  
  const result: AnalysisResult = {
    extractedSkills,
    plan,
    checklist,
    questions,
    readinessScore,
  };
  
  // Add company intel if company name provided
  if (company && company.trim().length > 0) {
    result.companyIntel = generateCompanyIntel(company, jdText, extractedSkills);
    result.roundMapping = generateRoundMapping(result.companyIntel, extractedSkills);
  }
  
  return result;
}
