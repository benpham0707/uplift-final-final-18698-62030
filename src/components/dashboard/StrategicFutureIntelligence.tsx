import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  ChevronRight,
  Sparkles,
  Crown,
  Target,
  Eye,
  Compass,
  Award
} from 'lucide-react';

const StrategicFutureIntelligence: React.FC = () => {
  const [selectedIntelligenceArea, setSelectedIntelligenceArea] = useState('market-trend-analyzer');
  
  // Hard coded mock data - Advanced strategic future planning and intelligence
  const intelligenceAreas = {
    'market-trend-analyzer': {
      name: 'Market Trend Analyzer',
      confidence: 85,
      timeframe: 'Next 2-5 years',
      impact: 'Very High',
      focus: 'Industry evolution and opportunity identification',
      description: 'Real-time analysis of emerging trends and their implications for career positioning',
      marketTrends: [
        { 
          trend: 'ESG Technology Integration', 
          growth: 'Explosive', 
          opportunity: 'Companies need authentic social impact measurement', 
          positioning: 'Your community platform provides real ESG metrics and credibility',
          timeline: '2-3 years'
        },
        {
          trend: 'Civic Technology Expansion',
          growth: 'High',
          opportunity: 'Government digital transformation requires community-connected developers',
          positioning: 'Bridge-building experience positions you for civic tech leadership roles',
          timeline: '1-2 years'
        },
        {
          trend: 'Community-Owned Platforms',
          growth: 'Emerging',
          opportunity: 'Movement toward democratic technology ownership creates demand for your methodology',
          positioning: 'Your community ownership transfer model becomes template for emerging platforms',
          timeline: '3-5 years'
        },
        {
          trend: 'AI Ethics & Community Impact',
          growth: 'Critical',
          opportunity: 'AI development needs community-centered perspectives for ethical implementation',
          positioning: 'Your grassroots technology experience provides authentic AI ethics expertise',
          timeline: '1-3 years'
        }
      ],
      skillDemandForecasting: [
        { skill: 'Community Technology Design', demand: 'Increasing', premium: 'Very High', automation: 'Low' },
        { skill: 'Cross-Cultural Tech Communication', demand: 'High Growth', premium: 'High', automation: 'Very Low' },
        { skill: 'Ethical Technology Development', demand: 'Explosive', premium: 'Very High', automation: 'None' },
        { skill: 'Community Organizing + Tech', demand: 'Emerging Critical', premium: 'Premium', automation: 'None' }
      ]
    },
    'risk-mitigation-planner': {
      name: 'Risk Mitigation Planner',
      confidence: 90,
      timeframe: 'Portfolio Approach',
      impact: 'High',
      focus: 'Career resilience and contingency planning',
      description: 'Portfolio approach to career development with systematic risk management',
      riskFactors: [
        { 
          risk: 'Technology Sector Oversaturation', 
          probability: 'Medium', 
          impact: 'High',
          mitigation: 'Community organizing skills provide alternative career paths in nonprofit and policy sectors',
          contingency: 'Pivot to social enterprise or community development leadership roles'
        },
        {
          risk: 'Economic Recession Impact on Social Programs',
          probability: 'Medium',
          impact: 'Medium',
          mitigation: 'Technical skills remain valuable across economic cycles; community relationships provide recession-resistant opportunities',
          contingency: 'Focus on essential technology services and community resilience initiatives'
        },
        {
          risk: 'AI Automation of Technical Roles',
          probability: 'High',
          impact: 'Medium',
          mitigation: 'Community engagement and cultural translation skills are automation-resistant',
          contingency: 'Transition to AI ethics, community technology consulting, or policy roles'
        }
      ],
      portfolioStrategy: [
        'Technical depth combined with community credibility creates multiple career entry points',
        'Cross-sector skills enable pivoting between technology, nonprofit, academic, and policy careers',
        'Community relationships provide recession-resistant opportunities and entrepreneurship foundation',
        'Bridge-building abilities become more valuable as technology increasingly requires social considerations'
      ],
      adaptabilityAdvantages: [
        'Integrated skillset becomes more valuable over time rather than less relevant',
        'Community organizing experience provides entrepreneurship foundation independent of tech cycles',
        'Cross-cultural communication skills essential regardless of specific technology trends'
      ]
    },
    'competitive-advantage-amplifier': {
      name: 'Competitive Advantage Amplifier',
      confidence: 95,
      timeframe: 'Long-term Strategic',
      impact: 'Very High',
      focus: 'Unique positioning maximization',
      description: 'Amplify rare skill combinations for maximum competitive differentiation',
      uniquePositioning: [
        {
          advantage: 'Technical + Community Integration',
          rarity: 'Extremely Rare',
          value: 'Premium',
          amplification: 'Document community impact metrics alongside technical achievements',
          monetization: 'Community technology consulting, corporate ESG partnerships, civic tech leadership'
        },
        {
          advantage: 'Cross-Generational Technology Bridge',
          rarity: 'Very Rare',
          value: 'High Premium',
          amplification: 'Develop replicable methodology for intergenerational technology adoption',
          monetization: 'Educational technology consulting, senior-focused product development, digital divide consulting'
        },
        {
          advantage: 'Grassroots + Systems Thinking',
          rarity: 'Rare',
          value: 'High',
          amplification: 'Create frameworks showing how local initiatives scale to systemic change',
          monetization: 'Policy consulting, social enterprise development, impact measurement consulting'
        }
      ],
      marketPositioning: [
        'Few professionals combine deep technical skills with authentic community organizing experience',
        'Demand premium in mission-driven organizations requiring both technical excellence and community credibility',
        'Unique position to translate between technical teams and community stakeholders',
        'Rarity creates value in multiple sectors simultaneously rather than single industry dependence'
      ],
      longTermValue: [
        'As technology becomes more community-focused, your integrated experience provides increasing competitive advantage',
        'ESG and social impact requirements make authentic community relationships more valuable over time',
        'Cross-sector bridge-building becomes premium skill as industries increasingly interconnect'
      ]
    },
    'opportunity-pipeline-tracker': {
      name: 'Opportunity Pipeline Tracker',
      confidence: 80,
      timeframe: 'Systematic Development',
      impact: 'High',
      focus: 'Emerging opportunity identification and preparation',
      description: 'Systematic identification and strategic positioning for emerging opportunities',
      emergingOpportunities: [
        {
          opportunity: 'Digital Equity Policy Roles',
          stage: 'Emerging',
          preparation: 'Build policy analysis portfolio alongside community technology work',
          timeline: '12-18 months',
          probability: 'High',
          impact: 'Very High'
        },
        {
          opportunity: 'Community AI Ethics Consulting',
          stage: 'Early Development',
          preparation: 'Develop frameworks for community-centered AI development and evaluation',
          timeline: '6-12 months',
          probability: 'Medium-High',
          impact: 'High'
        },
        {
          opportunity: 'Social Impact Technology Fellowship',
          stage: 'Available Now',
          preparation: 'Document community platform impact and expansion potential',
          timeline: '3-6 months',
          probability: 'High',
          impact: 'Medium-High'
        },
        {
          opportunity: 'Civic Technology Startup Leadership',
          stage: 'Future Development',
          preparation: 'Build technical team leadership experience and expand civic technology network',
          timeline: '18-24 months',
          probability: 'Medium',
          impact: 'Very High'
        }
      ],
      preparationStrategy: [
        'Systematic documentation of community impact metrics for rapid opportunity response',
        'Regular engagement with emerging field leaders to identify opportunities early',
        'Portfolio development showing progression from individual contributor to strategic leader',
        'Network development across sectors to ensure opportunities surface through relationship channels'
      ],
      opportunityPipeline: [
        'Near-term: Fellowship and graduate school applications leveraging current project success',
        'Medium-term: Policy consulting and civic technology leadership roles',
        'Long-term: Social enterprise leadership, academic research positions, or startup founder roles'
      ]
    }
  };

  const currentArea = intelligenceAreas[selectedIntelligenceArea];

  return (
    <Card className="glass-card shadow-large">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-soft">
            <Brain className="h-5 w-5" />
          </div>
          Strategic Future Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="market-analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="market-analyzer">Market Trends</TabsTrigger>
            <TabsTrigger value="risk-planner">Risk Planning</TabsTrigger>
            <TabsTrigger value="advantage-amplifier">Advantage</TabsTrigger>
            <TabsTrigger value="opportunity-tracker">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="market-analyzer" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <h3 className="font-semibold text-indigo-600">Market Trend Analyzer</h3>
              <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(intelligenceAreas).map(([key, area]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedIntelligenceArea === key ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''
                  }`}
                  onClick={() => setSelectedIntelligenceArea(key)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs">{area.name}</h4>
                      <Badge variant="outline" className="border-indigo-500 text-indigo-600 text-xs">
                        {area.confidence}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {area.timeframe}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedIntelligenceArea === 'market-trend-analyzer' && (
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <h4 className="font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Industry Evolution Analysis
                  </h4>
                  <div className="space-y-4">
                    {currentArea.marketTrends.map((trend, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/80 border border-indigo-200">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-indigo-700">{trend.trend}</h5>
                          <Badge variant="outline" className={`text-xs ${
                            trend.growth === 'Explosive' ? 'border-red-500 text-red-600' :
                            trend.growth === 'High' ? 'border-orange-500 text-orange-600' :
                            trend.growth === 'Critical' ? 'border-purple-500 text-purple-600' :
                            'border-blue-500 text-blue-600'
                          }`}>
                            {trend.growth}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          <strong>Opportunity:</strong> {trend.opportunity}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          <strong>Your Positioning:</strong> {trend.positioning}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <strong>Timeline:</strong> {trend.timeline}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Skill Demand Forecasting
                  </h4>
                  <div className="space-y-3">
                    {currentArea.skillDemandForecasting.map((skill, index) => (
                      <div key={index} className="p-3 rounded-lg bg-white/80 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-medium text-green-700 text-sm">{skill.skill}</h6>
                          <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                            {skill.premium}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>Demand: {skill.demand}</div>
                          <div>Automation Risk: {skill.automation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="risk-planner" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
              <Shield className="h-6 w-6 text-orange-600" />
              <h3 className="font-semibold text-orange-600">Risk Mitigation Planner</h3>
              <Target className="h-5 w-5 text-orange-600" />
            </div>

            {selectedIntelligenceArea === 'risk-mitigation-planner' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {currentArea.riskFactors.map((risk, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-orange-600">{risk.risk}</h4>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={`text-xs ${
                            risk.probability === 'High' ? 'border-red-500 text-red-600' :
                            'border-yellow-500 text-yellow-600'
                          }`}>
                            {risk.probability} Probability
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            risk.impact === 'High' ? 'border-red-500 text-red-600' :
                            'border-yellow-500 text-yellow-600'
                          }`}>
                            {risk.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Mitigation Strategy:</strong> {risk.mitigation}</p>
                        <p><strong>Contingency Plan:</strong> {risk.contingency}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                  <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Portfolio Strategy Advantages
                  </h4>
                  <div className="space-y-3">
                    {currentArea.portfolioStrategy.map((strategy, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-blue-300">
                        <ChevronRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="advantage-amplifier" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <Award className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Competitive Advantage Amplifier</h3>
              <Sparkles className="h-5 w-5 text-purple-600 animate-pulse" />
            </div>

            {selectedIntelligenceArea === 'competitive-advantage-amplifier' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {currentArea.uniquePositioning.map((position, index) => (
                    <Card key={index} className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-purple-600">{position.advantage}</h4>
                        <Badge variant="outline" className="border-purple-500 text-purple-600">
                          {position.rarity}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <p><strong>Market Value:</strong> {position.value}</p>
                        <p><strong>Amplification Strategy:</strong> {position.amplification}</p>
                        <p><strong>Monetization Opportunities:</strong> {position.monetization}</p>
                      </div>
                      <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                        Develop Amplification Plan
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Long-term Value Creation
                  </h4>
                  <div className="space-y-3">
                    {currentArea.longTermValue.map((value, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-emerald-300">
                        <ChevronRight className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="opportunity-tracker" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <Compass className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-600">Opportunity Pipeline Tracker</h3>
              <Target className="h-5 w-5 text-green-600" />
            </div>

            {selectedIntelligenceArea === 'opportunity-pipeline-tracker' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {currentArea.emergingOpportunities.map((opportunity, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-green-600">{opportunity.opportunity}</h4>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={`text-xs ${
                            opportunity.stage === 'Available Now' ? 'border-green-500 text-green-600' :
                            opportunity.stage === 'Early Development' ? 'border-yellow-500 text-yellow-600' :
                            opportunity.stage === 'Emerging' ? 'border-blue-500 text-blue-600' :
                            'border-gray-500 text-gray-600'
                          }`}>
                            {opportunity.stage}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            opportunity.probability === 'High' ? 'border-green-500 text-green-600' :
                            opportunity.probability === 'Medium-High' ? 'border-yellow-500 text-yellow-600' :
                            'border-orange-500 text-orange-600'
                          }`}>
                            {opportunity.probability}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <p><strong>Preparation Strategy:</strong> {opportunity.preparation}</p>
                        <p><strong>Timeline:</strong> {opportunity.timeline}</p>
                        <p><strong>Impact Potential:</strong> {opportunity.impact}</p>
                      </div>
                      <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-100">
                        Create Preparation Plan
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StrategicFutureIntelligence;