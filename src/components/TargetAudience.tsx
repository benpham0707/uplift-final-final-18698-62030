import { motion } from 'motion/react';
import { User, BookOpen, Briefcase, Coffee } from 'lucide-react';

const personas = [
  {
    title: "The Overloaded AP/IB Kid",
    desc: "You’re doing ‘everything’ but still feel behind. We help you prioritize what actually matters.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "The Late Bloomer",
    desc: "You woke up junior year like ‘oh, applications are soon.’ We show you what’s still possible.",
    icon: Coffee,
    color: "bg-amber-100 text-amber-600"
  },
  {
    title: "The Working Student",
    desc: "You work, support family, or both. Uplift makes sure colleges see that as strength, not a distraction.",
    icon: Briefcase,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "The Quiet Grinder",
    desc: "You’re not president of ten clubs, but you show up and do the work. We show that consistency clearly.",
    icon: User,
    color: "bg-purple-100 text-purple-600"
  }
];

const TargetAudience = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for students like you.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-6 rounded-2xl shadow-sm border"
            >
              <div className={`w-10 h-10 rounded-lg ${persona.color} flex items-center justify-center mb-4`}>
                <persona.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">{persona.title}</h3>
              <p className="text-sm text-muted-foreground">{persona.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

