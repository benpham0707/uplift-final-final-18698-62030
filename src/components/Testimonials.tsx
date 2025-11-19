import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What students say after their first scan
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl border shadow-sm relative"
          >
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/10" />
            <p className="text-lg mb-6 relative z-10 pt-6">
              "I didn’t realize my job and helping my siblings actually counted for anything. Now it’s literally the center of my story."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
              <div>
                <div className="font-semibold">Student</div>
                <div className="text-xs text-muted-foreground">Class of 2026</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 rounded-2xl border shadow-sm relative"
          >
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/10" />
            <p className="text-lg mb-6 relative z-10 pt-6">
              "It made me feel like my path doesn’t have to look like everyone else’s to be valid."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-rose-500" />
              <div>
                <div className="font-semibold">Student</div>
                <div className="text-xs text-muted-foreground">Class of 2025</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Created by first-gen and non-traditional students who’ve been through this process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

