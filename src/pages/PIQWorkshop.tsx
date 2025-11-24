import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Sparkles, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PIQWorkshopIntegrated } from '@/components/portfolio/piq/workshop/PIQWorkshopIntegrated';

export default function PIQWorkshop() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [essayText, setEssayText] = useState('');
  const [showWorkshop, setShowWorkshop] = useState(false);

  const UC_PIQ_PROMPTS = [
    {
      id: 'piq1',
      number: 1,
      title: 'Leadership Experience',
      prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.',
      placeholder: 'Share a specific leadership moment where you made a real impact...'
    },
    {
      id: 'piq2',
      number: 2,
      title: 'Creative Side',
      prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.',
      placeholder: 'Describe a time when you expressed your creativity...'
    },
    {
      id: 'piq3',
      number: 3,
      title: 'Greatest Talent or Skill',
      prompt: 'What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?',
      placeholder: 'What skill defines you, and how have you honed it?...'
    },
    {
      id: 'piq4',
      number: 4,
      title: 'Educational Opportunity or Barrier',
      prompt: 'Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.',
      placeholder: 'Share how you seized an opportunity or overcame a challenge...'
    },
    {
      id: 'piq5',
      number: 5,
      title: 'Significant Challenge',
      prompt: 'Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement?',
      placeholder: 'What challenge tested you most, and how did you grow?...'
    },
    {
      id: 'piq6',
      number: 6,
      title: 'Inspiring Academic Subject',
      prompt: 'Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom.',
      placeholder: 'What subject fascinates you, and how have you explored it?...'
    },
    {
      id: 'piq7',
      number: 7,
      title: 'Community Contribution',
      prompt: 'What have you done to make your school or your community a better place?',
      placeholder: 'Describe a specific way you improved your community...'
    },
    {
      id: 'piq8',
      number: 8,
      title: 'What Sets You Apart',
      prompt: 'Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?',
      placeholder: 'What unique perspective or experience do you bring?...'
    }
  ];

  const handleStartAnalysis = () => {
    if (essayText.trim().length > 0) {
      setShowWorkshop(true);
    }
  };

  const handleBack = () => {
    setShowWorkshop(false);
  };

  // If workshop is active, show the integrated workshop component
  if (showWorkshop && selectedPrompt) {
    const prompt = UC_PIQ_PROMPTS.find(p => p.id === selectedPrompt);
    return (
      <div className="min-h-screen bg-background">
        <PIQWorkshopIntegrated
          initialText={essayText}
          promptTitle={prompt?.title || ''}
          promptText={prompt?.prompt || ''}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Prompt selection or essay input screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                PIQ Narrative Workshop
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedPrompt ? (
          // Prompt Selection Screen
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <FileText className="w-4 h-4" />
                UC Personal Insight Questions
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Choose Your PIQ Prompt
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select which Personal Insight Question you're working on. Our AI will provide tailored analysis
                and coaching specifically for that prompt's requirements.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {UC_PIQ_PROMPTS.map((piq) => (
                <Card
                  key={piq.id}
                  className="p-6 cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group"
                  onClick={() => setSelectedPrompt(piq.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="text-xl font-bold">{piq.number}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {piq.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {piq.prompt}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Essay Input Screen
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedPrompt(null);
                  setEssayText('');
                }}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Prompt
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {UC_PIQ_PROMPTS.find(p => p.id === selectedPrompt)?.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">
                      {UC_PIQ_PROMPTS.find(p => p.id === selectedPrompt)?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      350 words maximum
                    </p>
                  </div>
                </div>
                <Card className="p-4 bg-slate-50 dark:bg-slate-900/50">
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {UC_PIQ_PROMPTS.find(p => p.id === selectedPrompt)?.prompt}
                  </p>
                </Card>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Essay</label>
                <Textarea
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder={UC_PIQ_PROMPTS.find(p => p.id === selectedPrompt)?.placeholder}
                  className="min-h-[400px] font-mono text-sm leading-relaxed"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {essayText.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  <span className={essayText.trim().split(/\s+/).filter(Boolean).length > 350 ? 'text-red-500 font-medium' : ''}>
                    {350 - essayText.trim().split(/\s+/).filter(Boolean).length} words remaining
                  </span>
                </div>
              </div>

              <Button
                onClick={handleStartAnalysis}
                disabled={essayText.trim().length === 0}
                className="w-full gap-2 text-lg py-6"
                size="lg"
              >
                <Sparkles className="w-5 h-5" />
                Analyze My PIQ Essay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
