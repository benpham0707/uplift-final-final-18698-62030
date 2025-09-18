import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Zap, 
  ChevronRight,
  Sparkles,
  Crown,
  Map,
  Lightbulb,
  Network,
  Target
} from 'lucide-react';

const ProjectEvolutionWorkshop: React.FC = () => {
  const [selectedEvolution, setSelectedEvolution] = useState('geographic-scaling');
  
  // Hard coded mock data - Project expansion and evolution strategies
  const evolutionStrategies = {
    'geographic-scaling': {
      name: 'Geographic Scaling Strategy',
      complexity: 'Medium',
      timeline: '6-12 months',
      resources: '$15K-25K',
      impact: 'High',
      description: 'Expand community garden platform to additional neighborhoods and cities',
      scalingSteps: [
        { step: 'Community Assessment', status: 'Next', effort: 'Medium', timeline: '2-3 weeks' },
        { step: 'Local Partnership Building', status: 'Planned', effort: 'High', timeline: '4-6 weeks' },
        { step: 'Platform Customization', status: 'Planned', effort: 'Medium', timeline: '3-4 weeks' },
        { step: 'Pilot Launch', status: 'Future', effort: 'High', timeline: '2-3 weeks' },
        { step: 'Community Training', status: 'Future', effort: 'Medium', timeline: '4-6 weeks' }
      ],
      resourceRequirements: [
        { resource: 'Development Time', amount: '150-200 hours', priority: 'Critical' },
        { resource: 'Community Outreach', amount: '100 hours', priority: 'Critical' },
        { resource: 'Server Infrastructure', amount: '$200-400/month', priority: 'High' },
        { resource: 'Translation Services', amount: '$2000-5000', priority: 'Medium' }
      ],
      partnershipOpportunities: [
        { partner: 'Local Environmental Groups', value: 'Community credibility and existing relationships' },
        { partner: 'City Planning Departments', value: 'Official support and resource access' },
        { partner: 'University Extension Programs', value: 'Research partnership and student volunteers' }
      ]
    },
    'feature-expansion': {
      name: 'Feature Evolution Strategy',
      complexity: 'High',
      timeline: '8-15 months',
      resources: '$20K-40K',
      impact: 'Very High',
      description: 'Add educational components, mentorship matching, and micro-lending features',
      scalingSteps: [
        { step: 'User Research & Needs Assessment', status: 'Next', effort: 'Medium', timeline: '3-4 weeks' },
        { step: 'Educational Content Development', status: 'Planned', effort: 'High', timeline: '8-10 weeks' },
        { step: 'Mentorship Matching Algorithm', status: 'Planned', effort: 'High', timeline: '6-8 weeks' },
        { step: 'Micro-lending Integration', status: 'Future', effort: 'Very High', timeline: '10-12 weeks' },
        { step: 'Beta Testing & Iteration', status: 'Future', effort: 'Medium', timeline: '6-8 weeks' }
      ],
      resourceRequirements: [
        { resource: 'Full-Stack Development', amount: '300-400 hours', priority: 'Critical' },
        { resource: 'Content Creation', amount: '$5000-8000', priority: 'High' },
        { resource: 'Financial Services Integration', amount: '$3000-6000', priority: 'High' },
        { resource: 'Legal/Compliance Review', amount: '$2000-4000', priority: 'Critical' }
      ],
      partnershipOpportunities: [
        { partner: 'Educational Institutions', value: 'Curriculum development and credibility' },
        { partner: 'Community Development Financial Institutions', value: 'Micro-lending infrastructure and expertise' },
        { partner: 'Master Gardener Programs', value: 'Expert mentors and educational content' }
      ]
    },
    'research-integration': {
      name: 'Research Integration Strategy',
      complexity: 'Medium',
      timeline: '4-8 months',
      resources: '$10K-20K',
      impact: 'Medium-High',
      description: 'Partner with universities to study community technology adoption and impact',
      scalingSteps: [
        { step: 'Faculty Partnership Development', status: 'Next', effort: 'Medium', timeline: '2-3 weeks' },
        { step: 'Research Protocol Design', status: 'Planned', effort: 'Medium', timeline: '3-4 weeks' },
        { step: 'IRB Approval Process', status: 'Planned', effort: 'Low', timeline: '4-6 weeks' },
        { step: 'Data Collection Implementation', status: 'Future', effort: 'Medium', timeline: '8-12 weeks' },
        { step: 'Analysis & Publication', status: 'Future', effort: 'High', timeline: '12-16 weeks' }
      ],
      resourceRequirements: [
        { resource: 'Research Coordination', amount: '100-150 hours', priority: 'High' },
        { resource: 'Data Analytics Tools', amount: '$1000-2000', priority: 'Medium' },
        { resource: 'Survey & Interview Costs', amount: '$500-1500', priority: 'Low' },
        { resource: 'Publication & Conference Fees', amount: '$1000-3000', priority: 'Low' }
      ],
      partnershipOpportunities: [
        { partner: 'HCI Research Labs', value: 'Academic credibility and research methodology expertise' },
        { partner: 'Urban Planning Departments', value: 'Community development research framework' },
        { partner: 'Social Computing Research Groups', value: 'Technology adoption and community impact studies' }
      ]
    }
  };

  const currentEvolution = evolutionStrategies[selectedEvolution];

  return (
    <Card className="glass-card shadow-large">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-soft">
            <Rocket className="h-5 w-5" />
          </div>
          Project Evolution Workshop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="scaling-strategy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scaling-strategy">Scaling Strategy</TabsTrigger>
            <TabsTrigger value="impact-amplifier">Impact Amplifier</TabsTrigger>
            <TabsTrigger value="collaboration-mapper">Collaboration</TabsTrigger>
            <TabsTrigger value="innovation-pipeline">Innovation</TabsTrigger>
          </TabsList>

          <TabsContent value="scaling-strategy" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
              <Map className="h-6 w-6 text-orange-600" />
              <h3 className="font-semibold text-orange-600">Scaling Strategy Builder</h3>
              <Sparkles className="h-5 w-5 text-orange-600 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(evolutionStrategies).map(([key, strategy]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedEvolution === key ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                  }`}
                  onClick={() => setSelectedEvolution(key)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{strategy.name}</h4>
                      <Badge variant="outline" className="border-orange-500 text-orange-600">
                        {strategy.impact}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Complexity: {strategy.complexity}</div>
                      <div>Timeline: {strategy.timeline}</div>
                      <div>Resources: {strategy.resources}</div>
                    </div>
                    <p className="text-xs text-muted-foreground">{strategy.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
              <h4 className="font-semibold text-orange-600 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                {currentEvolution.name} - Implementation Plan
              </h4>
              <div className="space-y-4">
                {currentEvolution.scalingSteps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/80 border border-orange-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        step.status === 'Next' ? 'bg-green-500' : 
                        step.status === 'Planned' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <h5 className="font-medium text-sm">{step.step}</h5>
                        <p className="text-xs text-muted-foreground">Effort: {step.effort} • Timeline: {step.timeline}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${
                      step.status === 'Next' ? 'border-green-500 text-green-600' :
                      step.status === 'Planned' ? 'border-yellow-500 text-yellow-600' :
                      'border-gray-300 text-gray-600'
                    }`}>
                      {step.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="impact-amplifier" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <h3 className="font-semibold text-emerald-600">Impact Amplification Tools</h3>
              <Zap className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Resource Requirements
                </h4>
                <div className="space-y-3">
                  {currentEvolution.resourceRequirements.map((resource, index) => (
                    <div key={index} className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center justify-between mb-1">
                        <h6 className="font-medium text-emerald-700 text-sm">{resource.resource}</h6>
                        <Badge variant="outline" className={`text-xs ${
                          resource.priority === 'Critical' ? 'border-red-500 text-red-600' :
                          resource.priority === 'High' ? 'border-orange-500 text-orange-600' :
                          'border-yellow-500 text-yellow-600'
                        }`}>
                          {resource.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{resource.amount}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Success Metrics
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Community Reach</h6>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground">Target: 3x current</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Platform Adoption</h6>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground">Target: 500+ users</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Community Impact</h6>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground">Target: 5 neighborhoods</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collaboration-mapper" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <Network className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-600">Collaboration Opportunity Mapper</h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>

            <div className="space-y-4">
              {currentEvolution.partnershipOpportunities.map((partnership, index) => (
                <Card key={index} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-600">{partnership.partner}</h4>
                    <Badge variant="outline" className="border-blue-300 text-blue-600">
                      Strategic Partner
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Partnership Value:</strong> {partnership.value}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                      Initiate Contact
                    </Button>
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                      Partnership Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Funding & Support Opportunities
              </h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-white/80 border border-purple-300">
                  <strong className="text-purple-700">Community Foundation Grants:</strong> $5K-15K available for community technology initiatives
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-purple-300">
                  <strong className="text-purple-700">University Research Partnerships:</strong> Student developer support and academic credibility
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-purple-300">
                  <strong className="text-purple-700">Corporate Social Responsibility:</strong> Tech companies seeking authentic community impact partnerships
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="innovation-pipeline" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <Lightbulb className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Innovation Pipeline Planner</h3>
              <Rocket className="h-5 w-5 text-purple-600" />
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h4 className="font-semibold text-purple-600 mb-4">Next-Generation Project Ideas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { project: 'Digital Literacy Hub', description: 'Expand platform to include technology training for community members', stage: 'Concept' },
                    { project: 'Neighborhood Economic Network', description: 'Connect community gardens to local business and farmer market ecosystem', stage: 'Research' },
                    { project: 'Civic Engagement Platform', description: 'Leverage community trust to increase local government participation', stage: 'Planning' },
                    { project: 'Intergenerational Knowledge Exchange', description: 'Formalize elder wisdom sharing through digital storytelling', stage: 'Concept' }
                  ].map((project, index) => (
                    <div key={index} className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-purple-700 text-sm">{project.project}</h5>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                          {project.stage}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
                      <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-100 text-xs">
                        Explore Opportunity
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectEvolutionWorkshop;