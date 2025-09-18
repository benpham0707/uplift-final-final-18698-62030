import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  Calendar, 
  ChevronRight,
  Sparkles,
  Crown,
  University,
  Award,
  Target
} from 'lucide-react';

const AcademicJourneyPlanner: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState('computer-science');
  
  // Hard coded mock data - Academic program matching and strategic course planning
  const academicData = {
    'computer-science': {
      name: 'Computer Science with HCI Focus',
      match: 94,
      schools: ['MIT', 'Stanford', 'Carnegie Mellon', 'Georgia Tech'],
      keyAdvantages: [
        'Real-world full-stack development experience provides concrete foundation for theoretical coursework',
        'Community platform deployment demonstrates understanding of user-centered design principles',
        'Cross-cultural communication skills valuable for human-computer interaction research'
      ],
      strategicCourses: [
        { course: 'Human-Computer Interaction', connection: 'Direct application of community platform design experience' },
        { course: 'Database Systems', connection: 'Build on practical experience with community garden data management' },
        { course: 'Software Engineering', connection: 'Formalize methodologies used in community platform development' },
        { course: 'Ethics in Computing', connection: 'Framework for technology equity work already demonstrated' }
      ],
      researchOpportunities: [
        { area: 'Community-Centered Design', faculty: 'Dr. Sarah Chen - Community Technology Lab', fit: 'Perfect match for garden platform expansion research' },
        { area: 'Digital Equity', faculty: 'Dr. Marcus Johnson - Inclusive Computing Research', fit: 'Natural extension of community technology access work' },
        { area: 'Participatory Design', faculty: 'Dr. Elena Rodriguez - Social Computing Group', fit: 'Aligns with community ownership transfer methodology' }
      ]
    },
    'interdisciplinary-studies': {
      name: 'Technology & Society Interdisciplinary',
      match: 96,
      schools: ['Harvard', 'Yale', 'Brown', 'Wesleyan'],
      keyAdvantages: [
        'Bridge-building experience between technical and social domains perfectly fits interdisciplinary approach',
        'Community organizing background provides social science research foundation',
        'Technology implementation experience grounds theoretical social analysis in practical understanding'
      ],
      strategicCourses: [
        { course: 'Technology Policy', connection: 'Build framework for community technology governance experience' },
        { course: 'Urban Sociology', connection: 'Analyze community garden impact through academic lens' },
        { course: 'Digital Anthropology', connection: 'Formalize cross-cultural technology adoption observations' },
        { course: 'Public Policy Analysis', connection: 'Framework for scaling community technology initiatives' }
      ],
      researchOpportunities: [
        { area: 'Civic Technology', faculty: 'Dr. Jennifer Kim - Public Interest Technology', fit: 'Research pathway for community platform scaling' },
        { area: 'Technology & Inequality', faculty: 'Dr. Robert Martinez - Digital Divide Studies', fit: 'Academic framework for community technology access work' }
      ]
    },
    'public-policy': {
      name: 'Public Policy with Technology Focus',
      match: 88,
      schools: ['Georgetown', 'George Washington', 'American University', 'Syracuse'],
      keyAdvantages: [
        'Community governance experience through garden platform provides practical policy implementation understanding',
        'Stakeholder management skills translate directly to policy development and advocacy',
        'Technology background enables informed policy making in digital age'
      ],
      strategicCourses: [
        { course: 'Policy Analysis & Evaluation', connection: 'Framework for measuring community platform impact' },
        { course: 'Technology Policy', connection: 'Direct application of community technology governance experience' },
        { course: 'Community Development', connection: 'Academic foundation for garden platform community organizing work' }
      ],
      researchOpportunities: [
        { area: 'Digital Governance', faculty: 'Dr. Patricia Wong - Tech Policy Institute', fit: 'Research community technology policy frameworks' },
        { area: 'Community Resilience', faculty: 'Dr. Michael Thompson - Urban Policy Lab', fit: 'Study technology role in community development' }
      ]
    }
  };

  const currentData = academicData[selectedProgram];

  return (
    <Card className="glass-card shadow-large">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-soft">
            <GraduationCap className="h-5 w-5" />
          </div>
          Academic Journey Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="program-matcher" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="program-matcher">Program Matcher</TabsTrigger>
            <TabsTrigger value="course-strategist">Course Strategy</TabsTrigger>
            <TabsTrigger value="research-finder">Research Ops</TabsTrigger>
            <TabsTrigger value="timeline-optimizer">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="program-matcher" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <University className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-600">College Program Matcher</h3>
              <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(academicData).map(([key, program]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedProgram === key ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedProgram(key)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{program.name}</h4>
                      <Badge variant="outline" className="border-blue-500 text-blue-600">
                        {program.match}% Match
                      </Badge>
                    </div>
                    <Progress value={program.match} className="h-2" />
                    <div className="flex flex-wrap gap-1">
                      {program.schools.slice(0, 2).map((school, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {school}
                        </Badge>
                      ))}
                      {program.schools.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100">
                          +{program.schools.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
              <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                {currentData.name} - Strategic Advantages
              </h4>
              <div className="space-y-4">
                {currentData.keyAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-blue-200">
                    <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground">{advantage}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h5 className="font-medium text-blue-600 mb-2">Target Schools</h5>
                <div className="flex flex-wrap gap-2">
                  {currentData.schools.map((school, index) => (
                    <Badge key={index} variant="outline" className="border-blue-300 text-blue-600">
                      {school}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="course-strategist" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <BookOpen className="h-6 w-6 text-emerald-600" />
              <h3 className="font-semibold text-emerald-600">Course Selection Strategist</h3>
              <Target className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="space-y-4">
              {currentData.strategicCourses.map((courseInfo, index) => (
                <Card key={index} className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-emerald-600">{courseInfo.course}</h4>
                    <Badge variant="outline" className="border-emerald-300 text-emerald-600">
                      High Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{courseInfo.connection}</p>
                  <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-100">
                    Add to Academic Plan
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Strategic Sequencing Recommendations
              </h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-white/80 border border-yellow-300">
                  <strong className="text-yellow-700">First Year:</strong> Focus on foundational courses that build on existing experience - Database Systems and Software Engineering
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-yellow-300">
                  <strong className="text-yellow-700">Sophomore Year:</strong> Add HCI and Ethics courses to formalize community-centered design approach
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-yellow-300">
                  <strong className="text-yellow-700">Junior/Senior:</strong> Advanced research courses and independent studies building on established community relationships
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="research-finder" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <Microscope className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Research Opportunity Finder</h3>
              <Award className="h-5 w-5 text-purple-600" />
            </div>

            <div className="space-y-4">
              {currentData.researchOpportunities.map((opportunity, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-purple-600">{opportunity.area}</h4>
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      Perfect Fit
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Faculty:</strong> {opportunity.faculty}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Research Fit:</strong> {opportunity.fit}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                      Contact Faculty
                    </Button>
                    <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                      Research Lab Info
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline-optimizer" className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <h3 className="font-semibold text-indigo-600">Academic Timeline Optimizer</h3>
              <Target className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h4 className="font-semibold text-indigo-600 mb-4">Four-Year Strategic Timeline</h4>
                <div className="space-y-4">
                  {[
                    { year: 'Freshman Year', focus: 'Foundation Building', activities: ['Core CS courses', 'Continue community platform work', 'Join relevant student organizations'] },
                    { year: 'Sophomore Year', focus: 'Specialization Discovery', activities: ['HCI and Ethics courses', 'Research lab involvement', 'Summer community tech internship'] },
                    { year: 'Junior Year', focus: 'Research & Leadership', activities: ['Independent research project', 'Leadership roles in organizations', 'Industry connections'] },
                    { year: 'Senior Year', focus: 'Impact & Transition', activities: ['Senior thesis/capstone', 'Graduate school/career prep', 'Platform knowledge transfer'] }
                  ].map((phase, index) => (
                    <div key={index} className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-indigo-700">{phase.year}</h5>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                          {phase.focus}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {phase.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-indigo-500" />
                            <span className="text-sm text-muted-foreground">{activity}</span>
                          </div>
                        ))}
                      </div>
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

export default AcademicJourneyPlanner;