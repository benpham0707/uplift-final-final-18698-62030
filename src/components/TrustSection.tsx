import { Shield, Lock, UserCheck, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

const TrustSection = () => {
  return (
    <section className="py-24 bg-slate-950 text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your data, your story.
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Uplift exists to help you understand and tell your story – not to judge you or box you in. 
              You always stay in control of what colleges and programs see.
            </p>

            <ul className="space-y-4">
              {[
                "You control what you share and what you don’t.",
                "We never sell your data to colleges or random companies.",
                "You can delete your account and data whenever you want.",
                "Designed carefully for students under 18."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-emerald-500/20 rounded-full blur-3xl"
            />
            
            <div className="relative grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <Lock className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold mb-1">Private</h3>
                <p className="text-xs text-slate-400">End-to-end encryption for all your data.</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm mt-8">
                <UserCheck className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="font-semibold mb-1">User Controlled</h3>
                <p className="text-xs text-slate-400">Only you decide who sees your profile.</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm -mt-8">
                <EyeOff className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-1">No Ad Tracking</h3>
                <p className="text-xs text-slate-400">We don't track you across the web.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

