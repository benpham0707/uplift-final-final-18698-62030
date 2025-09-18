import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  Users, 
  Heart, 
  Link, 
  ChevronRight,
  Sparkles,
  Crown,
  UserPlus,
  Handshake,
  Target,
  Star
} from 'lucide-react';

const NetworkRelationshipCapitalBuilder: React.FC = () => {
  const [selectedNetworkArea, setSelectedNetworkArea] = useState('strategic-mapping');
  
  // Hard coded mock data - Network analysis and relationship building strategies
  const networkingStrategies = {
    'strategic-mapping': {
      name: 'Strategic Network Mapping',
      currentStrength: 75,
      targetStrength: 90,
      focus: 'Relationship Visualization & Gap Analysis',
      timeline: '3-6 months',
      description: 'Map current relationships and identify strategic expansion opportunities',
      networkSectors: [
        { sector: 'Community Leaders', strength: 85, connections: 12, quality: 'High', expansion: 'Medium' },
        { sector: 'Technology Professionals', strength: 60, connections: 8, quality: 'Medium', expansion: 'High' },
        { sector: 'Academic/Research', strength: 45, connections: 4, quality: 'Medium', expansion: 'Very High' },
        { sector: 'Government/Policy', strength: 30, connections: 2, quality: 'Low', expansion: 'Critical' },
        { sector: 'Social Entrepreneurs', strength: 40, connections: 5, quality: 'Medium', expansion: 'High' }
      ],
      strategicGaps: [
        'Limited connections in policy/government sector for scaling community technology initiatives',
        'Need stronger ties to venture capital and impact investing networks',
        'Insufficient academic connections for research collaboration and graduate school opportunities'
      ],
      bridgeOpportunities: [
        'Leverage community credibility to connect with policy makers focused on digital equity',
        'Use technical skills to provide value to social entrepreneurs needing technology solutions',
        'Bridge academic researchers with community partners for participatory research opportunities'
      ]
    },
    'mentorship-strategy': {
      name: 'Mentorship Development Strategy',
      currentStrength: 70,
      targetStrength: 95,
      focus: 'Strategic Mentor Acquisition & Relationship Management',
      timeline: '6-12 months',
      description: 'Systematically identify and develop relationships with strategic mentors',
      mentorTypes: [
        { type: 'Technical Mentor', current: 'Informal', target: 'Formal', priority: 'High', timeline: '2-3 months' },
        { type: 'Community Leadership Mentor', current: 'Strong', target: 'Advisory', priority: 'Medium', timeline: '3-6 months' },
        { type: 'Academic Research Mentor', current: 'None', target: 'Formal', priority: 'Critical', timeline: '1-2 months' },
        { type: 'Policy/Government Mentor', current: 'None', target: 'Informal', priority: 'High', timeline: '4-6 months' },
        { type: 'Social Enterprise Mentor', current: 'Informal', target: 'Advisory', priority: 'Medium', timeline: '6-12 months' }
      ],
      approachStrategies: [
        'Reach out to university professors whose research aligns with community technology work',
        'Connect with civic technology leaders through professional organizations and conferences',
        'Leverage community relationships to get introductions to policy makers and government officials'
      ],
      relationshipDevelopment: [
        'Provide value first by sharing community insights and research opportunities',
        'Establish regular check-ins and progress updates to maintain engagement',
        'Create opportunities for mentors to connect with each other around shared interests'
      ]
    },
    'cross-sector-bridge': {
      name: 'Cross-Sector Bridge Building',
      currentStrength: 80,
      targetStrength: 95,
      focus: 'Professional Opportunity Creation Through Relationship Translation',
      timeline: '6-18 months',
      description: 'Transform community connections into professional opportunities and strategic partnerships',
      bridgeOpportunities: [
        { bridge: 'Community → Academic', value: 'Research partnerships and graduate school connections', strength: 'Medium' },
        { bridge: 'Technical → Policy', value: 'Technology policy consultation and government advisory roles', strength: 'Low' },
        { bridge: 'Community → Corporate', value: 'Corporate social responsibility partnerships and consulting', strength: 'Medium' },
        { bridge: 'Academic → Community', value: 'Grant opportunities and research validation', strength: 'High' },
        { bridge: 'Government → Community', value: 'Policy implementation and community technology funding', strength: 'Low' }
      ],
      valuePropositions: [
        'Authentic community relationships provide corporations with genuine social impact measurement',
        'Technical implementation experience helps academics translate research into real-world applications',
        'Cross-cultural communication skills enable policy makers to better understand community technology needs'
      ],
      leverageStrategies: [
        'Host community technology showcases to bring different sectors together',
        'Serve as connector between researchers seeking community partners and communities needing research',
        'Offer technology consulting to community organizations while building professional portfolio'
      ]
    }
  };

  const currentNetworkArea = networkingStrategies[selectedNetworkArea];

  return (
    <Card className="glass-card shadow-large">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-soft">
            <Network className="h-5 w-5" />
          </div>
          Network & Relationship Capital Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="network-mapping" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="network-mapping">Network Mapping</TabsTrigger>
            <TabsTrigger value="mentorship-planner">Mentorship</TabsTrigger>
            <TabsTrigger value="relationship-optimizer">Relationship Value</TabsTrigger>
            <TabsTrigger value="bridge-builder">Bridge Building</TabsTrigger>
          </TabsList>

          <TabsContent value="network-mapping" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200">
              <Target className="h-6 w-6 text-pink-600" />
              <h3 className="font-semibold text-pink-600">Network Mapping Tool</h3>
              <Sparkles className="h-5 w-5 text-pink-600 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(networkingStrategies).map(([key, strategy]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedNetworkArea === key ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                  }`}
                  onClick={() => setSelectedNetworkArea(key)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{strategy.name}</h4>
                      <Badge variant="outline" className="border-pink-500 text-pink-600">
                        {strategy.currentStrength}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Current: {strategy.currentStrength}%</span>
                        <span>Target: {strategy.targetStrength}%</span>
                      </div>
                      <Progress value={strategy.currentStrength} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Focus: {strategy.focus}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedNetworkArea === 'strategic-mapping' && (
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                <h4 className="font-semibold text-pink-600 mb-4 flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Current Network Analysis
                </h4>
                <div className="space-y-4">
                  {currentNetworkArea.networkSectors.map((sector, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/80 border border-pink-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-pink-700">{sector.sector}</h5>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-pink-300 text-pink-600 text-xs">
                            {sector.connections} connections
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            sector.expansion === 'Critical' || sector.expansion === 'Very High' ? 'border-red-500 text-red-600' :
                            sector.expansion === 'High' ? 'border-orange-500 text-orange-600' :
                            'border-yellow-500 text-yellow-600'
                          }`}>
                            {sector.expansion} Priority
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span>Strength: {sector.strength}%</span>
                        <span>Quality: {sector.quality}</span>
                      </div>
                      <Progress value={sector.strength} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="mentorship-planner" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
              <UserPlus className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Mentorship Strategy Planner</h3>
              <Star className="h-5 w-5 text-purple-600" />
            </div>

            {selectedNetworkArea === 'mentorship-strategy' && (
              <div className="space-y-4">
                {currentNetworkArea.mentorTypes.map((mentor, index) => (
                  <Card key={index} className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-purple-600">{mentor.type}</h4>
                      <Badge variant="outline" className={`${
                        mentor.priority === 'Critical' ? 'border-red-500 text-red-600' :
                        mentor.priority === 'High' ? 'border-orange-500 text-orange-600' :
                        'border-yellow-500 text-yellow-600'
                      }`}>
                        {mentor.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                      <div>
                        <span className="font-medium">Current:</span> {mentor.current}
                      </div>
                      <div>
                        <span className="font-medium">Target:</span> {mentor.target}
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span> {mentor.timeline}
                      </div>
                    </div>
                    <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                      Develop Approach Strategy
                    </Button>
                  </Card>
                ))}

                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Strategic Approach Methods
                  </h4>
                  <div className="space-y-3">
                    {currentNetworkArea.approachStrategies.map((strategy, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-yellow-300">
                        <ChevronRight className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="relationship-optimizer" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <Handshake className="h-6 w-6 text-emerald-600" />
              <h3 className="font-semibold text-emerald-600">Relationship Value Optimizer</h3>
              <Heart className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h4 className="font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Value Creation Strategies
                </h4>
                <div className="space-y-4">
                  {[
                    { strategy: 'Research Partnership Facilitation', description: 'Connect academic researchers with community partners for participatory research', impact: 'High' },
                    { strategy: 'Technology Skill Sharing', description: 'Provide technical consulting to community organizations while building professional portfolio', impact: 'Medium' },
                    { strategy: 'Cross-Sector Event Hosting', description: 'Organize community technology showcases bringing together diverse stakeholders', impact: 'Very High' },
                    { strategy: 'Policy Translation Services', description: 'Help policy makers understand community technology needs through authentic relationships', impact: 'High' }
                  ].map((value, index) => (
                    <div key={index} className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-emerald-700 text-sm">{value.strategy}</h5>
                        <Badge variant="outline" className={`text-xs ${
                          value.impact === 'Very High' ? 'border-green-500 text-green-600' :
                          value.impact === 'High' ? 'border-blue-500 text-blue-600' :
                          'border-yellow-500 text-yellow-600'
                        }`}>
                          {value.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Relationship Development Timeline
                </h4>
                <div className="space-y-4">
                  {[
                    { phase: 'Immediate (1-2 months)', focus: 'Value-First Outreach', activities: ['Share community insights with researchers', 'Offer technology skills to nonprofits'] },
                    { phase: 'Short-term (3-6 months)', focus: 'Regular Engagement', activities: ['Monthly mentor check-ins', 'Quarterly stakeholder updates'] },
                    { phase: 'Long-term (6+ months)', focus: 'Strategic Collaboration', activities: ['Joint projects and partnerships', 'Advisory role development'] }
                  ].map((timeline, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/80 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-blue-700">{timeline.phase}</h5>
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
            </div>
          </TabsContent>

          <TabsContent value="bridge-builder" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
              <Link className="h-6 w-6 text-orange-600" />
              <h3 className="font-semibold text-orange-600">Cross-Sector Bridge Builder</h3>
              <Network className="h-5 w-5 text-orange-600" />
            </div>

            {selectedNetworkArea === 'cross-sector-bridge' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {currentNetworkArea.bridgeOpportunities.map((bridge, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-orange-600 text-sm">{bridge.bridge}</h4>
                        <Badge variant="outline" className={`text-xs ${
                          bridge.strength === 'High' ? 'border-green-500 text-green-600' :
                          bridge.strength === 'Medium' ? 'border-yellow-500 text-yellow-600' :
                          'border-red-500 text-red-600'
                        }`}>
                          {bridge.strength} Strength
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">{bridge.value}</p>
                      <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-100 text-xs">
                        Develop Bridge Strategy
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Value Propositions for Each Sector
                  </h4>
                  <div className="space-y-3">
                    {currentNetworkArea.valuePropositions.map((proposition, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-green-300">
                        <ChevronRight className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{proposition}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NetworkRelationshipCapitalBuilder;