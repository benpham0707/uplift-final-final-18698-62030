import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';

const session12Essay = `**The Language of Broken Things**

Three days before regionals, our robot spoke only in failures. Every test run ended in mechanical stutters, vision errors cascading like a digital avalanche. I stared at lines of code that had worked perfectly the week before, my hands trembling as I traced through algorithms that now seemed written in a foreign language.

"It's the decimal point in line 847," I finally whispered to Sarah, our mechanical lead, after eighteen hours of debugging. A single misplaced decimal had rendered our 94% target detection rate useless. But the real bug wasn't in the code—it was in how we communicated. Our team had become a tower of Babel, each specialist speaking their own technical dialect, brilliant in isolation but incomprehensible to others.

Dad found me at 2 AM, surrounded by energy drink cans and crumpled printouts. "You know," he said, settling into the chair beside me, "the best conductors don't just read music. They translate it so every musician understands their part in the whole symphony."

His words hit differently than usual. We weren't just debugging code; we were debugging language itself. The next morning, I gathered everyone—Sarah with her mechanical blueprints, Jake clutching his fresh programming notes, veterans guarding their specialized knowledge like state secrets. My stomach churned as I faced them.

"We're going to rebuild this, but differently," I announced, voice cracking slightly. "No more expert silos. Every decision gets explained in plain English. Every fix gets documented like we're teaching it to someone who's never seen a robot before."

Sarah raised an eyebrow. "That'll take forever."

"Then we'll work forever."

What followed was the most intense collaborative debugging session I'd ever experienced. The lab filled with the symphony of shared understanding—keyboards clicking in rhythm, the metallic ping of adjustments, voices overlapping as we translated technical jargon into human language. Jake, initially intimidated by the veterans' expertise, started asking questions that revealed flaws we'd missed. Sarah began sketching mechanical concepts for the programmers. I found myself conducting not just code, but conversations.

By competition day, our robot moved like poetry. Perfect. But the real transformation was subtler—eight new programmers had learned not just debugging, but the art of making complexity comprehensible. Our 23-page debugging guide became a Rosetta Stone, translating expert knowledge into accessible wisdom.

At regionals, something extraordinary happened. Teams started approaching us, asking about our methodology. "How did you get everyone speaking the same language?" they wondered. By the end of the weekend, eighteen teams had adopted our collaborative debugging approach. Third place out of forty-seven felt secondary to watching the ripple effect of translated expertise.

The breakthrough wasn't about fixing code—it was about debugging the fundamental human fear of appearing ignorant. Every field has its tower of Babel moments, where specialists retreat into technical dialects that exclude rather than include. But expertise without translation is just sophisticated noise, brilliant melodies played to empty concert halls. True progress happens when someone has the courage to become a translator, building bridges between different forms of brilliance until isolated excellence becomes collective symphony.

Now I look for those decimal point moments everywhere—the tiny miscommunications that cascade into system failures. Because the most elegant solutions mean nothing if the people around you can't understand the language you're speaking. And sometimes the bravest thing you can do is admit you need help translating.`;

const lit = analyzeLiterarySophistication(session12Essay);

console.log('='.repeat(80));
console.log('LITERARY SOPHISTICATION ANALYSIS - Session 12 Essay');
console.log('='.repeat(80) + '\n');

console.log(`📊 Overall Score: ${lit.overallScore}/100 (Tier ${lit.tier})\n`);

console.log('DETAILED BREAKDOWN:\n');

console.log(`1. Extended Metaphor: ${lit.extendedMetaphor.score}/20`);
console.log(`   - Has metaphor: ${lit.extendedMetaphor.hasMetaphor}`);
console.log(`   - Central image: ${lit.extendedMetaphor.centralImage || 'none'}`);
console.log(`   - Occurrences: ${lit.extendedMetaphor.occurrences}`);
console.log(`   - Sustained: ${lit.extendedMetaphor.sustained}\n`);

console.log(`2. Structural Innovation: ${lit.structuralInnovation.score}/15`);
console.log(`   - Innovations: ${lit.structuralInnovation.innovations.join(', ') || 'none'}\n`);

console.log(`3. Rhythmic Prose: ${lit.rhythmicProse.score}/15`);
console.log(`   - Has variety: ${lit.rhythmicProse.hasVariety}`);
console.log(`   - Short sentences: ${lit.rhythmicProse.shortSentences}`);
console.log(`   - Long sentences: ${lit.rhythmicProse.longSentences}`);
console.log(`   - Parallelism: ${lit.rhythmicProse.hasParallelism}`);
console.log(`   - Alliteration: ${lit.rhythmicProse.hasAlliteration}\n`);

console.log(`4. Sensory Immersion: ${lit.sensoryImmersion.score}/15`);
console.log(`   - Diverse senses: ${lit.sensoryImmersion.diverseSenses}`);
console.log(`   - Sight: ${lit.sensoryImmersion.senses.sight}`);
console.log(`   - Sound: ${lit.sensoryImmersion.senses.sound}`);
console.log(`   - Touch: ${lit.sensoryImmersion.senses.touch}`);
console.log(`   - Smell: ${lit.sensoryImmersion.senses.smell}`);
console.log(`   - Taste: ${lit.sensoryImmersion.senses.taste}\n`);

console.log(`5. Authentic Voice: ${lit.authenticVoice.score}/10`);
console.log(`   - Parentheticals: ${lit.authenticVoice.hasParentheticals}`);
console.log(`   - Gen-Z vernacular: ${lit.authenticVoice.hasGenZVernacular}`);
console.log(`   - Enthusiasm: ${lit.authenticVoice.hasEnthusiasm}`);
console.log(`   - Conversational markers: ${lit.authenticVoice.conversationalMarkers.length}\n`);

console.log(`6. Perspective Shift: ${lit.perspectiveShift.score}/10`);
console.log(`   - Has shift: ${lit.perspectiveShift.hasShift}`);
console.log(`   - Type: ${lit.perspectiveShift.shiftType || 'none'}\n`);

console.log(`7. Strategic Vulnerability: ${lit.strategicVulnerability.score}/5`);
console.log(`   - Placed at end: ${lit.strategicVulnerability.placedAtEnd}`);
console.log(`   - Subverts expectation: ${lit.strategicVulnerability.subvertsExpectation}\n`);

console.log('='.repeat(80));
console.log('GAPS & OPPORTUNITIES');
console.log('='.repeat(80) + '\n');

const gaps = [];
if (lit.extendedMetaphor.score < 15) gaps.push({ name: 'Extended Metaphor', current: lit.extendedMetaphor.score, max: 20 });
if (lit.structuralInnovation.score < 10) gaps.push({ name: 'Structural Innovation', current: lit.structuralInnovation.score, max: 15 });
if (lit.rhythmicProse.score < 12) gaps.push({ name: 'Rhythmic Prose', current: lit.rhythmicProse.score, max: 15 });
if (lit.sensoryImmersion.score < 12) gaps.push({ name: 'Sensory Immersion', current: lit.sensoryImmersion.score, max: 15 });
if (lit.authenticVoice.score < 7) gaps.push({ name: 'Authentic Voice', current: lit.authenticVoice.score, max: 10 });
if (lit.perspectiveShift.score < 7) gaps.push({ name: 'Perspective Shift', current: lit.perspectiveShift.score, max: 10 });

gaps.sort((a, b) => (b.max - b.current) - (a.max - a.current));

console.log('🎯 BIGGEST OPPORTUNITIES (sorted by points missing):');
gaps.forEach((gap, i) => {
  const missing = gap.max - gap.current;
  console.log(`${i + 1}. ${gap.name}: ${gap.current}/${gap.max} (-${missing} pts)`);
});

console.log('\n='.repeat(80));
console.log('DETECTOR RECOMMENDATIONS');
console.log('='.repeat(80) + '\n');

if (lit.improvements.length > 0) {
  lit.improvements.forEach(imp => console.log(`  • ${imp}`));
}

console.log('\n' + '='.repeat(80));
console.log('CONCLUSION');
console.log('='.repeat(80) + '\n');

const totalMissing = gaps.reduce((sum, gap) => sum + (gap.max - gap.current), 0);
console.log(`Total potential improvement: +${totalMissing} points`);
console.log(`If all gaps fixed: ${Math.min(100, lit.overallScore + totalMissing)}/100\n`);

if (gaps.length > 0) {
  const biggestGap = gaps[0];
  console.log(`🎯 #1 PRIORITY: ${biggestGap.name} (missing ${biggestGap.max - biggestGap.current} pts)`);
  console.log(`   This is the biggest opportunity for improving Literary score.`);
}
