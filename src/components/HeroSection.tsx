import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b bg-background pt-12 pb-20 lg:pt-20 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Copy */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground mb-6">
                For Class of 2026 & 2027
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl text-foreground">
                Turn your personal narrative into a{' '}
                <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent block">
                  powerful story.
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Uplift scans your classes, jobs, clubs, and real-life responsibilities to show what colleges actually see – and what to do next.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="text-base h-12 px-8 w-full sm:w-auto" asChild>
                <Link to="/waitlist">
                  Get my free portfolio scan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12 px-8 w-full sm:w-auto" asChild>
                <Link to="/how-it-works">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch how it works
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Takes ~5 minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>You’re not just a GPA</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual (Card Stack) */}
          <motion.div
            className="flex-1 relative w-full max-w-md lg:max-w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-[400px] w-full">
              {/* Decorative background blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />

              {/* Bottom Card (Messy) */}
              <motion.div
                className="absolute top-8 left-4 right-4 bottom-0 bg-card border rounded-2xl shadow-lg p-6 transform rotate-[-6deg] opacity-60 scale-95 origin-bottom-left"
                animate={{ 
                  rotate: [-6, -4, -6],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                <div className="space-y-3 opacity-50">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                  <div className="h-24 w-full bg-muted/50 rounded border border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <span className="text-xs">Messy Notes...</span>
                  </div>
                </div>
              </motion.div>

               {/* Middle Card */}
               <motion.div
                className="absolute top-4 left-2 right-2 bottom-4 bg-card border rounded-2xl shadow-xl p-6 transform rotate-[-3deg] opacity-80 scale-95 origin-bottom-right"
                animate={{ 
                  rotate: [-3, -1, -3],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              >
                 <div className="space-y-4 opacity-60">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 bg-muted rounded-full" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-2/3 bg-muted rounded" />
                      <div className="h-3 w-1/2 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Top Card (Clean/Uplift) */}
              <motion.div 
                className="absolute inset-0 bg-card border rounded-2xl shadow-2xl p-6 flex flex-col"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              >
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      JS
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Your Portfolio</h3>
                      <p className="text-xs text-muted-foreground">Generated by Uplift</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                    Top 15% Match
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="p-3 bg-secondary/30 rounded-lg border border-secondary">
                    <p className="text-xs font-medium text-primary mb-1">HIDDEN STRENGTH</p>
                    <p className="text-sm font-medium">Community Leadership</p>
                    <p className="text-xs text-muted-foreground mt-1">Your part-time job shows more initiative than 80% of typical club roles.</p>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-border">
                     <p className="text-xs font-medium text-orange-500 mb-1">GAP DETECTED</p>
                    <p className="text-sm font-medium">STEM Documentation</p>
                    <p className="text-xs text-muted-foreground mt-1">You have the grades, but need one project to prove interest.</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Next Step:</span>
                    <span className="font-medium text-primary cursor-pointer hover:underline">Start STEM Project &rarr;</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
