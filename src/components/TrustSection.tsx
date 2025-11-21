import { motion } from 'motion/react';
import { Shield, Lock, UserCheck, EyeOff } from 'lucide-react';

const TrustSection = () => {
  const features = [
    {
      icon: Lock,
      text: "You control what you share and what you don’t."
    },
    {
      icon: EyeOff,
      text: "We never sell your data to colleges or random companies."
    },
    {
      icon: UserCheck,
      text: "Designed carefully for students under 18, with clear options for involving parents/guardians."
    },
    {
      icon: Shield,
      text: "You can delete your account and data whenever you want."
    }
  ];

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Your data, your story.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Uplift exists to help you understand and tell your story – not to judge you or box you in. You always stay in control of what colleges and programs see.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 text-primary flex-shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-md lg:max-w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 bg-background border rounded-full flex items-center justify-center shadow-2xl">
               <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_10s_linear_infinite]" />
               <Shield className="h-24 w-24 text-primary/20" />
               <div className="absolute bottom-8 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                 <Lock className="h-3 w-3" />
                 <span>Encrypted & Private</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

