import { motion } from 'motion/react';
import { ScanLine, Target, PenTool, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: ScanLine,
      title: "AI Portfolio Scanner: Find what actually makes you stand out",
      description: "We read between the lines. Uplift looks at your school, work, family, and community life to surface strengths you probably think are ‘nothing special’ – and translates them into application-ready language.",
      bullets: [
        "Turns everyday experiences into impact stories",
        "Shows how you compare to your own goals, not ‘perfect kids on the internet’"
      ],
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Target,
      title: "Gap Finder: See what’s missing early",
      description: "Trying to aim for CS, business, or pre-med? Uplift compares your current path to what students on those paths usually have – then shows you realistic next steps that fit your situation.",
      bullets: [
        "Path-specific recommendations (STEM, arts, pre-med, etc.)",
        "Options for low-time / low-money situations"
      ],
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      icon: PenTool,
      title: "Narrative Builder: Talk about yourself without cringing",
      description: "Most students struggle to explain what they do. Uplift helps you turn your experiences into short, honest descriptions you can reuse for applications, rec letters, and interviews.",
      bullets: [
        "Draft bullets you can adapt for apps",
        "Prompts to help you reflect without sounding fake"
      ],
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: Trophy,
      title: "Progress Tracker: Levels, not guilt",
      description: "Instead of ‘you’re not enough,’ you’ll see your growth over time: Bronze → Silver → Gold → Platinum. Every shift, project, and responsibility can move you up a level.",
      bullets: [
        "Visual progress bar of your portfolio",
        "Mini-challenges you can actually finish in a week"
      ],
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-12 w-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-3">
                {feature.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${feature.color.replace('text-', 'bg-')}`} />
                    <span className="text-card-foreground/80">{bullet}</span>
                  </div>
                ))}
              </div>

              {index === 3 && (
                <div className="mt-6 pt-6 border-t">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                      initial={{ width: "10%" }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Bronze</span>
                    <span>Silver</span>
                    <span className="font-bold text-primary">Gold</span>
                    <span>Platinum</span>
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

