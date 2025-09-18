import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Briefcase, 
  ChevronRight,
  Sparkles,
  Crown,
  BarChart3,
  Calculator,
  Zap
} from 'lucide-react';

const CareerPathStrategyDashboard: React.FC = () => {
  const [selectedCareerPath, setSelectedCareerPath] = useState('tech-social-impact');
  
  // Hard coded mock data - Career path analysis and strategic positioning
  const careerPathData = {
    'tech-social-impact': {
      name: 'Technology for Social Impact',
      alignment: 92,
      probability: 88,
      marketDemand: 'Growing Rapidly',
      salaryRange: '$85K - $150K',
      timeToRole: '2-4 years',
      keySkills: ['Full-Stack Development', 'Community Engagement', 'Project Leadership'],
      supportingEvidence: [
        'Community garden platform demonstrates direct social impact through technology',
        'Cross-cultural communication skills proven through diverse stakeholder management',
        'Production-level experience with real user base and measurable community outcomes'
      ],
      strategicAdvantages: [
        { advantage: 'Unique Technical + Community Bridge', strength: 'Rare combination of deep technical skills with authentic community organizing experience' },
        { advantage: 'Proven Impact Measurement', strength: 'Demonstrated ability to build, deploy, and measure social outcomes of technology solutions' },
        { advantage: 'Cross-Sector Network', strength: 'Established relationships spanning grassroots community, local government, and technology sectors' }
      ],
      marketOpportunities: [
        { sector: 'Civic Technology', growth: 'High', demand: 'Critical shortage of community-connected developers' },
        { sector: 'ESG Technology', growth: 'Explosive', demand: 'Companies need authentic social impact measurement tools' },
        { sector: 'Community Platforms', growth: 'Steady', demand: 'Growing demand for community-owned technology solutions' }
      ]
    },
    'policy-technology': {
      name: 'Technology Policy & Ethics',
      alignment: 89,
      probability: 82,
      marketDemand: 'High Growth',
      salaryRange: '$90K - $180K',
      timeToRole: '3-5 years',
      keySkills: ['Policy Analysis', 'Technology Understanding', 'Stakeholder Communication'],
      supportingEvidence: [
        'Bridge-building between technical and community perspectives demonstrates policy translation skills',
        'Experience navigating community governance shows understanding of democratic processes',
        'Technology project implementation reveals grasp of policy implications in practice'
      ],
      strategicAdvantages: [
        { advantage: 'Technical Depth + Policy Intuition', strength: 'Understanding of how policy affects technology implementation in real communities' },
        { advantage: 'Grassroots Policy Experience', strength: 'Firsthand knowledge of how policy impacts underserved communities' }
      ],
      marketOpportunities: [
        { sector: 'Government Tech Policy', growth: 'High', demand: 'Need for policy makers who understand technology implementation' },
        { sector: 'Corporate Ethics', growth: 'Very High', demand: 'Companies need ethical technology development guidance' }
      ]
    },
    'social-entrepreneurship': {
      name: 'Social Entrepreneurship',
      alignment: 95,
      probability: 85,
      marketDemand: 'Strong Growth',
      salaryRange: '$70K - $200K+',
      timeToRole: '1-3 years',
      keySkills: ['Business Development', 'Impact Measurement', 'Community Organizing'],
      supportingEvidence: [
        'Community garden platform demonstrates end-to-end social enterprise development',
        'Sustainable community ownership transfer shows understanding of long-term organizational development',
        'Measurable community impact proves ability to create and track social value'
      ],
      strategicAdvantages: [
        { advantage: 'Proven Social Enterprise Model', strength: 'Built, launched, and transferred ownership of successful community-driven platform' },
        { advantage: 'Community Trust Capital', strength: 'Established credibility and relationships in target communities for future ventures' }
      ],
      marketOpportunities: [
        { sector: 'Impact Investing', growth: 'Very High', demand: 'Investors need entrepreneurs with proven community impact track records' },
        { sector: 'B-Corp Development', growth: 'High', demand: 'Growing market for community-centered business models' }
      ]
    }
  };

  const currentData = careerPathData[selectedCareerPath];

  return (
    <Card className="glass-card shadow-large">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-soft">
            <Target className="h-5 w-5" />
          </div>
          Career Path Strategy Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="alignment-analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alignment-analyzer">Alignment Analyzer</TabsTrigger>
            <TabsTrigger value="probability-calculator">Success Calculator</TabsTrigger>
            <TabsTrigger value="positioning-optimizer">Strategic Positioning</TabsTrigger>
            <TabsTrigger value="market-tracker">Market Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="alignment-analyzer" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
              <Crown className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Dynamic Career Alignment Analysis</h3>
              <Sparkles className="h-5 w-5 text-purple-600 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(careerPathData).map(([key, path]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedCareerPath === key ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setSelectedCareerPath(key)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{path.name}</h4>
                      <Badge variant="outline" className="border-purple-500 text-purple-600">
                        {path.alignment}% Match
                      </Badge>
                    </div>
                    <Progress value={path.alignment} className="h-2" />
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Success Probability: {path.probability}%</div>
                      <div>Market: {path.marketDemand}</div>
                      <div>Timeline: {path.timeToRole}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
              <h4 className="font-semibold text-purple-600 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {currentData.name} - Detailed Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/80 border border-purple-200">
                    <h5 className="font-medium text-purple-600 mb-2">Supporting Evidence</h5>
                    <div className="space-y-2">
                      {currentData.supportingEvidence.map((evidence, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/80 border border-purple-200">
                    <h5 className="font-medium text-purple-600 mb-2">Key Requirements</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentData.keySkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <div>Salary Range: {currentData.salaryRange}</div>
                      <div>Time to Role: {currentData.timeToRole}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="probability-calculator" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200">
              <Calculator className="h-6 w-6 text-cyan-600" />
              <h3 className="font-semibold text-cyan-600">Pathway Probability Calculator</h3>
              <TrendingUp className="h-5 w-5 text-cyan-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold text-cyan-600 mb-4">Success Probability: {currentData.probability}%</h4>
                <Progress value={currentData.probability} className="h-3 mb-4" />
                <div className="space-y-3">
                  {currentData.strategicAdvantages.map((advantage, index) => (
                    <div key={index} className="p-3 rounded-lg bg-cyan-50 border border-cyan-200">
                      <h6 className="font-medium text-cyan-700 text-sm mb-1">{advantage.advantage}</h6>
                      <p className="text-xs text-muted-foreground">{advantage.strength}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-teal-600 mb-4">Risk Factors & Mitigation</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <h6 className="font-medium text-orange-700 text-sm mb-1">Competition Level: Moderate</h6>
                    <p className="text-xs text-muted-foreground">Mitigation: Your unique community + tech combination differentiates you</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <h6 className="font-medium text-yellow-700 text-sm mb-1">Skill Gap: Advanced Policy Knowledge</h6>
                    <p className="text-xs text-muted-foreground">Mitigation: Your practical policy experience through community work provides foundation</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h6 className="font-medium text-green-700 text-sm mb-1">Network Strength: High</h6>
                    <p className="text-xs text-muted-foreground">Advantage: Cross-sector relationships provide multiple entry pathways</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="positioning-optimizer" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
              <Zap className="h-6 w-6 text-emerald-600" />
              <h3 className="font-semibold text-emerald-600">Strategic Positioning Optimizer</h3>
              <Award className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="space-y-6">
              {currentData.strategicAdvantages.map((advantage, index) => (
                <Card key={index} className="p-6 bg-gradient-to-r from-emerald-50 to-green-50">
                  <h4 className="font-semibold text-emerald-600 mb-3">{advantage.advantage}</h4>
                  <p className="text-muted-foreground mb-4">{advantage.strength}</p>
                  <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-100">
                    Develop Positioning Strategy
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="market-tracker" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-600">Market Opportunity Tracker</h3>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {currentData.marketOpportunities.map((opportunity, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">{opportunity.sector}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Growth:</span>
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        {opportunity.growth}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{opportunity.demand}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CareerPathStrategyDashboard;