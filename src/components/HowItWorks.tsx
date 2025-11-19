import { motion } from 'motion/react';
import { ScanSearch, BrainCircuit, Map } from 'lucide-react';

const steps = [
  {
    title: "Quick Scan",
    desc: "Answer a few questions about your classes, jobs, clubs, and life stuff.",
    micro: "No PDFs or transcripts needed.",
    icon: ScanSearch,
    color: "text-blue-500 bg-blue-50"
  },
  {
    title: "AI Portfolio Scanner",
    desc: "We analyze your activities using rubrics colleges actually care about.",
    micro: "Finds hidden strengths & gaps.",
    icon: BrainCircuit,
    color: "text-purple-500 bg-purple-50"
  },
  {
    title: "Your Action Map",
    desc: "Get a simple plan: what to double down on, what to trim, and what to add.",
    micro: "Plus language for your apps.",
    icon: Map,
    color: "text-emerald-500 bg-emerald-50"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it works <span className="text-muted-foreground font-normal">(without taking over your life)</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-emerald-100 -z-10" />

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pt-8 md:pt-0"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${step.color} shadow-sm`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-center mb-3">{step.title}</h3>
                <p className="text-center text-muted-foreground mb-4">
                  {step.desc}
                </p>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                    {step.micro}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

