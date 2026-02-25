import type { ExtractedSkills } from '../types';

const skillKeywords = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Operating System', 'Database', 'Data Structures', 'Algorithms'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Golang', 'Ruby', 'PHP', 'Swift', 'Kotlin'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS', 'Tailwind', 'Bootstrap'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'NoSQL'],
  cloud: ['AWS', 'Azure', 'GCP', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform', 'Jenkins', 'GitHub Actions'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Jest', 'Mocha', 'Chai', 'Testing'],
};

export function extractSkills(jdText: string): ExtractedSkills {
  const normalizedText = jdText.toLowerCase();
  const extracted: ExtractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
  };

  // Extract skills for each category
  (Object.keys(skillKeywords) as Array<keyof ExtractedSkills>).forEach((category) => {
    skillKeywords[category].forEach((skill) => {
      if (normalizedText.includes(skill.toLowerCase())) {
        // Avoid duplicates
        if (!extracted[category].includes(skill)) {
          extracted[category].push(skill);
        }
      }
    });
  });

  return extracted;
}

export function getAllExtractedSkills(skills: ExtractedSkills): string[] {
  return [
    ...skills.coreCS,
    ...skills.languages,
    ...skills.web,
    ...skills.data,
    ...skills.cloud,
    ...skills.testing,
  ];
}

export function hasAnySkills(skills: ExtractedSkills): boolean {
  return getAllExtractedSkills(skills).length > 0;
}

export function getDetectedCategories(skills: ExtractedSkills): string[] {
  const categories: string[] = [];
  (Object.keys(skills) as Array<keyof ExtractedSkills>).forEach((category) => {
    if (skills[category].length > 0) {
      categories.push(category);
    }
  });
  return categories;
}
