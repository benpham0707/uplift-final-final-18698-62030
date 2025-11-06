/**
 * Synthetic Test Entries for Analysis Engine Testing
 *
 * These entries cover the distributional spectrum:
 * - Strong: High voice, evidence, arc, reflection
 * - Weak: Templated, vague, no metrics
 * - Generic: Competent but flat
 * - Reflective: Strong meaning but weak evidence
 * - International: Non-US contexts
 */

import { ExperienceEntry } from '../../src/core/types/experience';
import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// STRONG ENTRY (Expected NQI: 85-95)
// ============================================================================

export const STRONG_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'Community Health Clinic Volunteer',
  organization: 'Eastside Community Health Center',
  role: 'Patient Navigator & Intake Coordinator',
  description_original: `Most Wednesdays smelled like bleach and citrus. I learned which regulars wanted to talk and which just needed silence while I checked them in. Started as a greeter, but three months in, I noticed patients struggling with our intake form—some couldn't read English well, others seemed overwhelmed by medical jargon. I redesigned the form with my supervisor Ana, cutting questions from 47 to 22 and adding simple icons. Wait times dropped from 18 minutes to 9, and patients started asking follow-up questions instead of just nodding. By spring, I was training two freshmen to run intake so the system wouldn't collapse when I graduated. I used to think efficiency meant speed, but I learned it actually means removing the barriers that make people feel small. That insight changed how I approach every group project now—I pause and ask what we're missing, not just what we need to do faster.`,

  time_span: 'September 2023 – June 2025',
  start_date: '2023-09-01',
  end_date: '2025-06-15',
  hours_per_week: 4,
  weeks_per_year: 40,

  category: 'service',
  tags: ['healthcare', 'community', 'leadership'],

  version: 1,
};

// ============================================================================
// WEAK ENTRY (Expected NQI: 40-55)
// ============================================================================

export const WEAK_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'Volunteer Work',
  organization: 'Local Organization',
  role: 'Volunteer',
  description_original: `I was responsible for helping with various tasks at a local organization. I was passionate about making a difference in my community and was thrilled to be part of such an impactful team. I learned a lot about teamwork and responsibility. I helped organize events and coordinate with other volunteers. It was a great experience that taught me the value of hard work and dedication. I feel like I made a big impact on the community.`,

  time_span: 'January 2024 – May 2024',
  start_date: '2024-01-01',
  end_date: '2024-05-31',
  hours_per_week: 2,
  weeks_per_year: 20,

  category: 'service',
  tags: [],

  version: 1,
};

// ============================================================================
// GENERIC ENTRY (Expected NQI: 60-70)
// ============================================================================

export const GENERIC_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'Robotics Club Member',
  organization: 'School Robotics Team',
  role: 'Programming Lead',
  description_original: `I served as Programming Lead for our school's robotics team during my junior and senior years. I coordinated the programming subteam, which consisted of 5 members. We met twice weekly to develop code for our competition robot. I implemented a new version control system using GitHub, which improved our team's efficiency. During competitions, I was responsible for troubleshooting code issues and making real-time adjustments. Our team placed 3rd at the regional competition and qualified for states. I also mentored two sophomore programmers, teaching them Java and robot control systems. This experience improved my technical skills and leadership abilities.`,

  time_span: 'September 2023 – June 2025',
  start_date: '2023-09-01',
  end_date: '2025-06-15',
  hours_per_week: 6,
  weeks_per_year: 35,

  category: 'academic',
  tags: ['STEM', 'leadership', 'programming'],

  version: 1,
};

// ============================================================================
// REFLECTIVE ENTRY (Expected NQI: 70-80)
// ============================================================================

export const REFLECTIVE_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'Peer Tutoring Program',
  organization: 'School Academic Support Center',
  role: 'Math Tutor',
  description_original: `I used to think struggling students just weren't trying hard enough—until I started tutoring geometry to freshmen after school. My first student, Marcus, would shut down the moment I explained a concept using the textbook's language. I realized the problem wasn't his effort; it was my assumption that everyone learns the way I do. I started asking, "What does this remind you of?" instead of just showing steps. He connected triangle similarity to video game perspective rendering, and suddenly proofs made sense to him. That shift—from teaching content to uncovering how someone already thinks—changed everything. I stopped measuring success by whether students got the "right" answer my way and started celebrating when they found their own path to understanding. Now I approach every explanation by first asking what the other person already knows, not what I need to tell them.`,

  time_span: 'September 2024 – June 2025',
  start_date: '2024-09-01',
  end_date: '2025-06-15',
  hours_per_week: 3,
  weeks_per_year: 32,

  category: 'academic',
  tags: ['tutoring', 'education', 'mentorship'],

  version: 1,
};

// ============================================================================
// INTERNATIONAL ENTRY (Expected NQI: 75-85)
// ============================================================================

export const INTERNATIONAL_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'Rural Education Initiative',
  organization: 'Village Development Foundation',
  role: 'English Language Coordinator',
  description_original: `In my village outside Bangalore, only 12% of students continue past 10th standard because they lack English fluency for college entrance exams. I started a weekend English conversation club in our community center with 8 students in June 2023. The challenge wasn't teaching grammar—it was overcoming the shame many felt about their accents. I invited my cousin who works in tech to speak about how he still code-switches between Kannada and English at work. That conversation shifted something. By December, we had 23 regular attendees, and students started practicing English at the local market with tourists. This year, 6 of our original members passed the state English exam, and 3 are now teaching their younger siblings. I learned that confidence, not perfection, unlocks access. I'm carrying that into my university studies—I want to research how language policy shapes educational equity in multilingual communities.`,

  time_span: 'June 2023 – Present',
  start_date: '2023-06-01',
  end_date: 'Present',
  hours_per_week: 5,
  weeks_per_year: 45,

  category: 'service',
  tags: ['education', 'language', 'community development', 'international'],

  version: 1,
};

// ============================================================================
// EDGE CASE: TOO SHORT
// ============================================================================

export const TOO_SHORT_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'School Newspaper',
  organization: 'High School Gazette',
  role: 'Writer',
  description_original: `I wrote articles for the school newspaper. Covered sports and student events. Published 10 articles over two years.`,

  time_span: 'September 2023 – June 2025',
  start_date: '2023-09-01',
  end_date: '2025-06-15',
  hours_per_week: 2,
  weeks_per_year: 30,

  category: 'arts',
  tags: [],

  version: 1,
};

// ============================================================================
// EDGE CASE: EXCESSIVE PASSIVE VOICE
// ============================================================================

export const PASSIVE_HEAVY_ENTRY: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: 'Research Assistant',
  organization: 'University Biology Lab',
  role: 'Lab Assistant',
  description_original: `I was tasked with assisting in a research project focused on plant genetics. Data was collected by me on a weekly basis. Samples were prepared and analyzed using standard protocols. Results were documented in lab notebooks and were reviewed by the principal investigator. Presentations were given at lab meetings where findings were discussed. New techniques were learned throughout the experience. Skills in data analysis and laboratory procedures were developed over the course of the internship.`,

  time_span: 'June 2024 – August 2024',
  start_date: '2024-06-01',
  end_date: '2024-08-31',
  hours_per_week: 15,
  weeks_per_year: 12,

  category: 'research',
  tags: ['science', 'biology'],

  version: 1,
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export const ALL_TEST_ENTRIES = [
  STRONG_ENTRY,
  WEAK_ENTRY,
  GENERIC_ENTRY,
  REFLECTIVE_ENTRY,
  INTERNATIONAL_ENTRY,
  TOO_SHORT_ENTRY,
  PASSIVE_HEAVY_ENTRY,
];

export const TEST_ENTRIES_BY_TYPE = {
  strong: STRONG_ENTRY,
  weak: WEAK_ENTRY,
  generic: GENERIC_ENTRY,
  reflective: REFLECTIVE_ENTRY,
  international: INTERNATIONAL_ENTRY,
  too_short: TOO_SHORT_ENTRY,
  passive_heavy: PASSIVE_HEAVY_ENTRY,
};
