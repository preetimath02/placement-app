import type { RoundMapping, CompanyIntel, ExtractedSkills } from '../types';

export function generateRoundMapping(companyIntel: CompanyIntel, skills: ExtractedSkills): RoundMapping {
  const { sizeCategory } = companyIntel;
  const hasDSA = skills.coreCS.includes('DSA') || skills.coreCS.includes('Data Structures') || skills.coreCS.includes('Algorithms');
  const hasWeb = skills.web.length > 0;
  const hasSystemDesign = skills.coreCS.includes('OS') || skills.coreCS.includes('DBMS') || skills.cloud.length > 0;
  
  const rounds: RoundMapping['rounds'] = [];
  
  if (sizeCategory === 'Enterprise') {
    // Enterprise typically has more structured rounds
    rounds.push({
      name: 'Round 1: Online Assessment',
      description: 'Aptitude + DSA coding problems',
      whyItMatters: 'Filters candidates based on fundamental problem-solving abilities and basic technical aptitude. Most candidates are eliminated here.',
    });
    
    rounds.push({
      name: 'Round 2: Technical Interview',
      description: hasDSA ? 'Deep DSA + Core CS fundamentals' : 'Core CS + Problem solving',
      whyItMatters: 'Tests your depth of understanding in algorithms, data structures, and computer science fundamentals. Expect to write and explain code.',
    });
    
    if (hasSystemDesign || hasWeb) {
      rounds.push({
        name: 'Round 3: System Design / Projects',
        description: hasSystemDesign ? 'System design + Project discussion' : 'Project deep dive + Architecture',
        whyItMatters: 'Evaluates your ability to design scalable systems and articulate technical decisions. Shows real-world engineering maturity.',
      });
    }
    
    rounds.push({
      name: `Round ${rounds.length + 1}: HR / Behavioral`,
      description: 'Culture fit + Compensation discussion',
      whyItMatters: 'Assesses alignment with company values, communication skills, and long-term fit. Often includes salary negotiation.',
    });
  } else if (sizeCategory === 'Startup') {
    // Startups focus on practical skills
    rounds.push({
      name: 'Round 1: Practical Coding',
      description: hasWeb ? 'Live coding + Stack-specific questions' : 'Problem solving + Code review',
      whyItMatters: 'Tests hands-on coding ability and familiarity with the tech stack you will use daily.',
    });
    
    if (hasSystemDesign || hasWeb) {
      rounds.push({
        name: 'Round 2: System / Architecture Discussion',
        description: 'Design discussion + Past projects',
        whyItMatters: 'Startups need engineers who can build end-to-end. Shows you can own features from design to deployment.',
      });
    }
    
    rounds.push({
      name: `Round ${rounds.length + 1}: Culture Fit`,
      description: 'Team alignment + Founder chat',
      whyItMatters: 'Early-stage teams need people who thrive in ambiguity. Tests adaptability and mission alignment.',
    });
  } else {
    // Mid-size balanced approach
    rounds.push({
      name: 'Round 1: Technical Screen',
      description: 'Coding + Basic aptitude',
      whyItMatters: 'Initial filter to assess coding proficiency and logical reasoning capabilities.',
    });
    
    rounds.push({
      name: 'Round 2: Domain Deep Dive',
      description: hasDSA ? 'DSA + Domain expertise' : 'Technical depth + Problem solving',
      whyItMatters: 'Evaluates expertise in your primary domain and ability to solve complex technical challenges.',
    });
    
    rounds.push({
      name: 'Round 3: Managerial / HR',
      description: 'Behavioral + Team fit',
      whyItMatters: 'Assesses communication, collaboration skills, and cultural alignment with the organization.',
    });
  }
  
  return { rounds };
}
