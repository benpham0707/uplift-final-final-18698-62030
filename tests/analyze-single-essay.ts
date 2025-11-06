import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';
import { analyzeElitePatterns } from '../src/core/analysis/features/elitePatternDetector';
import { analyzeAuthenticity } from '../src/core/analysis/features/authenticityDetector';

const essay = `**The Orchestra of Broken Code**

Three days before regionals, our robot symphony collapsed into cacophony. Every vision test? Pure noise. Our "precision targeting system" couldn't distinguish between a game piece and my lunch sandwich—like a violinist playing with broken strings while insisting the instrument was perfectly tuned.

My stomach churned as I stared at the error logs scrolling endlessly across my laptop screen. The fluorescent workshop lights buzzed overhead, casting harsh shadows on the metal frame of our silent robot. I was terrified—completely lost in code that looked perfect on paper but kept failing in reality. "It's not the hardware!" Sarah snapped, her wrench clanging against the aluminum chassis as she clutched her mechanical subsystem like a first chair violinist protecting her solo. "Definitely not my motor controls," Jake shot back, his voice cracking with exhaustion. Our 12-person team had fractured into isolated specialists, each guarding their domain like territorial musicians refusing to share sheet music.

Before this disaster, our workshop buzzed with whispered complaints and finger-pointing. People worked in silos, hoarding knowledge like precious instruments. We'd gone from 15 collaborative debugging sessions in September to zero by February—everyone too proud to admit their part might be off-key. The acrid smell of overheated motors filled the air as we ran test after failed test, each beep of error codes sounding like a discordant note.

Then Dad, our mentor, suggested the unthinkable: "What if you're all playing different songs?"

One decimal point error. *One.* My target coordinates were off by exactly 10x (honestly, who puts the decimal *there*?), creating a cascade of miscommunication that turned our precision machine into mechanical chaos. But here's the beautiful thing about disasters—they force soloists to become an ensemble.

Seventy-two hours of collaborative debugging transformed everything. We shared screens like musicians sharing sheet music, explained algorithms like teaching harmonies. I documented every fix, every breakthrough, every embarrassing mistake in what became our 23-page conductor's score. "Wait, what's a Boolean again?" Jake asked at 2 AM, his eyes bloodshot but curious. By dawn, he was debugging sensor fusion algorithms in real-time, the soft clicking of keyboards creating our new rhythm.

Competition day: 94% target detection accuracy. Third place out of 47 teams. 847 successful target acquisitions.

But the real transformation? Our workshop culture evolved from territorial soloists to collaborative ensemble. By season's end, 8 new programmers had learned that code review isn't criticism—it's finding rhythm together. The same 12 people who once whispered blame now celebrated each other's breakthroughs. We went from 3 cross-team collaborations per month to 23, creating a debugging culture that 5 incoming freshmen immediately embraced.

We discovered that the most beautiful music emerges not from perfect individual performance, but from the courage to admit when you're playing wrong notes and the wisdom to listen for harmony hiding in chaos.`;

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('DETAILED ESSAY ANALYSIS');
  console.log('='.repeat(80) + '\n');

  const literary = analyzeLiterarySophistication(essay);
  const elite = analyzeElitePatterns(essay);
  const auth = analyzeAuthenticity(essay);

  console.log('📊 SCORES:');
  console.log(`  Authenticity: ${auth.overallScore}/10`);
  console.log(`  Elite Patterns: ${elite.overallScore}/100`);
  console.log(`  Literary: ${literary.overallScore}/100\n`);

  console.log('📖 LITERARY SOPHISTICATION BREAKDOWN:');
  console.log(`  Extended Metaphor: ${literary.extendedMetaphor.score}/20`);
  console.log(`  Sensory Immersion: ${literary.sensoryImmersion.score}/15`);
  console.log(`  Sentence Variety: ${literary.rhythmicProse.score}/15`);
  console.log(`  Structural Innovation: ${literary.structuralInnovation.score}/15`);
  if (literary.imageryDensity) console.log(`  Imagery Density: ${literary.imageryDensity.score}/10`);
  if (literary.figurativeLanguage) console.log(`  Figurative Language: ${literary.figurativeLanguage.score}/10`);

  console.log('✅ LITERARY STRENGTHS:');
  literary.strengths.forEach(s => console.log(`  ✓ ${s}`));

  console.log('\n⚠️  LITERARY GAPS:');
  literary.gaps.forEach(g => console.log(`  • ${g}`));

  console.log('\n🎯 ELITE PATTERNS BREAKDOWN:');
  console.log(`  Vulnerability: ${elite.vulnerability.score}/10`);
  console.log(`  Dialogue: ${elite.dialogue.score}/10`);
  console.log(`  Metrics: ${elite.metrics.score}/10`);
  console.log(`  Community: ${elite.communityImpact.score}/20`);
  console.log(`  Insight: ${elite.insight.score}/20\n`);
}

main().catch(console.error);
