/**
 * Literary Gap Analysis
 *
 * Session 12 showed:
 * - Elite Patterns: 76/100 ✅
 * - Literary: 52/100 ⚠️ (lagging by 24 points!)
 *
 * Goal: Understand WHY literary scores are low and what's missing
 */

import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';
import { analyzeElitePatterns } from '../src/core/analysis/features/elitePatternDetector';
import { analyzeAuthenticity } from '../src/core/analysis/features/authenticityDetector';

// Session 12 final essay
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

console.log('='.repeat(80));
console.log('LITERARY GAP ANALYSIS: Session 12 Essay');
console.log('='.repeat(80) + '\n');

const literary = analyzeLiterarySophistication(session12Essay);
const elite = analyzeElitePatterns(session12Essay);
const auth = analyzeAuthenticity(session12Essay);

console.log('📊 OVERALL SCORES:');
console.log(`  Literary: ${literary.overallScore}/100 ⚠️`);
console.log(`  Elite Patterns: ${elite.overallScore}/100 ✅`);
console.log(`  Authenticity: ${auth.authenticity_score.toFixed(1)}/10\n`);

console.log('=' .repeat(80));
console.log('LITERARY BREAKDOWN (Total: 70 points possible)');
console.log('='.repeat(80) + '\n');

console.log('1. EXTENDED METAPHOR (20 pts possible):');
console.log(`   Score: ${literary.extendedMetaphor.score}/20`);
console.log(`   Present: ${literary.extendedMetaphor.present ? 'Yes ✅' : 'No ❌'}`);
console.log(`   Central Theme: "${literary.extendedMetaphor.centralTheme}"`);
console.log(`   Instances Found: ${literary.extendedMetaphor.instances.length}`);
if (literary.extendedMetaphor.instances.length > 0) {
  console.log(`   Examples:`);
  literary.extendedMetaphor.instances.slice(0, 5).forEach(inst => {
    console.log(`     - "${inst.substring(0, 60)}..."`);
  });
}
console.log(`   Strength: ${literary.extendedMetaphor.strength}`);
console.log(`   Analysis: ${literary.extendedMetaphor.analysis}\n`);

console.log('2. SENSORY IMMERSION (15 pts possible):');
console.log(`   Score: ${literary.sensoryImmersion.score}/15`);
console.log(`   Senses Used: ${literary.sensoryImmersion.sensesUsed.join(', ')}`);
console.log(`   Count: ${literary.sensoryImmersion.sensesUsed.length}/5 senses`);
if (literary.sensoryImmersion.examples && literary.sensoryImmersion.examples.length > 0) {
  console.log(`   Examples:`);
  literary.sensoryImmersion.examples.slice(0, 5).forEach(ex => {
    console.log(`     - ${ex.sense}: "${ex.text.substring(0, 50)}..."`);
  });
}
console.log(`   Analysis: ${literary.sensoryImmersion.analysis}\n`);

console.log('3. RHYTHMIC PROSE / SENTENCE VARIETY (15 pts possible):');
console.log(`   Score: ${literary.rhythmicProse.score}/15`);
console.log(`   Very Short (1-4 words): ${literary.rhythmicProse.veryShortSentences?.length || 0}`);
if (literary.rhythmicProse.veryShortSentences && literary.rhythmicProse.veryShortSentences.length > 0) {
  console.log(`     Examples: ${literary.rhythmicProse.veryShortSentences.slice(0, 3).map(s => `"${s}"`).join(', ')}`);
}
console.log(`   Short (5-10 words): ${literary.rhythmicProse.shortSentences?.length || 0}`);
console.log(`   Long (25+ words): ${literary.rhythmicProse.longSentences?.length || 0}`);
console.log(`   Has Rhythm: ${literary.rhythmicProse.hasRhythm ? 'Yes ✅' : 'No ❌'}`);
console.log(`   Analysis: ${literary.rhythmicProse.analysis}\n`);

console.log('4. STRUCTURAL INNOVATION (15 pts possible):');
console.log(`   Score: ${literary.structuralInnovation.score}/15`);
console.log(`   Innovations Detected: ${literary.structuralInnovation.innovations.length}`);
if (literary.structuralInnovation.innovations.length > 0) {
  literary.structuralInnovation.innovations.forEach(innov => {
    console.log(`     ✓ ${innov}`);
  });
} else {
  console.log(`     ❌ None detected`);
}
console.log(`   Analysis: ${literary.structuralInnovation.analysis}\n`);

console.log('='.repeat(80));
console.log('GAP ANALYSIS');
console.log('='.repeat(80) + '\n');

console.log('🎯 WHAT\'S WORKING:');
const workingItems = [];
if (literary.extendedMetaphor.score >= 15) workingItems.push(`Extended Metaphor (${literary.extendedMetaphor.score}/20)`);
if (literary.sensoryImmersion.score >= 12) workingItems.push(`Sensory Immersion (${literary.sensoryImmersion.score}/15)`);
if (literary.rhythmicProse.score >= 12) workingItems.push(`Sentence Variety (${literary.rhythmicProse.score}/15)`);
if (literary.structuralInnovation.score >= 10) workingItems.push(`Structural Innovation (${literary.structuralInnovation.score}/15)`);

if (workingItems.length > 0) {
  workingItems.forEach(item => console.log(`  ✅ ${item}`));
} else {
  console.log('  ⚠️  Nothing scoring well');
}

console.log('\n⚠️  WHAT\'S LAGGING:');
const laggingItems = [];
if (literary.extendedMetaphor.score < 15) laggingItems.push({
  name: 'Extended Metaphor',
  score: literary.extendedMetaphor.score,
  max: 20,
  gap: 20 - literary.extendedMetaphor.score,
  reason: literary.extendedMetaphor.analysis
});
if (literary.sensoryImmersion.score < 12) laggingItems.push({
  name: 'Sensory Immersion',
  score: literary.sensoryImmersion.score,
  max: 15,
  gap: 15 - literary.sensoryImmersion.score,
  reason: literary.sensoryImmersion.analysis
});
if (literary.rhythmicProse.score < 12) laggingItems.push({
  name: 'Sentence Variety',
  score: literary.rhythmicProse.score,
  max: 15,
  gap: 15 - literary.rhythmicProse.score,
  reason: literary.rhythmicProse.analysis
});
if (literary.structuralInnovation.score < 10) laggingItems.push({
  name: 'Structural Innovation',
  score: literary.structuralInnovation.score,
  max: 15,
  gap: 15 - literary.structuralInnovation.score,
  reason: literary.structuralInnovation.analysis
});

laggingItems.sort((a, b) => b.gap - a.gap);
laggingItems.forEach(item => {
  console.log(`  ❌ ${item.name}: ${item.score}/${item.max} (missing ${item.gap} pts)`);
  console.log(`     Why: ${item.reason}`);
});

console.log('\n='.repeat(80));
console.log('SPECIFIC GAPS FROM DETECTOR');
console.log('='.repeat(80) + '\n');

if (literary.gaps && literary.gaps.length > 0) {
  literary.gaps.forEach(gap => console.log(`  • ${gap}`));
} else {
  console.log('  No specific gaps reported');
}

console.log('\n='.repeat(80));
console.log('RECOMMENDATIONS');
console.log('='.repeat(80) + '\n');

console.log('🎯 TO REACH 70/100 LITERARY (need +18 points):');
console.log('\nBased on gap analysis, focus on:\n');

laggingItems.forEach((item, i) => {
  if (item.gap >= 3) {
    console.log(`${i + 1}. ${item.name.toUpperCase()} (+${item.gap} pts potential)`);
    console.log(`   Current: ${item.score}/${item.max}`);
    console.log(`   Target: ${Math.min(item.max, item.score + item.gap)}/${item.max}`);

    // Specific recommendations
    if (item.name === 'Extended Metaphor' && item.score < 15) {
      console.log('   Fix: Weave metaphor into MORE paragraphs, make it more consistent');
    }
    if (item.name === 'Sensory Immersion' && item.score < 12) {
      console.log('   Fix: Add more sensory details, use more than 3 senses');
    }
    if (item.name === 'Sentence Variety' && item.score < 12) {
      console.log('   Fix: Add more very short sentences (1-4 words), ensure long sentences (25+)');
    }
    if (item.name === 'Structural Innovation' && item.score < 10) {
      console.log('   Fix: This is LOWEST scoring - biggest opportunity!');
      console.log('   Options: Add dual-scene, nonlinear time, perspective shift, or other structure');
    }
    console.log();
  }
});

console.log('='.repeat(80));
console.log('CONCLUSION');
console.log('='.repeat(80) + '\n');

const totalGap = laggingItems.reduce((sum, item) => sum + item.gap, 0);
console.log(`Total potential improvement: +${totalGap} points`);
console.log(`Current Literary: ${literary.overallScore}/100`);
console.log(`If all gaps fixed: ${Math.min(100, literary.overallScore + totalGap)}/100\n`);

const biggestGap = laggingItems[0];
if (biggestGap) {
  console.log(`🎯 BIGGEST OPPORTUNITY: ${biggestGap.name} (${biggestGap.gap} pts missing)`);
  console.log(`   This is the #1 priority for improving Literary score.\n`);
}
