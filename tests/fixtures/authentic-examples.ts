/**
 * AUTHENTIC Test Entries
 * Based on REAL successful college admissions narratives
 */

import { ExperienceEntry } from '../../src/core/types/experience';
import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// AUTHENTIC EXAMPLE 1: Jimmy's Hot Dogs Style
// Staccato, conversational, unexpected
// ============================================================================

export const JIMMYS_HOT_DOGS_STYLE: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: "Cashier at Jimmy's Hot Dogs",
  organization: "Jimmy's Hot Dogs",
  role: "Cashier",
  description_original: `Regular Dog: $1.49. Jimmy's Famous: $1.89. Twenty-five cents for cheese. Bologna's out. Milkshake machine's broken. Refill sweet tea.

As cashier at Jimmy's Hot Dogs, I was everything but the cook. After day one, my hair stood straight and old southern ladies sympathetically asked oh honey, is it your first shift? I wanted to cry.

But, an hour before closing, Nondas, the cook, checked the register. He smiled and said "Luci Lou, you the best." Stress forgotten, we danced around the kitchen in celebration, talking about his brothers in Greece, World Cup soccer, and grilled fish.

After that, I didn't feel alone. I had Nondas. I had the regulars. And I had the southern ladies to back me up. Jimmy's taught me to value the people that make a job worthwhile. To focus on the positive when there's soccer to be watched and perfectly grilled fish to be eaten.`,

  time_span: "June 2023 – August 2024",
  start_date: "2023-06-01",
  end_date: "2024-08-31",
  hours_per_week: 20,
  weeks_per_year: 40,

  category: "work",
  tags: ["part-time", "customer service", "community"],
  version: 1,
};

// ============================================================================
// AUTHENTIC EXAMPLE 2: Santur (Uncommon Connections)
// Bold opening, cultural depth, multiple value connections
// ============================================================================

export const SANTUR_UNCOMMON: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: "Classical Persian Santur",
  organization: "Persian Arts Institute",
  role: "Student & Performer",
  description_original: `Do re fa mi, re do fa mi, re do sol fa mi re mi re. Have I completely lost it? Should I be locked up in a mental hospital chained to a chair? No. Then what are these utterances coming from my mouth? Music.

I have devoted thousands of hours of my life to playing the santur, a classical Persian instrument that originated in the Middle East. Some people think I'm strange: a Persian redheaded Jewish teenager obsessed with an ancient musical instrument. But they don't see what I see. My santur is King David's lyre: it can soothe, enrapture, mesmerize.

The santur also allows me to connect to my culture and Persian heritage, and to visit Iran of the past, a culture rich in artistic tradition. Sometimes I imagine performing for the king in the Hanging Gardens of Babylon, the santur sounds echoing through the Seven Hills of Jerusalem.

Today, some Americans view Iran as a land of terrorists, but when I play the innocent of Iran, the educated, the artists, the innovators, come to life. Iran is not a country of savages; it's Kubla Khan's fountain, an abundant source of knowledge and creativity.

Finally, the santur represents one of my remaining links to my grandfather. In the last few years of his life, Baba Joon did not know me as his grandson. Alzheimer's slowly took over his brain, and eventually he could not recognize me. Baba Joon grew up with the music of the santur and my father plays it in his car every day, so when I play, the music connects all three generations.

In December I'll be releasing my first album, a collection of classical Persian pieces. Proceeds from the album will go toward Alzheimer's research, as I hope to play some small part in finding a cure for the disease.`,

  time_span: "2018 – Present",
  start_date: "2018-09-01",
  end_date: "Present",
  hours_per_week: 10,
  weeks_per_year: 50,

  category: "arts",
  tags: ["music", "cultural heritage", "family", "social impact"],
  version: 1,
};

// ============================================================================
// AUTHENTIC EXAMPLE 3: Newspaper Love-Hate (Creative Metaphor)
// Humor, personality, creative framing
// ============================================================================

export const NEWSPAPER_RELATIONSHIP: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: "School Newspaper Editor",
  organization: "The Log",
  role: "Editor",
  description_original: `My school's newspaper and I have a typical love-hate relationship; some days I want nothing more than to pass two hours writing and formatting articles, while on others the mere thought of student journalism makes me shiver. Still, as we're entering our fourth year together, you could consider us relatively stable. We've learned to accept each other's differences; at this point I've become comfortable spending an entire Friday night preparing for an upcoming issue, and I hardly even notice the snail-like speed of our computers. I've even benefitted from the polygamous nature of our relationship—with twelve other editors, there's a lot of cooperation involved. Perverse as it may be, from that teamwork I've both gained some of my closest friends and improved my organizational and time-management skills. And though leaving it in the hands of new editors next year will be difficult, I know our time together has only better prepared me for future relationships.`,

  time_span: "September 2021 – June 2025",
  start_date: "2021-09-01",
  end_date: "2025-06-15",
  hours_per_week: 6,
  weeks_per_year: 36,

  category: "arts",
  tags: ["journalism", "writing", "leadership"],
  version: 1,
};

// ============================================================================
// AUTHENTIC EXAMPLE 4: International Column (Passion Without Cliché)
// Active voice, specific details, future-oriented
// ============================================================================

export const INTERNATIONAL_JOURNALISM: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: "International News Editor",
  organization: "The Log",
  role: "International Column Editor",
  description_original: `VIOLENCE IN EGYPT ESCALATES. FINANCIAL CRISIS LEAVES EUROPE IN TURMOIL. My quest to become a journalist began by writing for the international column of my school newspaper, The Log. My specialty is international affairs; I'm the messenger who delivers news from different continents to the doorsteps of my community. Late-night editing, researching and re-writing is customary, but seeing my articles in print makes it all worthwhile. I'm the editor for this section, responsible for brainstorming ideas and catching mistakes. Each spell-check I make, each sentence I type out, and each article I polish will remain within the pages of The Log. Leading a heated after-school brainstorming session, watching my abstract thoughts materialize onscreen, holding the freshly printed articles in my hand—I write for this joyous process of creation. One day I'll look back, knowing this is where I began developing the scrutiny, precision and rigor necessary to become a writer.`,

  time_span: "September 2023 – Present",
  start_date: "2023-09-01",
  end_date: "Present",
  hours_per_week: 8,
  weeks_per_year: 36,

  category: "academic",
  tags: ["journalism", "international affairs", "writing"],
  version: 1,
};

// ============================================================================
// AUTHENTIC EXAMPLE 5: Political Conference (Identity & Purpose)
// Sensory but genuine, cultural connection, concrete follow-through
// ============================================================================

export const POLITICAL_CONFERENCE: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: "Political Conference & Advocacy",
  organization: "Youth Political Action Conference",
  role: "Delegate & Organizer",
  description_original: `The cool, white halls of the Rayburn House office building contrasted with the bustling energy of interns entertaining tourists, staffers rushing to cover committee meetings, and my fellow conference attendees separating to meet with our respective congresspeople. Through civics and US history classes, I had learned about our government, but simply hearing the legislative process outlined didn't prepare me to navigate it. It was my first political conference, and, after learning about congressional mechanics during breakout sessions, I was lobbying my representative about an upcoming vote crucial to the US-Middle East relationship. As the daughter of Iranian immigrants, my whole life had led me to the moment when I could speak on behalf of the family members who had not emigrated with my parents.

As I sat down with my congresswoman's chief of staff, I truly felt like a participant in democracy; I was exercising my right to be heard as a young American. Through this educational conference, I developed a plan of action to raise my voice. When I returned home, I signed up to volunteer with the state chapter of the Democratic Party. I sponsored letter-writing campaigns, canvassed for local elections, and even pursued an internship with a state senate campaign. I know that I don't need to be old enough to vote to effect change. Most importantly, I also know that I want to study government—I want to make a difference for my communities in the United States and the Middle East throughout my career.`,

  time_span: "July 2023 – Present",
  start_date: "2023-07-01",
  end_date: "Present",
  hours_per_week: 6,
  weeks_per_year: 45,

  category: "leadership",
  tags: ["politics", "advocacy", "cultural identity", "community"],
  version: 1,
};

// ============================================================================
// AUTHENTIC EXAMPLE 6: Stereotype Project (Viral Movement)
// Origin story, viral impact, ongoing platform
// ============================================================================

export const STEREOTYPE_PROJECT: ExperienceEntry = {
  id: uuidv4(),
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  title: "The Stereotype Project",
  organization: "The Stereotype Project (Founded)",
  role: "Founder & Director",
  description_original: `In eighth grade, I created an art piece addressing a stereotype I had faced and posted it online, encouraging my friends to do the same and hashtag it #StereotypeProject. The drawing snowballed into a viral movement, gathering the attention of over 1,000 youth artists worldwide, each contributing their own stories and drawings. The Stereotype Project has since grown, extending into local schools and calling on the next generation to stand strong against the biases they face due to race, gender, sexual orientation, mental illness, and more. In a time of increasing youth activism and reminders of the potential we have as young revolutionaries, the Stereotype Project is a channel for creative expression, unity, and a means of imparting a positive impact on the world. Our website continues to be live and accept submissions: stereotypeproject.org.`,

  time_span: "2021 – Present",
  start_date: "2021-03-01",
  end_date: "Present",
  hours_per_week: 8,
  weeks_per_year: 50,

  category: "leadership",
  tags: ["social justice", "art", "viral movement", "founder"],
  version: 1,
};

// ============================================================================
// EXPORT ALL AUTHENTIC EXAMPLES
// ============================================================================

export const AUTHENTIC_EXAMPLES = [
  JIMMYS_HOT_DOGS_STYLE,
  SANTUR_UNCOMMON,
  NEWSPAPER_RELATIONSHIP,
  INTERNATIONAL_JOURNALISM,
  POLITICAL_CONFERENCE,
  STEREOTYPE_PROJECT,
];

export const AUTHENTIC_EXAMPLES_BY_STYLE = {
  staccato_conversational: JIMMYS_HOT_DOGS_STYLE,
  uncommon_connections: SANTUR_UNCOMMON,
  creative_metaphor: NEWSPAPER_RELATIONSHIP,
  headline_opener: INTERNATIONAL_JOURNALISM,
  identity_purpose: POLITICAL_CONFERENCE,
  viral_movement: STEREOTYPE_PROJECT,
};
