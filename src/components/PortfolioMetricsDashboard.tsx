import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Brain, 
  Users, 
  BookOpen, 
  Lightbulb,
  BarChart3,
  PieChart,
  Calendar,
  Star,
  CheckCircle,
  ArrowUp,
  Download,
  Eye,
  Zap,
  Briefcase,
  Heart,
  MessageCircle,
  Link,
  Trophy,
  Shield,
  Compass,
  Rocket,
  Network,
  GraduationCap,
  FileText,
  ChevronRight,
  MapPin,
  Globe,
  Sparkles,
  TrendingDown,
  AlertCircle,
  ThumbsUp,
  Coffee,
  Code,
  Palette,
  Music,
  Camera,
  Mountain,
  ArrowLeft,
  ExternalLink,
  Activity,
  Layers,
  Filter
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ScatterChart,
  Scatter,
  Cell
} from "recharts";

// Mock data for comprehensive portfolio analytics - This represents deep insights from student project narratives
const portfolioData = [
  {
    id: 1,
    title: "Community Garden Network App",
    type: "Technical Leadership",
    category: "Social Impact Tech",
    completedDate: "2024-06-15",
    verified: true,
    projectPhase: "Launched & Scaling",
    
    // Enhanced Overview Data
    overview: {
      description: "A comprehensive platform connecting urban gardeners, featuring real-time crop tracking, community knowledge sharing, and sustainability impact measurement",
      impactStory: {
        genesis: "Started after witnessing food deserts in my neighborhood during pandemic",
        evolution: [
          { phase: "Discovery", milestone: "Interviewed 50+ community members", impact: "Identified core need for connection" },
          { phase: "Prototype", milestone: "Built MVP with React/Node.js", impact: "Validated concept with 20 beta users" },
          { phase: "Launch", milestone: "Deployed to 3 neighborhoods", impact: "200+ active users in first month" },
          { phase: "Scale", milestone: "Partnership with city government", impact: "Expanded to 8 neighborhoods, 500+ users" }
        ],
        breakthrough: "Realized that success wasn't just about tech - it was about building genuine community trust"
      },
      stakeholderEcosystem: [
        { role: "Community Members", count: 500, relationship: "Primary Users", influence: "High" },
        { role: "Local Government", count: 3, relationship: "Strategic Partner", influence: "High" },
        { role: "Environmental NGOs", count: 5, relationship: "Content Partners", influence: "Medium" },
        { role: "Tech Mentors", count: 2, relationship: "Technical Advisors", influence: "Medium" },
        { role: "Local Businesses", count: 8, relationship: "Sponsors", influence: "Low" }
      ],
      metricsEvolution: {
        userGrowth: [
          { month: "Jan", users: 0, retention: 0, engagement: 0 },
          { month: "Feb", users: 20, retention: 95, engagement: 78 },
          { month: "Mar", users: 85, retention: 87, engagement: 82 },
          { month: "Apr", users: 200, retention: 81, engagement: 75 },
          { month: "May", users: 350, retention: 79, engagement: 79 },
          { month: "Jun", users: 500, retention: 83, engagement: 84 }
        ]
      },
      verification: {
        demoLink: "https://communitygarden.demo",
        mediaFeatures: ["Local News Interview", "City Council Presentation", "University Tech Showcase"],
        testimonials: [
          { name: "Maria Santos", role: "Community Leader", quote: "This app transformed how our neighborhood connects around food sustainability" },
          { name: "Dr. James Liu", role: "Urban Planning Professor", quote: "Remarkable integration of technology with grassroots community organizing" }
        ],
        certificates: ["Winner - Civic Tech Challenge 2024", "Featured - Social Impact Showcase"]
      },
      applicationReadiness: {
        essayPotential: 95,
        interviewStories: 8,
        uniquenessScore: 92,
        leadershipEvidence: "Strong",
        impactDocumentation: "Comprehensive"
      }
    },

    // Deep Skills Analytics
    skills: {
      developmentJourney: [
        {
          skill: "Full-Stack Development",
          phases: [
            { phase: "Beginner", duration: "Month 1", evidence: "Built first React component", proficiency: 20 },
            { phase: "Intermediate", duration: "Month 2-3", evidence: "Created REST API with authentication", proficiency: 60 },
            { phase: "Advanced", duration: "Month 4-6", evidence: "Implemented real-time features, deployed to production", proficiency: 85 }
          ],
          marketValue: "High",
          transferability: ["Web Development", "Mobile Apps", "Data Visualization"],
          uniqueApplication: "Applied to social impact context with community-centered design"
        },
        {
          skill: "Community Engagement",
          phases: [
            { phase: "Novice", duration: "Month 1", evidence: "Conducted initial interviews", proficiency: 30 },
            { phase: "Developing", duration: "Month 2-4", evidence: "Facilitated community meetings", proficiency: 70 },
            { phase: "Proficient", duration: "Month 5-6", evidence: "Led partnership negotiations with city", proficiency: 90 }
          ],
          marketValue: "Very High",
          transferability: ["Public Relations", "Non-profit Management", "Policy Advocacy"],
          uniqueApplication: "Bridged technical and community perspectives in urban planning"
        }
      ],
      competencyNetwork: [
        { skill: "React.js", level: 85, connections: ["Node.js", "UI/UX Design", "Data Visualization"] },
        { skill: "Node.js", level: 80, connections: ["Database Design", "API Development", "Security"] },
        { skill: "Community Organizing", level: 90, connections: ["Public Speaking", "Project Management", "Empathy"] },
        { skill: "Data Analysis", level: 75, connections: ["Research Methods", "Storytelling", "Policy Understanding"] },
        { skill: "UI/UX Design", level: 70, connections: ["User Research", "Accessibility", "Visual Communication"] }
      ],
      learningStyle: {
        primary: "Hands-on Builder",
        indicators: [
          "Built prototype immediately after learning concept",
          "Learned through real user feedback cycles",
          "Preference for pair programming with mentors"
        ],
        recommendations: ["Continue project-based learning", "Seek technical mentorship", "Join maker communities"]
      },
      softSkillsEvidence: {
        leadership: [
          { moment: "Convinced skeptical community leader to join advisory board", skill: "Persuasion & Vision" },
          { moment: "Mediated disagreement between technical team and community stakeholders", skill: "Conflict Resolution" },
          { moment: "Motivated team during technical setbacks in month 3", skill: "Resilience & Motivation" }
        ],
        communication: [
          { context: "City Council Presentation", skill: "Public Speaking", outcome: "Secured $5K funding" },
          { context: "Technical Documentation", skill: "Written Communication", outcome: "Enabled 2 new developers to contribute" },
          { context: "Community Workshops", skill: "Teaching", outcome: "Trained 30+ users on platform" }
        ]
      }
    },

    // Story Intelligence
    narrative: {
      personalBrandArchitecture: {
        coreIdentity: "Tech-enabled Community Builder",
        valueProposition: "Bridges digital innovation with grassroots social impact",
        differentiators: ["Technical depth + Community trust", "Environmental passion + Pragmatic execution", "Individual contributor + Systems thinker"],
        brandConsistency: 94
      },
      storyArcAnalysis: {
        characterDevelopment: [
          { stage: "Call to Adventure", story: "Witnessing food insecurity during pandemic sparked desire to act" },
          { stage: "Initial Struggle", story: "First attempts at community organizing failed due to lack of trust" },
          { stage: "Mentor Guidance", story: "Local community leader taught me to listen before building" },
          { stage: "Skills Development", story: "Learned full-stack development to build the solution I envisioned" },
          { stage: "Community Building", story: "Realized technology alone wasn't enough - had to build relationships first" },
          { stage: "Impact & Growth", story: "Project now supports 500+ families and influenced city policy" }
        ],
        thematicConsistency: 91,
        growthEvidence: "Clear progression from individual contributor to community leader"
      },
      authenticityIndicators: {
        passionConsistency: 95,
        valueAlignment: [
          { stated: "Environmental Sustainability", demonstrated: "Measured and reduced food waste by 30%" },
          { stated: "Community Empowerment", demonstrated: "Trained community members to become platform leaders" },
          { stated: "Inclusive Technology", demonstrated: "Designed for low-bandwidth, multilingual access" }
        ],
        authenticityConcerns: []
      },
      collegeEssayGoldmine: {
        powerfulMoments: [
          { moment: "The day Mrs. Rodriguez asked me why a 17-year-old cared about her vegetable garden", 
            essayPotential: "Personal statement opener", emotionalResonance: "High" },
          { moment: "Realizing my first app prototype completely missed what the community actually needed", 
            essayPotential: "Failure/growth essay", lessonLearned: "Humility and user-centered design" },
          { moment: "Standing before city council as the youngest person to present a policy proposal", 
            essayPotential: "Leadership/impact essay", uniqueness: "Very High" }
        ],
        readyQuotes: [
          "I learned that code without community is just fancy digital art",
          "The most important debugging happened in my assumptions, not my code",
          "Success wasn't measured in user signups, but in the conversations happening in gardens"
        ]
      },
      interviewStoryBank: [
        {
          situation: "Community was skeptical of teen with tech solution",
          task: "Build trust and prove value of digital platform",
          action: "Spent 2 months attending community meetings, learning before building",
          result: "Gained advisory board support and 95% user retention rate",
          interviewFit: ["Leadership", "Overcoming Challenges", "Community Impact"]
        },
        {
          situation: "Technical architecture couldn't handle unexpected growth",
          task: "Scale system while maintaining user experience",
          action: "Learned advanced backend concepts, migrated to cloud architecture",
          result: "Platform now supports 10x original capacity with 99.9% uptime",
          interviewFit: ["Problem Solving", "Technical Skills", "Growth Mindset"]
        }
      ]
    },

    // AI-Powered Deep Insights
    insights: {
      predictiveAnalytics: {
        careerTrajectory: [
          { path: "Social Impact Tech Entrepreneur", probability: 85, reasoning: "Strong blend of technical skills and community focus" },
          { path: "Urban Planning Technology Specialist", probability: 78, reasoning: "Demonstrated interest in civic technology and policy" },
          { path: "Product Manager at Mission-Driven Company", probability: 72, reasoning: "Proven ability to bridge technical and user needs" }
        ],
        skillDevelopmentPredictions: [
          { skill: "Policy & Advocacy", growth: 65, timeline: "Next 12 months", trigger: "Continued government partnership" },
          { skill: "Team Leadership", growth: 80, timeline: "Next 6 months", trigger: "Project scaling requires delegation" },
          { skill: "Data Science", growth: 55, timeline: "Next 18 months", trigger: "Need for impact measurement analytics" }
        ]
      },
      admissionsAdvantage: {
        competitivePositioning: "Top 5% for social impact + technical depth combination",
        schoolFitAnalysis: [
          { school: "Stanford", fit: 92, reasoning: "Perfect match for d.school and CS+Social Good programs" },
          { school: "MIT", fit: 88, reasoning: "Strong technical foundation, growing social impact focus" },
          { school: "UC Berkeley", fit: 95, reasoning: "Excellent public service mission alignment and technical rigor" }
        ],
        differentiationFactors: [
          "Rare combination of technical depth and authentic community leadership",
          "Measurable social impact at young age with scaling evidence",
          "Bridge-builder between technology and traditionally underserved communities"
        ]
      },
      innovationQuotient: {
        score: 87,
        evidence: [
          "Novel application of real-time data to community organizing",
          "Creative solution to trust-building through gradual engagement",
          "Integration of environmental impact measurement with social platform"
        ],
        patterns: ["Systems thinking", "User-centered innovation", "Community-first technology design"],
        nextLevelPotential: "High - shows signs of breakthrough thinking in civic technology"
      },
      riskAssessment: {
        potentialConcerns: [
          { concern: "Over-commitment", severity: "Low", mitigation: "Shows good time management and delegation skills" },
          { concern: "Technical depth vs breadth", severity: "Medium", mitigation: "Recommend focused skill development in next phase" }
        ],
        strengthAreas: ["Leadership authenticity", "Impact measurement", "Community relationships", "Technical execution"]
      },
      developmentRecommendations: [
        { category: "Academic", action: "Take courses in urban planning or public policy", priority: "High", reasoning: "Complement technical skills with policy understanding" },
        { category: "Leadership", action: "Seek mentorship with social enterprise leaders", priority: "High", reasoning: "Scale leadership skills to match project growth" },
        { category: "Technical", action: "Learn data science for impact measurement", priority: "Medium", reasoning: "Enhance ability to demonstrate and optimize impact" },
        { category: "Network", action: "Join civic technology communities", priority: "Medium", reasoning: "Connect with like-minded innovators and potential collaborators" }
      ]
    }
  },
  
  {
    id: 2,
    title: "Youth Mental Health Peer Support Network",
    type: "Social Leadership",
    category: "Mental Health Advocacy",
    completedDate: "2024-08-10",
    verified: true,
    projectPhase: "Expanding Model",
    
    overview: {
      description: "Comprehensive peer support program addressing youth mental health crisis through trained peer counselors and community-based intervention",
      impactStory: {
        genesis: "Personal experience with anxiety and witnessing friends struggle without adequate support",
        evolution: [
          { phase: "Research", milestone: "Studied 200+ hours of mental health literature", impact: "Understood evidence-based peer support models" },
          { phase: "Training", milestone: "Completed crisis intervention certification", impact: "Gained credible skills for peer support" },
          { phase: "Pilot", milestone: "Launched with 15 peer counselors", impact: "Supported 60 students in first semester" },
          { phase: "Validation", milestone: "Documented 85% improvement in reported wellbeing", impact: "Proved program effectiveness" },
          { phase: "Expansion", milestone: "Adopted by 3 additional schools", impact: "Now serves 300+ students across district" }
        ],
        breakthrough: "Discovered that peer support was more effective than adult counseling for many teens"
      },
      stakeholderEcosystem: [
        { role: "Student Participants", count: 300, relationship: "Primary Beneficiaries", influence: "High" },
        { role: "Peer Counselors", count: 45, relationship: "Program Leaders", influence: "High" },
        { role: "School Administrators", count: 12, relationship: "Institutional Partners", influence: "High" },
        { role: "Mental Health Professionals", count: 8, relationship: "Clinical Supervisors", influence: "High" },
        { role: "Parent/Guardian Network", count: 200, relationship: "Support System", influence: "Medium" }
      ],
      metricsEvolution: {
        programGrowth: [
          { month: "Jan", participants: 15, counselors: 5, wellbeingScore: 0 },
          { month: "Feb", participants: 35, counselors: 8, wellbeingScore: 72 },
          { month: "Mar", participants: 60, counselors: 12, wellbeingScore: 78 },
          { month: "Apr", participants: 95, counselors: 18, wellbeingScore: 81 },
          { month: "May", participants: 150, counselors: 25, wellbeingScore: 84 },
          { month: "Jun", participants: 220, counselors: 35, wellbeingScore: 87 },
          { month: "Jul", participants: 280, counselors: 42, wellbeingScore: 89 },
          { month: "Aug", participants: 300, counselors: 45, wellbeingScore: 91 }
        ]
      },
      verification: {
        demoLink: "https://peermentalhealth.org",
        mediaFeatures: ["State Education Department Case Study", "National Peer Support Conference Presentation", "Local Mental Health Awareness Campaign"],
        testimonials: [
          { name: "Dr. Sarah Chen", role: "School Psychologist", quote: "This program reaches students who wouldn't normally seek help through traditional channels" },
          { name: "Alex Rivera", role: "Program Participant", quote: "Having someone my age who understood what I was going through made all the difference" }
        ],
        certificates: ["Crisis Intervention Specialist", "Peer Support Facilitator Certification", "Youth Mental Health First Aid"]
      },
      applicationReadiness: {
        essayPotential: 98,
        interviewStories: 12,
        uniquenessScore: 89,
        leadershipEvidence: "Exceptional",
        impactDocumentation: "Comprehensive with clinical backing"
      }
    },

    skills: {
      developmentJourney: [
        {
          skill: "Crisis Intervention",
          phases: [
            { phase: "Training", duration: "Month 1-2", evidence: "40-hour certification program", proficiency: 45 },
            { phase: "Supervised Practice", duration: "Month 3-4", evidence: "20 supervised peer sessions", proficiency: 70 },
            { phase: "Independent Practice", duration: "Month 5-8", evidence: "Led 100+ peer support sessions", proficiency: 90 }
          ],
          marketValue: "Very High",
          transferability: ["Social Work", "Counseling", "Human Resources", "Conflict Resolution"],
          uniqueApplication: "Developed age-appropriate intervention techniques for teens"
        },
        {
          skill: "Program Development & Scaling",
          phases: [
            { phase: "Planning", duration: "Month 1", evidence: "Created comprehensive program framework", proficiency: 30 },
            { phase: "Implementation", duration: "Month 2-4", evidence: "Launched pilot with measurable outcomes", proficiency: 65 },
            { phase: "Optimization", duration: "Month 5-8", evidence: "Scaled to 3 schools with maintained quality", proficiency: 85 }
          ],
          marketValue: "High",
          transferability: ["Non-profit Management", "Public Health", "Educational Administration"],
          uniqueApplication: "Adapted evidence-based models for high school environment"
        }
      ],
      competencyNetwork: [
        { skill: "Active Listening", level: 95, connections: ["Empathy", "Communication", "Trust Building"] },
        { skill: "Program Management", level: 85, connections: ["Leadership", "Strategic Planning", "Quality Assurance"] },
        { skill: "Data Analysis", level: 78, connections: ["Research Methods", "Outcome Measurement", "Evidence-Based Practice"] },
        { skill: "Public Speaking", level: 88, connections: ["Advocacy", "Training", "Community Engagement"] },
        { skill: "Mental Health Literacy", level: 92, connections: ["Crisis Intervention", "Peer Support", "Trauma-Informed Care"] }
      ],
      learningStyle: {
        primary: "Reflective Practitioner",
        indicators: [
          "Processed difficult sessions through structured reflection",
          "Continuously improved approach based on participant feedback",
          "Integrated research literature with practical experience"
        ],
        recommendations: ["Continue case study analysis", "Seek advanced training opportunities", "Document lessons learned"]
      },
      softSkillsEvidence: {
        leadership: [
          { moment: "Convinced school administration to approve controversial peer support program", skill: "Advocacy & Persistence" },
          { moment: "Trained 40+ peer counselors while maintaining program quality", skill: "Training & Development" },
          { moment: "Navigated ethical dilemmas while maintaining participant trust", skill: "Ethical Reasoning" }
        ],
        communication: [
          { context: "Crisis Intervention", skill: "Active Listening", outcome: "De-escalated 15+ crisis situations" },
          { context: "Program Training", skill: "Teaching", outcome: "95% of trainees met competency standards" },
          { context: "Administrative Meetings", skill: "Professional Communication", outcome: "Secured program expansion funding" }
        ]
      }
    },

    narrative: {
      personalBrandArchitecture: {
        coreIdentity: "Empathetic Systems Builder",
        valueProposition: "Transforms personal struggles into community healing through evidence-based peer support",
        differentiators: ["Clinical knowledge + Peer authenticity", "Individual healing + System change", "Research-minded + Emotionally intelligent"],
        brandConsistency: 96
      },
      storyArcAnalysis: {
        characterDevelopment: [
          { stage: "Personal Crisis", story: "Own struggle with anxiety revealed gaps in school mental health support" },
          { stage: "Learning & Growth", story: "Committed to understanding mental health through research and training" },
          { stage: "Service to Others", story: "Used lived experience to help peers in similar situations" },
          { stage: "System Building", story: "Recognized need to create sustainable support structures" },
          { stage: "Evidence & Impact", story: "Documented program effectiveness to ensure replication" },
          { stage: "Scaling Vision", story: "Now working to implement model across entire school district" }
        ],
        thematicConsistency: 97,
        growthEvidence: "Transformed personal vulnerability into powerful community leadership"
      },
      authenticityIndicators: {
        passionConsistency: 98,
        valueAlignment: [
          { stated: "Mental Health Destigmatization", demonstrated: "Publicly shared own mental health journey" },
          { stated: "Peer Empowerment", demonstrated: "Trained 45 students as peer counselors rather than doing all support personally" },
          { stated: "Evidence-Based Practice", demonstrated: "Required program evaluation and outcome measurement" }
        ],
        authenticityConcerns: []
      },
      collegeEssayGoldmine: {
        powerfulMoments: [
          { moment: "The night I realized my own therapist couldn't understand my experience the way a peer could", 
            essayPotential: "Personal statement centerpiece", emotionalResonance: "Very High" },
          { moment: "First time a participant told me our session saved their life", 
            essayPotential: "Impact/purpose essay", uniqueness: "High" },
          { moment: "Presenting program data to skeptical school board members", 
            essayPotential: "Overcoming obstacles essay", leadership: "Strong" }
        ],
        readyQuotes: [
          "I learned that healing happens not in isolation, but in the space between people who understand",
          "The most powerful interventions come from those who have walked the same path",
          "Data without heart is just numbers; empathy without evidence is just good intentions"
        ]
      },
      interviewStoryBank: [
        {
          situation: "School administration resistant to peer mental health program due to liability concerns",
          task: "Demonstrate program safety and effectiveness to gain approval",
          action: "Developed comprehensive training program, safety protocols, and outcome measurement system",
          result: "Program approved and now serves as model for district-wide implementation",
          interviewFit: ["Leadership", "Problem Solving", "Advocacy", "Innovation"]
        },
        {
          situation: "Participant in acute mental health crisis during peer session",
          task: "Provide immediate support while ensuring professional intervention",
          action: "Applied crisis intervention training, connected to professional resources, followed up for continuity",
          result: "Participant received appropriate care and continued in program with improved coping skills",
          interviewFit: ["Crisis Management", "Ethical Decision Making", "Professional Judgment"]
        }
      ]
    },

    insights: {
      predictiveAnalytics: {
        careerTrajectory: [
          { path: "Clinical Psychology/Therapy", probability: 88, reasoning: "Strong clinical interest with peer support foundation" },
          { path: "Public Health Policy", probability: 82, reasoning: "Systems-level thinking and program development skills" },
          { path: "Social Work Administration", probability: 75, reasoning: "Program management experience with vulnerable populations" }
        ],
        skillDevelopmentPredictions: [
          { skill: "Research & Evaluation", growth: 70, timeline: "Next 12 months", trigger: "Need to document program outcomes for replication" },
          { skill: "Grant Writing", growth: 85, timeline: "Next 6 months", trigger: "Program expansion requires funding" },
          { skill: "Policy Advocacy", growth: 60, timeline: "Next 18 months", trigger: "Opportunity to influence state mental health policy" }
        ]
      },
      admissionsAdvantage: {
        competitivePositioning: "Top 3% for authentic mental health leadership with clinical foundation",
        schoolFitAnalysis: [
          { school: "Yale", fit: 94, reasoning: "Exceptional psychology program and social impact focus" },
          { school: "Harvard", fit: 89, reasoning: "Strong public health opportunities and clinical research" },
          { school: "Northwestern", fit: 91, reasoning: "Excellent psychology and social policy programs" }
        ],
        differentiationFactors: [
          "Rare combination of lived experience, clinical training, and program development",
          "Documented measurable impact on peer mental health outcomes",
          "Bridge between clinical expertise and peer authenticity"
        ]
      },
      innovationQuotient: {
        score: 91,
        evidence: [
          "Adapted adult peer support models for teen development stages",
          "Created hybrid clinical/peer support model with safety protocols",
          "Developed outcome measurement system appropriate for peer programs"
        ],
        patterns: ["Evidence-based innovation", "Trauma-informed system design", "Peer empowerment methodology"],
        nextLevelPotential: "Very High - positioned to influence broader mental health policy and practice"
      },
      riskAssessment: {
        potentialConcerns: [
          { concern: "Emotional burnout", severity: "Medium", mitigation: "Strong self-care practices and clinical supervision evident" },
          { concern: "Over-identification with participant struggles", severity: "Low", mitigation: "Demonstrates professional boundaries and referral skills" }
        ],
        strengthAreas: ["Clinical judgment", "Program sustainability", "Ethical reasoning", "Impact measurement"]
      },
      developmentRecommendations: [
        { category: "Academic", action: "Take advanced psychology and research methods courses", priority: "High", reasoning: "Build foundation for graduate study in clinical psychology" },
        { category: "Professional", action: "Seek internship with mental health policy organization", priority: "High", reasoning: "Connect direct service experience with policy impact" },
        { category: "Leadership", action: "Present at national peer support conferences", priority: "Medium", reasoning: "Share innovations with broader field" },
        { category: "Personal", action: "Maintain own therapy and self-care practices", priority: "High", reasoning: "Model healthy boundaries and continued growth" }
      ]
    }
  }
];

// Component for detailed project analysis - This represents the comprehensive AI-generated insights view
const ProjectCard = ({ project }: { project: typeof portfolioData[0] }) => {
  return (
    <Card className="gradient-project-card border-white/20 shadow-project">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20">
          <TabsTrigger value="overview" className="text-foreground data-[state=active]:bg-gradient-project-active data-[state=active]:text-white">
            Impact Story Canvas
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-foreground data-[state=active]:bg-gradient-project-active data-[state=active]:text-white">
            Deep Skills Analytics
          </TabsTrigger>
          <TabsTrigger value="narrative" className="text-foreground data-[state=active]:bg-gradient-project-active data-[state=active]:text-white">
            Story Intelligence
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-foreground data-[state=active]:bg-gradient-project-active data-[state=active]:text-white">
            AI Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Project Evolution Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Evolution Timeline */}
            <Card className="gradient-project-card border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Project Evolution Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.overview.impactStory.evolution.map((phase, idx) => (
                  <div key={idx} className="border-l-2 border-primary/30 pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-primary/30 text-foreground">
                        {phase.phase}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{phase.milestone}</h4>
                    <p className="text-sm text-muted-foreground">{phase.impact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Metrics Evolution Chart */}
            <Card className="gradient-project-card border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={project.overview.metricsEvolution[Object.keys(project.overview.metricsEvolution)[0] as keyof typeof project.overview.metricsEvolution]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey={Object.keys(project.overview.metricsEvolution)[0] === 'userGrowth' ? 'users' : 'participants'} 
                        stroke="hsl(280 70% 60%)" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(280 70% 60%)', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stakeholder Ecosystem */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Network className="h-5 w-5" />
                Stakeholder Ecosystem Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.overview.stakeholderEcosystem.map((stakeholder, idx) => (
                  <div key={idx} className="gradient-project-accent p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{stakeholder.role}</h4>
                      <Badge 
                        variant="outline" 
                        className={`border-white/30 ${
                          stakeholder.influence === 'High' ? 'text-success' : 
                          stakeholder.influence === 'Medium' ? 'text-warning' : 'text-muted-foreground'
                        }`}
                      >
                        {stakeholder.influence}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stakeholder.relationship}</p>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{stakeholder.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification & Evidence */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verification & Evidence Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Media Features</h4>
                  <div className="space-y-2">
                    {project.overview.verification.mediaFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Certificates & Awards</h4>
                  <div className="space-y-2">
                    {project.overview.verification.certificates.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Trophy className="h-3 w-3 text-warning" />
                        <span className="text-sm text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-3">Testimonials</h4>
                <div className="space-y-3">
                  {project.overview.verification.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="gradient-project-accent p-4 rounded-lg border border-white/10">
                      <p className="text-foreground italic mb-2">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          <div className="font-semibold text-foreground">{testimonial.name}</div>
                          <div className="text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6 mt-6">
          {/* Skills Development Journey */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skill Development Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.skills.developmentJourney?.map((journey, idx) => (
                  <div key={idx} className="gradient-project-accent p-6 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-foreground">{journey.skill}</h4>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {journey.marketValue} Market Value
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {journey.phases.map((phase, phaseIdx) => (
                        <div key={phaseIdx} className="text-center">
                          <div className="gradient-project-active p-3 rounded-lg mb-2">
                            <div className="font-semibold text-white">{phase.phase}</div>
                            <div className="text-sm text-white/80">{phase.duration}</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{phase.evidence}</div>
                          <Progress value={phase.proficiency} className="h-2" />
                          <div className="text-xs text-foreground mt-1">{phase.proficiency}%</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <h5 className="font-semibold text-foreground mb-2">Unique Application:</h5>
                      <p className="text-sm text-muted-foreground">{journey.uniqueApplication}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competency Network */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Skill Interconnection Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={project.skills.competencyNetwork}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#888' }} />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fontSize: 10, fill: '#888' }} 
                    />
                    <Radar 
                      name="Proficiency" 
                      dataKey="level" 
                      stroke="hsl(280 70% 60%)" 
                      fill="hsl(280 70% 60%)" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.skills.competencyNetwork.map((skill, idx) => (
                  <div key={idx} className="gradient-project-accent p-3 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{skill.skill}</h4>
                      <Badge variant="outline" className="border-primary/30 text-foreground">
                        {skill.level}%
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skill.connections.map((connection, connIdx) => (
                        <Badge key={connIdx} variant="outline" className="text-xs border-white/20 text-muted-foreground">
                          {connection}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Style Analysis */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Learning Style & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gradient-project-accent p-4 rounded-lg border border-white/10 mb-4">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Primary Learning Style: {project.skills.learningStyle.primary}
                </h4>
                <div className="space-y-2">
                  {project.skills.learningStyle.indicators.map((indicator, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-foreground mb-3">Development Recommendations:</h5>
                <div className="space-y-2">
                  {project.skills.learningStyle.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ArrowUp className="h-3 w-3 text-primary" />
                      <span className="text-sm text-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="narrative" className="space-y-6 mt-6">
          {/* Personal Brand Architecture */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Personal Brand Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gradient-project-accent p-6 rounded-lg border border-white/10 mb-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {project.narrative.personalBrandArchitecture.coreIdentity}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {project.narrative.personalBrandArchitecture.valueProposition}
                  </p>
                  <div className="mt-4">
                    <Badge className="bg-success/20 text-success border-success/30">
                      {project.narrative.personalBrandArchitecture.brandConsistency}% Brand Consistency
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Differentiators:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {project.narrative.personalBrandArchitecture.differentiators.map((diff, idx) => (
                      <div key={idx} className="gradient-project-active p-3 rounded-lg text-center">
                        <span className="text-white font-medium">{diff}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Arc Analysis */}
          {project.narrative.storyArcAnalysis && (
            <Card className="gradient-project-card border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Character Development Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.narrative.storyArcAnalysis.characterDevelopment.map((stage, idx) => (
                    <div key={idx} className="gradient-project-accent p-4 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                          {idx + 1}
                        </div>
                        <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                      </div>
                      <p className="text-muted-foreground ml-11">{stage.story}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-foreground">Thematic Consistency</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={project.narrative.storyArcAnalysis.thematicConsistency} className="flex-1 h-2" />
                        <span className="text-foreground font-medium">{project.narrative.storyArcAnalysis.thematicConsistency}%</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Growth Evidence</h5>
                      <p className="text-sm text-muted-foreground mt-1">{project.narrative.storyArcAnalysis.growthEvidence}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* College Essay Goldmine */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                College Essay Goldmine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.narrative.collegeEssayGoldmine.powerfulMoments.map((moment, idx) => (
                  <div key={idx} className="gradient-project-accent p-4 rounded-lg border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {moment.essayPotential}
                      </Badge>
                      {moment.emotionalResonance && (
                        <Badge variant="outline" className="border-white/30 text-foreground">
                          {moment.emotionalResonance} Impact
                        </Badge>
                      )}
                    </div>
                    <p className="text-foreground italic mb-2">"{moment.moment}"</p>
                    {moment.lessonLearned && (
                      <div className="mt-2 p-2 bg-white/5 rounded">
                        <span className="text-xs font-semibold text-muted-foreground">Lesson Learned: </span>
                        <span className="text-sm text-foreground">{moment.lessonLearned}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {project.narrative.collegeEssayGoldmine.readyQuotes && (
                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-3">Ready-to-Use Quotes:</h4>
                  <div className="space-y-2">
                    {project.narrative.collegeEssayGoldmine.readyQuotes.map((quote, idx) => (
                      <div key={idx} className="gradient-project-active p-3 rounded-lg">
                        <p className="text-white italic">"{quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          {/* Predictive Career Analytics */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Career Trajectory Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.insights.predictiveAnalytics?.careerTrajectory.map((path, idx) => (
                  <div key={idx} className="gradient-project-accent p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{path.path}</h4>
                      <Badge 
                        className={`${
                          path.probability >= 80 ? 'bg-success/20 text-success border-success/30' :
                          path.probability >= 70 ? 'bg-warning/20 text-warning border-warning/30' :
                          'bg-muted/20 text-muted-foreground border-muted/30'
                        }`}
                      >
                        {path.probability}% Match
                      </Badge>
                    </div>
                    <Progress value={path.probability} className="mb-2 h-2" />
                    <p className="text-sm text-muted-foreground">{path.reasoning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admissions Competitive Advantage */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                College Admissions Advantage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gradient-project-accent p-4 rounded-lg border border-white/10 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Competitive Positioning</h3>
                <p className="text-muted-foreground">{project.insights.admissionsAdvantage.competitivePositioning}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">School Fit Analysis:</h4>
                {project.insights.admissionsAdvantage.schoolFitAnalysis.map((school, idx) => (
                  <div key={idx} className="gradient-project-accent p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-foreground">{school.school}</h5>
                      <Badge 
                        className={`${
                          school.fit >= 90 ? 'bg-success/20 text-success border-success/30' :
                          school.fit >= 85 ? 'bg-warning/20 text-warning border-warning/30' :
                          'bg-muted/20 text-muted-foreground border-muted/30'
                        }`}
                      >
                        {school.fit}% Fit
                      </Badge>
                    </div>
                    <Progress value={school.fit} className="mb-2 h-2" />
                    <p className="text-sm text-muted-foreground">{school.reasoning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Innovation Quotient */}
          <Card className="gradient-project-card border-white/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Innovation Quotient Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {project.insights.innovationQuotient.score}/100
                </div>
                <p className="text-muted-foreground">Innovation Score</p>
                <Progress value={project.insights.innovationQuotient.score} className="mt-3 h-3" />
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Innovation Evidence:</h4>
                <div className="space-y-2">
                  {project.insights.innovationQuotient.evidence.map((evidence, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{evidence}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const PortfolioMetricsDashboard = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'project'>('dashboard');

  // Calculate portfolio summary metrics - This represents aggregated data from all student projects
  const portfolioSummary = {
    totalProjects: portfolioData.length,
    averageImpactScore: Math.round(portfolioData.reduce((acc, p) => acc + p.overview.applicationReadiness.essayPotential, 0) / portfolioData.length),
    totalVerified: portfolioData.filter(p => p.verified).length,
    uniquenessScore: Math.round(portfolioData.reduce((acc, p) => acc + p.overview.applicationReadiness.uniquenessScore, 0) / portfolioData.length),
    totalSkills: portfolioData.reduce((acc, p) => acc + p.skills.competencyNetwork.length, 0),
    avgReadinessScore: Math.round(portfolioData.reduce((acc, p) => acc + p.overview.applicationReadiness.essayPotential, 0) / portfolioData.length)
  };

  const handleProjectSelect = (projectId: number) => {
    setSelectedProject(projectId);
    setViewMode('project');
  };

  const handleBackToDashboard = () => {
    setSelectedProject(null);
    setViewMode('dashboard');
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'Technical Leadership': return <Code className="h-5 w-5" />;
      case 'Social Leadership': return <Heart className="h-5 w-5" />;
      case 'Academic Research': return <BookOpen className="h-5 w-5" />;
      case 'Creative Innovation': return <Palette className="h-5 w-5" />;
      default: return <Rocket className="h-5 w-5" />;
    }
  };

  const getImpactScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning'; 
    if (score >= 70) return 'text-secondary';
    return 'text-destructive';
  };

  if (viewMode === 'project' && selectedProject) {
    const project = portfolioData.find(p => p.id === selectedProject);
    if (!project) return null;

    return (
      <div className="min-h-screen gradient-project-main text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <Button 
            onClick={handleBackToDashboard}
            variant="outline" 
            className="mb-6 border-white/30 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio Dashboard
          </Button>

          {/* Project Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getProjectTypeIcon(project.type)}
              <h1 className="text-4xl font-bold text-white">
                {project.title}
              </h1>
              {project.verified && (
                <Badge className="bg-success/20 text-success border-success/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              Deep AI-powered analysis and insights from your project narrative
            </p>
          </div>

          <ProjectCard key={project.id} project={project} />
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen gradient-project-main text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Portfolio Overview */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Portfolio Intelligence Dashboard
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Deep insights and analytics from your project narratives, optimized for college applications and personal growth
          </p>
          
          {/* Portfolio Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            <Card className="gradient-project-card border-white/20 shadow-project">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{portfolioSummary.totalProjects}</div>
                <div className="text-muted-foreground text-sm">Projects</div>
              </CardContent>
            </Card>
            <Card className="gradient-project-card border-white/20 shadow-project">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{portfolioSummary.averageImpactScore}%</div>
                <div className="text-muted-foreground text-sm">Avg Impact</div>
              </CardContent>
            </Card>
            <Card className="gradient-project-card border-white/20 shadow-project">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{portfolioSummary.totalVerified}</div>
                <div className="text-muted-foreground text-sm">Verified</div>
              </CardContent>
            </Card>
            <Card className="gradient-project-card border-white/20 shadow-project">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{portfolioSummary.uniquenessScore}%</div>
                <div className="text-muted-foreground text-sm">Uniqueness</div>
              </CardContent>
            </Card>
            <Card className="gradient-project-card border-white/20 shadow-project">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{portfolioSummary.totalSkills}</div>
                <div className="text-muted-foreground text-sm">Total Skills</div>
              </CardContent>
            </Card>
            <Card className="gradient-project-card border-white/20 shadow-project">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{portfolioSummary.avgReadinessScore}%</div>
                <div className="text-muted-foreground text-sm">App Ready</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {portfolioData.map((project) => (
            <Card 
              key={project.id} 
              className="gradient-project-card border-white/20 shadow-project hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => handleProjectSelect(project.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getProjectTypeIcon(project.type)}
                    <Badge variant="outline" className="border-white/30 text-foreground">
                      {project.type}
                    </Badge>
                  </div>
                  {project.verified && (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-foreground line-clamp-2">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-3">
                  {project.overview.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getImpactScoreColor(project.overview.applicationReadiness.essayPotential)}`}>
                      {project.overview.applicationReadiness.essayPotential}%
                    </div>
                    <div className="text-xs text-muted-foreground">Impact Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {project.skills.competencyNetwork.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Skills</div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Portfolio Strength</span>
                    <span className="text-foreground font-medium">{project.overview.applicationReadiness.essayPotential}%</span>
                  </div>
                  <Progress value={project.overview.applicationReadiness.essayPotential} className="h-2" />
                </div>

                {/* Timeline & Status */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(project.completedDate).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline" className="border-white/30 text-foreground text-xs">
                    {project.projectPhase}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      {project.overview.applicationReadiness.interviewStories}
                    </div>
                    <div className="text-xs text-muted-foreground">Stories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      {project.overview.stakeholderEcosystem.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      {project.overview.applicationReadiness.uniquenessScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Unique</div>
                  </div>
                </div>

                {/* View Details Button */}
                <Button 
                  className="w-full gradient-project-accent text-white border-0 hover:opacity-90"
                  size="sm"
                >
                  View Detailed Analysis
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gradient-project-header text-white border-0">
            <Download className="h-5 w-5 mr-2" />
            Export Portfolio Summary
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <FileText className="h-5 w-5 mr-2" />
            Generate Essay Drafts
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <MessageCircle className="h-5 w-5 mr-2" />
            Create Interview Prep
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMetricsDashboard;
