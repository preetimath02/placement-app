import type { CompanyIntel } from '../types';
import type { ExtractedSkills } from '../types';

const enterpriseCompanies = [
  'amazon', 'microsoft', 'google', 'apple', 'meta', 'facebook',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'ibm',
  'oracle', 'sap', 'salesforce', 'adobe', 'intel', 'nvidia'
];

const midSizeCompanies = [
  'stripe', 'shopify', 'slack', 'zoom', 'twilio', 'datadog',
  'snowflake', 'databricks', 'confluent', 'elastic', 'mongodb'
];

export function generateCompanyIntel(companyName: string, jdText: string, skills: ExtractedSkills): CompanyIntel {
  const normalizedName = companyName.toLowerCase().trim();
  
  // Determine size category
  let sizeCategory: 'Startup' | 'Mid-size' | 'Enterprise' = 'Startup';
  
  if (enterpriseCompanies.some(name => normalizedName.includes(name))) {
    sizeCategory = 'Enterprise';
  } else if (midSizeCompanies.some(name => normalizedName.includes(name))) {
    sizeCategory = 'Mid-size';
  }
  
  // Infer industry from keywords
  let industry = 'Technology Services';
  const normalizedJD = jdText.toLowerCase();
  
  if (normalizedJD.includes('finance') || normalizedJD.includes('bank') || normalizedJD.includes('fintech')) {
    industry = 'Financial Services';
  } else if (normalizedJD.includes('health') || normalizedJD.includes('medical') || normalizedJD.includes('pharma')) {
    industry = 'Healthcare';
  } else if (normalizedJD.includes('retail') || normalizedJD.includes('e-commerce') || normalizedJD.includes('ecommerce')) {
    industry = 'Retail & E-commerce';
  } else if (normalizedJD.includes('education') || normalizedJD.includes('learning')) {
    industry = 'Education';
  }
  
  // Determine hiring focus based on size and skills
  let hiringFocus = '';
  
  if (sizeCategory === 'Enterprise') {
    hiringFocus = 'Structured DSA + core fundamentals. Expect rigorous algorithmic rounds with emphasis on problem-solving patterns and scalable system design.';
  } else if (sizeCategory === 'Startup') {
    hiringFocus = 'Practical problem solving + stack depth. Focus on building features end-to-end, quick iterations, and adaptability to changing requirements.';
  } else {
    hiringFocus = 'Balanced approach: solid fundamentals with practical application. Moderate DSA expectations with emphasis on domain expertise.';
  }
  
  return {
    name: companyName,
    industry,
    sizeCategory,
    hiringFocus,
  };
}
