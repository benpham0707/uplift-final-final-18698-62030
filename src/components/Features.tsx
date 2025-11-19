import { motion } from 'motion/react';
import { Sparkles, Search, PenTool, TrendingUp } from 'lucide-react';

const features = [
  {
    title: "AI Portfolio Scanner",
    headline: "Find what actually makes you stand out",
    desc: "We read between the lines. Uplift looks at your school, work, family, and community life to surface strengths you probably think are ‘nothing special’.",
    bullets: ["Turns everyday experiences into impact", "Compares to your goals, not others"],
    icon: Search,
    color: "indigo"
  },
  {
    title: "Gap Finder",
    headline: "See what’s missing early",
    desc: "Trying to aim for CS, business, or pre-med? Uplift compares your current path to what students on those paths usually have – then shows you realistic next steps.",
    bullets: ["Path-specific recommendations", "Low-time / low-money options"],
    icon: Search, // Using Search as a placeholder, user didn't specify icon for Gap Finder explicitly but it fits analysis
    color: "sky"
  },
  {
    title: "Narrative Builder",
    headline: "Talk about yourself without cringing",
    desc: "Most students struggle to explain what they do. Uplift helps you turn your experiences into short, honest descriptions you can reuse for applications.",
    bullets: ["Draft bullets for apps", "Reflection prompts that aren't cheesy"],
    icon: PenTool,
    color: "violet"
  },
  {
    title: "Progress Tracker",
    headline: "Levels, not guilt",
    desc: "Instead of ‘you’re not enough,’ you’ll see your growth over time: Bronze → Silver → Gold → Platinum. Every shift, project, and responsibility can move you up.",
    bullets: ["Visual progress bar", "Mini-challenges you can finish"],
    icon: TrendingUp,
    color: "emerald",
    hasAnimation: true
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl p-8 shadow-sm border hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
              </div>

              <div className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {feature.title}
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{feature.headline}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.desc}
              </p>

              <ul className="space-y-2 mb-6">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-500`} />
                    {bullet}
                  </li>
                ))}
              </ul>

              {feature.hasAnimation && (
                <div className="mt-auto pt-4">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "70%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground">
                    <span>Bronze</span>
                    <span className="text-emerald-600">Silver</span>
                    <span>Gold</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

