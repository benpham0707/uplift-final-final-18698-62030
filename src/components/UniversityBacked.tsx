import { motion } from 'motion/react';

const logos = [
  { name: 'Stanford', src: '/uni_logos/stanford_transparent.png', scale: 1 },
  { name: 'MIT', src: '/uni_logos/MITtransparent.png', scale: 1 },
  { name: 'Columbia', src: '/uni_logos/columbiatransparent.png', scale: 1.3 },
  { name: 'UPenn', src: '/uni_logos/upenntransparent.png', scale: 1.3 },
  { name: 'UC Berkeley', src: '/uni_logos/ucberkeleytransparent.png', scale: 1 },
  { name: 'UCLA', src: '/uni_logos/ucla_transparent.png', scale: 1.1 },
  { name: 'UC San Diego', src: '/uni_logos/ucsdtransparent.png', scale: 1.4 },
  { name: 'UCI', src: '/uni_logos/ucitransparent.png', scale: 1 },
];

const UniversityBacked = () => {
  return (
    <section className="py-8 border-y bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Backed by professionals from
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-8 md:gap-12 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 h-16 md:h-20 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-full w-auto object-contain"
                style={{ transform: `scale(${logo.scale})` }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UniversityBacked;

