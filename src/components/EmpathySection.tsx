import { motion } from 'motion/react';

const EmpathySection = () => {
  const cards = [
    {
      title: "Am I doing enough?",
      text: "You’re doing a lot… but you’re not sure if it ‘counts’ for college.",
      emoji: "🤔"
    },
    {
      title: "The Generic Advice Trap",
      text: "Everyone says ‘stand out’ but no one explains exactly how.",
      emoji: "🤷‍♂️"
    },
    {
      title: "Zero Free Time",
      text: "School, job, family duties… you have no time to ‘optimize’ yourself.",
      emoji: "⏳"
    },
    {
      title: "Information Overload",
      text: "College TikTok + Reddit = more anxiety, not more clarity.",
      emoji: "🤯"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            If this sounds like you, you’re in the right place.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Uplift was built for real students – the ones balancing APs and shifts at work, 
            helping siblings, or figuring it out late.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpathySection;

