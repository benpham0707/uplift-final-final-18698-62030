import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Brain, 
  GraduationCap,
  Lightbulb,
  Users,
  BarChart3,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Zap,
  Star,
  Settings,
  Search,
  PlusCircle,
  MapPin,
  Award,
  Code,
  MessageSquare,
  Briefcase,
  Globe,
  Building,
  Play
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AcademicPlanningIntelligence = () => {
  const [activeTab, setActiveTab] = useState("academic");

  // Hard coded data representing AI-powered academic planning features
  const academicPlanningFeatures = [
    {
      icon: GraduationCap,
      title: "Course Recommendation Engine",
      description: "Multi-horizon planning for next semester, next year, and graduation requirements",
      features: ["Strategic sequencing", "Prerequisite optimization", "Workload balancing", "Professor intelligence"]
    },
    {
      icon: BarChart3,
      title: "Grade Optimization Strategy", 
      description: "Strategic grade targeting and effort allocation for maximum impact",
      features: ["When A's matter vs B's", "Recovery planning", "Risk management", "Context-aware advice"]
    },
    {
      icon: MapPin,
      title: "Special Scenarios",
      description: "Tailored strategies for unique academic paths and situations",
      features: ["Transfer students", "Double majors", "Pre-professional tracks", "Study abroad timing"]
    }
  ];

  const projectIncubationFeatures = [
    {
      icon: Search,
      title: "Project Discovery Process",
      description: "Start with passions and curiosities to find real problems worth solving",
      features: ["Interest mining", "Problem identification", "Skill inventory matching", "Resource reality check"]
    },
    {
      icon: MessageSquare,
      title: "AI Collaboration Modes",
      description: "Socratic questioning and development partnership for unique project ideas",
      features: ["Probing questions", "Technical architecture", "Feature prioritization", "Launch planning"]
    },
    {
      icon: Star,
      title: "Uniqueness Preservation",
      description: "Ensure your projects stand out in a crowded landscape",
      features: ["Saturation tracking", "Variation suggestions", "Niche identification", "Personal story integration"]
    }
  ];

  const extracurricularFeatures = [
    {
      icon: TrendingUp,
      title: "Involvement Portfolio Analysis",
      description: "Strategic assessment of your activities for maximum impact",
      features: ["Leadership ladder mapping", "Time ROI calculation", "Skill development mapping", "Network value assessment"]
    },
    {
      icon: Target,
      title: "Strategic Recommendations",
      description: "Depth vs breadth optimization for your specific goals",
      features: ["When to go deep", "Leadership development pathway", "Impact amplification", "Position targeting"]
    },
    {
      icon: Award,
      title: "Competition & Creation Strategy",
      description: "Win competitions and create new opportunities",
      features: ["Competition selection", "Team formation strategy", "Club founding guidance", "Event organization"]
    }
  ];

  const skillDevelopmentFeatures = [
    {
      icon: Brain,
      title: "Skill Gap Analysis",
      description: "Identify and prioritize the skills that matter most for your goals",
      features: ["Current state assessment", "Target state definition", "Gap prioritization", "Learning path optimization"]
    },
    {
      icon: Settings,
      title: "Learning Strategy Personalization",
      description: "Optimize your learning approach based on your style and pace",
      features: ["Learning style matching", "Pace optimization", "Resource curation", "Practice integration"]
    },
    {
      icon: Code,
      title: "Skill Categories & Strategies",
      description: "Comprehensive approach to technical, soft, and domain skills",
      features: ["Technical stack development", "Communication skills", "Industry knowledge", "Certification strategy"]
    }
  ];

  // Hard coded project examples - represents real AI-generated project ideas
  const projectExamples = [
    {
      category: "Technical",
      title: "AI-Powered Study Group Matcher",
      description: "App that matches students based on learning styles, schedules, and course difficulty",
      skills: ["React Native", "Machine Learning", "Database Design"],
      uniqueness: "Addresses real problem of ineffective study groups with data-driven matching"
    },
    {
      category: "Social Impact", 
      title: "Local Food Waste Reduction Platform",
      description: "Connect restaurants with food banks and community organizations",
      skills: ["Project Management", "Stakeholder Engagement", "Impact Measurement"],
      uniqueness: "Focuses on hyperlocal solutions rather than broad national approaches"
    },
    {
      category: "Creative",
      title: "Interactive College Prep Podcast Series",
      description: "Student-hosted podcast with interactive elements and community features",
      skills: ["Content Creation", "Audio Production", "Community Building"],
      uniqueness: "Combines traditional podcasting with interactive digital experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm">
              🎯 Academic Planning Intelligence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Strategic Academic Planning
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              AI-powered planner and project generator that helps you navigate the right choices across academics, projects, extracurriculars, and skill development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Your Strategic Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">94%</div>
                <div className="text-sm text-muted-foreground">Better Decision Making</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5.2x</div>
                <div className="text-sm text-muted-foreground">Faster Goal Achievement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Hours Saved Planning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Planning Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Four Strategic Pillars for Academic Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI-powered guidance across every aspect of your academic journey
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full mb-12">
              <TabsTrigger value="academic" className="flex flex-col gap-2 p-4">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">Academic Planning</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex flex-col gap-2 p-4">
                <Lightbulb className="h-5 w-5" />
                <span className="text-sm">Project Incubation</span>
              </TabsTrigger>
              <TabsTrigger value="extracurricular" className="flex flex-col gap-2 p-4">
                <Users className="h-5 w-5" />
                <span className="text-sm">Extracurricular Strategy</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex flex-col gap-2 p-4">
                <Brain className="h-5 w-5" />
                <span className="text-sm">Skill Development</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="academic" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Academic Planning Intelligence</h3>
                <p className="text-muted-foreground text-lg">Strategic course selection and grade optimization based on your goals, capacity, and market demands</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {academicPlanningFeatures.map((feature, index) => (
                  <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Start Academic Planning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Project Incubation System</h3>
                <p className="text-muted-foreground text-lg">AI-collaborative project development that ensures uniqueness and maximum impact</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {projectIncubationFeatures.map((feature, index) => (
                  <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Start Project Discovery
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Project Examples */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">AI-Generated Project Examples</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {projectExamples.map((project, index) => (
                    <Card key={index} className="border">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Skills Developed:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.skills.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Uniqueness Factor:</p>
                            <p className="text-xs text-muted-foreground">{project.uniqueness}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="extracurricular" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Extracurricular Strategy Engine</h3>
                <p className="text-muted-foreground text-lg">Strategic involvement optimization for maximum impact and personal growth</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {extracurricularFeatures.map((feature, index) => (
                  <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Optimize Activities
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Skill Development Accelerator</h3>
                <p className="text-muted-foreground text-lg">Strategic skill building aligned with your goals and market demands</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {skillDevelopmentFeatures.map((feature, index) => (
                  <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Analyze Skills Gap
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Skill Categories */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Technical Skills</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>• Stack development</li>
                      <li>• Tool mastery sequencing</li>
                      <li>• Certification strategy</li>
                      <li>• Portfolio building</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Soft Skills</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>• Communication development</li>
                      <li>• Leadership building</li>
                      <li>• Collaboration skills</li>
                      <li>• Cultural intelligence</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Domain Knowledge</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>• Industry learning</li>
                      <li>• Business acumen</li>
                      <li>• Research skills</li>
                      <li>• Market dynamics</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Academic Strategy?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get AI-powered guidance across academics, projects, extracurriculars, and skill development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                Start Strategic Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg bg-white/10 border-white text-white hover:bg-white/20">
                Book Strategy Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademicPlanningIntelligence;