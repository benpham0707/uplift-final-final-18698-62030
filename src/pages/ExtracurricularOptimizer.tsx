import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { useNavigate } from 'react-router-dom';
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
  Play,
  Home,
  User,
  Clock,
  ChevronDown
} from 'lucide-react';

const AcademicPlanningIntelligence = () => {
  const navigate = useNavigate();
  const [isPlanningDropdownOpen, setIsPlanningDropdownOpen] = useState(false);

  // Hard coded dashboard data representing strategic planning categories with detailed progress tracking
  const dashboardCategories = [
    {
      id: 'academic',
      title: 'Academic Planning Intelligence',
      subtitle: 'Strategic course selection and grade optimization',
      icon: BookOpen,
      progress: 65,
      status: 'Ready',
      items: [
        { name: 'Course recommendations', completed: true, description: 'AI-powered course selection' },
        { name: 'Grade optimization', completed: true, description: 'Strategic targeting & effort allocation' },
        { name: 'Professor intelligence', completed: false, description: 'Teaching styles & networking value' },
        { name: 'Special scenarios', completed: false, description: 'Transfer, double major, study abroad' }
      ]
    },
    {
      id: 'projects',
      title: 'Project Incubation System',
      subtitle: 'AI-collaborative project development',
      icon: Lightbulb,
      progress: 40,
      status: 'Ready',
      items: [
        { name: 'Project discovery', completed: true, description: 'Interest mining & problem identification' },
        { name: 'AI collaboration', completed: true, description: 'Socratic mode & development partner' },
        { name: 'Technical projects', completed: false, description: 'Open source, hackathons, apps' },
        { name: 'Entrepreneurial projects', completed: false, description: 'MVP development & validation' }
      ]
    },
    {
      id: 'extracurricular',
      title: 'Extracurricular Strategy Engine',
      subtitle: 'Strategic involvement optimization',
      icon: Users,
      progress: 55,
      status: 'Ready',
      items: [
        { name: 'Portfolio analysis', completed: true, description: 'Leadership mapping & ROI calculation' },
        { name: 'Strategic recommendations', completed: true, description: 'Depth vs breadth optimization' },
        { name: 'Competition strategy', completed: false, description: 'Selection & preparation planning' },
        { name: 'Creation opportunities', completed: false, description: 'Club founding & event organization' }
      ]
    },
    {
      id: 'skills',
      title: 'Skill Development Accelerator',
      subtitle: 'Strategic skill building aligned with market demands',
      icon: Brain,
      progress: 30,
      status: 'Ready',
      items: [
        { name: 'Skill gap analysis', completed: true, description: 'Current vs target state assessment' },
        { name: 'Technical skills', completed: false, description: 'Stack development & certifications' },
        { name: 'Soft skills', completed: false, description: 'Communication & leadership development' },
        { name: 'Domain knowledge', completed: false, description: 'Industry learning & business acumen' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary/80"
              >
                <Home className="h-5 w-5" />
                <span>Uplift</span>
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                Platform
              </Button>
              
              <Button variant="ghost" size="sm">
                Features
              </Button>
              
              {/* Academic Planning Dropdown */}
              <div className="relative">
                <Button 
                  variant="secondary"
                  size="sm"
                  onMouseEnter={() => setIsPlanningDropdownOpen(true)}
                  onMouseLeave={() => setIsPlanningDropdownOpen(false)}
                  className="flex items-center space-x-1"
                >
                  <span>Academic Planning</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                
                {isPlanningDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-[60]"
                    onMouseEnter={() => setIsPlanningDropdownOpen(true)}
                    onMouseLeave={() => setIsPlanningDropdownOpen(false)}
                  >
                    <div className="py-2">
                      {dashboardCategories.map((area) => (
                        <button
                          key={area.id}
                          onClick={() => {
                            setIsPlanningDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center space-x-2 text-foreground"
                        >
                          <area.icon className="h-4 w-4" />
                          <span>{area.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button variant="ghost" size="sm">
                Portfolio Scanner
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="hidden sm:flex">
                <Brain className="h-3 w-3 mr-1" />
                Strategic Planning
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Compact Dashboard Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Strategic Planning Dashboard</h1>
                <p className="text-xs text-muted-foreground">AI-powered academic and career optimization</p>
              </div>
            </div>
            <Button size="sm">
              <Target className="h-3 w-3 mr-2" />
              Start Planning
            </Button>
          </div>
        </div>
      </div>

      {/* Structured Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Dashboard Categories - Similar to Reference Design */}
          {dashboardCategories.map((category) => (
            <Card key={category.id} className="relative bg-card border border-border">
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-0">
                    {category.status}
                  </Badge>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-semibold text-foreground">{category.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${category.progress}%` }}
                    />
                  </div>
                </div>

                {/* Category Items List */}
                <div className="space-y-3 mb-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        item.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {item.completed ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          item.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Get Started Button */}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    className="w-full max-w-xs group hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default AcademicPlanningIntelligence;