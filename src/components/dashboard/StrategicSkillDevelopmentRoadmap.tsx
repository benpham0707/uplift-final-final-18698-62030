import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Award, 
  ChevronRight,
  Sparkles,
  Crown,
  BookOpen,
  Code,
  Users,
  Brain
} from 'lucide-react';

const StrategicSkillDevelopmentRoadmap: React.FC = () => {
  const [selectedSkillArea, setSelectedSkillArea] = useState('technical-advancement');
  
  // Hard coded mock data - Strategic skill development planning and gap analysis
  const skillDevelopmentData = {
    'technical-advancement': {
      name: 'Advanced Technical Skills',
      currentLevel: 75,
      targetLevel: 90,
      priority: 'High',
      timeline: '6-12 months',
      description: 'Expand technical depth to support larger scale and more complex projects',
      skillGaps: [
        { skill: 'AI/ML Integration', currentLevel: 20, targetLevel: 70, priority: 'Critical', timeline: '4-6 months' },
        { skill: 'Cloud Architecture', currentLevel: 40, targetLevel: 80, priority: 'High', timeline: '3-4 months' },
        { skill: 'DevOps & CI/CD', currentLevel: 30, targetLevel: 75, priority: 'Medium', timeline: '2-3 months' },
        { skill: 'Security Best Practices', currentLevel: 50, targetLevel: 85, priority: 'High', timeline: '2-4 months' }
      ],
      learningPathways: [
        { pathway: 'Online Courses & Certifications', time: '50-100 hours', cost: '$500-1000', effectiveness: 'High' },
        { pathway: 'Open Source Contributions', time: '100-200 hours', cost: '$0', effectiveness: 'Very High' },
        { pathway: 'Industry Mentorship', time: '20-40 hours', cost: '$0-500', effectiveness: 'Very High' },
        { pathway: 'Personal Projects', time: '150-300 hours', cost: '$100-500', effectiveness: 'High' }
      ],
      experienceBuilding: [
        'Contribute to civic technology open source projects to gain experience with larger codebases',
        'Volunteer technical skills for other community organizations to practice scaling challenges',
        'Build AI-powered features for community garden platform to learn machine learning implementation'
      ]
    },
    'leadership-expansion': {
      name: 'Strategic Leadership Skills',
      currentLevel: 80,
      targetLevel: 95,
      priority: 'High',
      timeline: '8-15 months',
      description: 'Develop sophisticated leadership capabilities for cross-sector collaboration',
      skillGaps: [
        { skill: 'Cross-Sector Communication', currentLevel: 70, targetLevel: 90, priority: 'High', timeline: '3-6 months' },
        { skill: 'Strategic Planning', currentLevel: 60, targetLevel: 85, priority: 'High', timeline: '4-8 months' },
        { skill: 'Team Management', currentLevel: 50, targetLevel: 80, priority: 'Medium', timeline: '6-12 months' },
        { skill: 'Fundraising & Grant Writing', currentLevel: 30, targetLevel: 75, priority: 'Critical', timeline: '3-6 months' }
      ],
      learningPathways: [
        { pathway: 'Leadership Development Programs', time: '40-80 hours', cost: '$1000-3000', effectiveness: 'Very High' },
        { pathway: 'Board/Committee Service', time: '50-100 hours', cost: '$0', effectiveness: 'High' },
        { pathway: 'Nonprofit Management Courses', time: '30-60 hours', cost: '$300-800', effectiveness: 'Medium' },
        { pathway: 'Executive Coaching', time: '20-40 hours', cost: '$1500-3000', effectiveness: 'Very High' }
      ],
      experienceBuilding: [
        'Seek leadership roles in student organizations with social impact focus',
        'Apply for fellowship programs that develop community leadership skills',
        'Join boards of local nonprofits to gain governance and strategic planning experience'
      ]
    },
    'research-methodology': {
      name: 'Research & Analysis Skills',
      currentLevel: 65,
      targetLevel: 85,
      priority: 'Medium',
      timeline: '6-10 months',
      description: 'Develop rigorous research skills to support evidence-based community work',
      skillGaps: [
        { skill: 'Quantitative Research Methods', currentLevel: 40, targetLevel: 80, priority: 'High', timeline: '4-6 months' },
        { skill: 'Qualitative Research Design', currentLevel: 60, targetLevel: 85, priority: 'Medium', timeline: '3-4 months' },
        { skill: 'Data Analysis & Visualization', currentLevel: 50, targetLevel: 75, priority: 'High', timeline: '2-4 months' },
        { skill: 'Academic Writing', currentLevel: 70, targetLevel: 90, priority: 'Low', timeline: '2-3 months' }
      ],
      learningPathways: [
        { pathway: 'Graduate Research Methods Courses', time: '120-240 hours', cost: '$2000-5000', effectiveness: 'Very High' },
        { pathway: 'Research Collaborations', time: '100-200 hours', cost: '$0', effectiveness: 'High' },
        { pathway: 'Data Science Bootcamps', time: '200-400 hours', cost: '$3000-8000', effectiveness: 'High' },
        { pathway: 'Academic Conferences & Workshops', time: '40-80 hours', cost: '$500-2000', effectiveness: 'Medium' }
      ],
      experienceBuilding: [
        'Partner with university researchers to study community garden platform impact',
        'Conduct formal evaluation of community technology adoption patterns',
        'Present research findings at academic conferences or community forums'
      ]
    }
  };

  const currentSkillArea = skillDevelopmentData[selectedSkillArea];

  return (
    <Card className="glass-card shadow-large">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-soft">
            <Brain className="h-5 w-5" />
          </div>
          Strategic Skill Development Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="skill-gap-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skill-gap-analysis">Gap Analysis</TabsTrigger>
            <TabsTrigger value="learning-optimizer">Learning Path</TabsTrigger>
            <TabsTrigger value="experience-builder">Experience</TabsTrigger>
            <TabsTrigger value="portfolio-tracker">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="skill-gap-analysis" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200">
              <Target className="h-6 w-6 text-cyan-600" />
              <h3 className="font-semibold text-cyan-600">Skill Gap Analysis</h3>
              <Sparkles className="h-5 w-5 text-cyan-600 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(skillDevelopmentData).map(([key, skillArea]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedSkillArea === key ? 'ring-2 ring-cyan-500 bg-cyan-50' : ''
                  }`}
                  onClick={() => setSelectedSkillArea(key)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{skillArea.name}</h4>
                      <Badge variant="outline" className={`${
                        skillArea.priority === 'High' ? 'border-red-500 text-red-600' :
                        skillArea.priority === 'Medium' ? 'border-yellow-500 text-yellow-600' :
                        'border-green-500 text-green-600'
                      }`}>
                        {skillArea.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Current: {skillArea.currentLevel}%</span>
                        <span>Target: {skillArea.targetLevel}%</span>
                      </div>
                      <Progress value={skillArea.currentLevel} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Timeline: {skillArea.timeline}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50">
              <h4 className="font-semibold text-cyan-600 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {currentSkillArea.name} - Detailed Gap Analysis
              </h4>
              <p className="text-sm text-muted-foreground mb-4">{currentSkillArea.description}</p>
              <div className="space-y-4">
                {currentSkillArea.skillGaps.map((gap, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/80 border border-cyan-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-cyan-700">{gap.skill}</h5>
                      <Badge variant="outline" className={`text-xs ${
                        gap.priority === 'Critical' ? 'border-red-500 text-red-600' :
                        gap.priority === 'High' ? 'border-orange-500 text-orange-600' :
                        'border-yellow-500 text-yellow-600'
                      }`}>
                        {gap.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Current: {gap.currentLevel}%</span>
                      <span>Target: {gap.targetLevel}%</span>
                      <span>Timeline: {gap.timeline}</span>
                    </div>
                    <Progress value={gap.currentLevel} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="learning-optimizer" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Learning Path Optimizer</h3>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>

            <div className="space-y-4">
              {currentSkillArea.learningPathways.map((pathway, index) => (
                <Card key={index} className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-purple-600">{pathway.pathway}</h4>
                    <Badge variant="outline" className={`${
                      pathway.effectiveness === 'Very High' ? 'border-green-500 text-green-600' :
                      pathway.effectiveness === 'High' ? 'border-blue-500 text-blue-600' :
                      'border-yellow-500 text-yellow-600'
                    }`}>
                      {pathway.effectiveness}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                    <div>
                      <span className="font-medium">Time:</span> {pathway.time}
                    </div>
                    <div>
                      <span className="font-medium">Cost:</span> {pathway.cost}
                    </div>
                    <div>
                      <span className="font-medium">ROI:</span> {pathway.effectiveness}
                    </div>
                  </div>
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                    Create Learning Plan
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Optimized Learning Strategy
              </h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-white/80 border border-yellow-300">
                  <strong className="text-yellow-700">Phase 1 (Months 1-3):</strong> Focus on high-impact, low-cost learning opportunities like online courses and open source contributions
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-yellow-300">
                  <strong className="text-yellow-700">Phase 2 (Months 4-6):</strong> Pursue mentorship and collaboration opportunities to gain practical experience
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-yellow-300">
                  <strong className="text-yellow-700">Phase 3 (Months 7+):</strong> Apply skills through personal projects and leadership opportunities to demonstrate competency
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="experience-builder" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <Code className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-600">Experience Building Strategist</h3>
              <Users className="h-5 w-5 text-green-600" />
            </div>

            <div className="space-y-4">
              {currentSkillArea.experienceBuilding.map((opportunity, index) => (
                <Card key={index} className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-3">{opportunity}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-100 text-xs">
                          Explore Opportunity
                        </Button>
                        <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-100 text-xs">
                          Add to Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Experience Acquisition Timeline
              </h4>
              <div className="space-y-4">
                {[
                  { period: 'Next 3 Months', focus: 'Immediate Skills Application', activities: ['Join open source project', 'Volunteer technical skills locally'] },
                  { period: '3-6 Months', focus: 'Leadership Development', activities: ['Apply for summer fellowships', 'Seek board/committee positions'] },
                  { period: '6-12 Months', focus: 'Strategic Experience', activities: ['Research collaboration projects', 'Community technology consulting'] }
                ].map((timeline, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/80 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-blue-700">{timeline.period}</h5>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                        {timeline.focus}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {timeline.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-blue-500" />
                          <span className="text-xs text-muted-foreground">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio-tracker" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
              <Award className="h-6 w-6 text-indigo-600" />
              <h3 className="font-semibold text-indigo-600">Portfolio Enhancement Tracker</h3>
              <Target className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h4 className="font-semibold text-indigo-600 mb-4">Strategic Portfolio Additions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { addition: 'Technical Certifications', status: 'In Progress', impact: 'Medium', timeline: '2-3 months' },
                    { addition: 'Leadership Portfolio', status: 'Planned', impact: 'High', timeline: '6-12 months' },
                    { addition: 'Research Publications', status: 'Future', impact: 'Very High', timeline: '12+ months' },
                    { addition: 'Community Impact Metrics', status: 'Active', impact: 'High', timeline: 'Ongoing' }
                  ].map((addition, index) => (
                    <div key={index} className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-indigo-700 text-sm">{addition.addition}</h5>
                        <Badge variant="outline" className={`text-xs ${
                          addition.status === 'Active' || addition.status === 'In Progress' ? 'border-green-500 text-green-600' :
                          addition.status === 'Planned' ? 'border-yellow-500 text-yellow-600' :
                          'border-gray-500 text-gray-600'
                        }`}>
                          {addition.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Impact: {addition.impact}</div>
                        <div>Timeline: {addition.timeline}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200">
                <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Competitive Positioning Enhancement
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/80 border border-green-300">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Technical + Social Impact Differentiation</h6>
                    <p className="text-xs text-muted-foreground">Continue building unique combination of deep technical skills with authentic community impact</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/80 border border-green-300">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Cross-Sector Leadership Evidence</h6>
                    <p className="text-xs text-muted-foreground">Document leadership experiences spanning technology, community organizing, and academic contexts</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/80 border border-green-300">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Innovation & Implementation Track Record</h6>
                    <p className="text-xs text-muted-foreground">Build portfolio showing progression from idea to implementation to sustainable community ownership</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StrategicSkillDevelopmentRoadmap;