import { Clock, Users, Target, DollarSign, TrendingUp } from 'lucide-react';

// Hero metric - most impressive outcome
const heroMetric = {
  icon: DollarSign,
  value: '$4.2M',
  description: 'In scholarships unlocked for students like you',
  subtitle: 'Real money, real opportunities'
};

// Primary metrics - key outcomes that drive action
const primaryMetrics = [
  { icon: Target, value: '87%', description: 'Students reach their dream schools', impact: 'high' },
  { icon: TrendingUp, value: '3x', description: 'More opportunities discovered', impact: 'high' }
];

// Supporting metrics - build trust and credibility
const supportingMetrics = [
  { icon: Users, value: '50K+', description: 'Students transformed' },
  { icon: Clock, value: '15min', description: 'Quick setup' }
];

const testimonial = {
  quote: "Uplift helped me realize that my part-time job wasn't holding me back—it was actually my biggest strength for college applications.",
  name: "Maria R.",
  role: "First-gen college student",
  outcome: "$52,000 scholarship"
};

const SuccessMetrics = () => {
  return (
    <section className="py-16 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Real Results, Real Students
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            See the impact Uplift is making for students across all paths and backgrounds.
          </p>
        </div>

        {/* Strategic Metrics Layout */}
        <div className="mb-12">
          {/* Hero Metric - Most Impressive */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <heroMetric.icon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-6xl lg:text-7xl font-bold text-primary-foreground mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {heroMetric.value}
            </div>
            <p className="text-xl text-primary-foreground mb-2">
              {heroMetric.description}
            </p>
            <p className="text-sm text-primary-foreground/70">
              {heroMetric.subtitle}
            </p>
          </div>

          {/* Primary Metrics - Key Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            {primaryMetrics.map((metric, index) => (
              <div key={metric.description} 
                   className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 text-center hover-lift animate-slide-up border border-primary/20" 
                   style={{animationDelay: `${index * 0.1}s`}}>
                <metric.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-primary-foreground mb-3">
                  {metric.value}
                </div>
                <p className="text-lg text-primary-foreground/90">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Supporting Metrics - Trust Builders */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {supportingMetrics.map((metric, index) => (
              <div key={metric.description} 
                   className="bg-primary-foreground/5 backdrop-blur rounded-lg p-4 text-center hover-lift" 
                   style={{animationDelay: `${(index + 2) * 0.1}s`}}>
                <metric.icon className="h-5 w-5 mx-auto mb-2 text-primary-foreground/70" />
                <div className="text-xl font-semibold text-primary-foreground mb-1">
                  {metric.value}
                </div>
                <p className="text-xs text-primary-foreground/70">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <blockquote className="text-xl text-primary-foreground mb-6 italic">
            "{testimonial.quote}"
          </blockquote>
          
          <div className="flex items-center justify-center gap-6">
            <div>
              <div className="font-semibold text-primary-foreground">{testimonial.name}</div>
              <div className="text-sm text-primary-foreground/80">{testimonial.role}</div>
            </div>
            <div className="w-px h-8 bg-primary-foreground/30"></div>
            <div className="text-lg font-bold text-primary-foreground">
              {testimonial.outcome}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;