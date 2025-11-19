import { motion } from 'motion/react';
import { Compass, Code, Heart, Layers } from 'lucide-react';

const paths = [
  {
    title: "Traditional Excellence",
    desc: "Aim for top schools with a strong academic + extracurricular profile.",
    icon: Compass,
    color: "bg-blue-500"
  },
  {
    title: "Builder Path",
    desc: "Double down on projects, startups, or creative work – even if your GPA isn’t perfect.",
    icon: Code,
    color: "bg-orange-500"
  },
  {
    title: "Impact Path",
    desc: "Lean into community, service, and leadership that actually matters to you.",
    icon: Heart,
    color: "bg-rose-500"
  },
  {
    title: "Flexible Path",
    desc: "Keep options open – solid apps for 4-year schools, transfers, or community college.",
    icon: Layers,
    color: "bg-purple-500"
  }
];

const AlternativePaths = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            There’s more than one way to win.
          </h2>
          <p className="text-lg text-muted-foreground">
            Uplift doesn’t spit out one ‘perfect’ path. It shows you a few realistic futures based on who you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, rotate: index % 2 === 0 ? 1 : -1 }}
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all cursor-default group"
            >
              <div className={`w-12 h-12 rounded-xl ${path.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-colors`}>
                <path.icon className={`w-6 h-6 text-foreground`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {path.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlternativePaths;

