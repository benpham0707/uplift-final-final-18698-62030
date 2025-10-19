import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Initiative } from './ImpactLedger';
import { ImpactScoreHero } from './ImpactScoreHero';
import { GrowthOpportunityCard } from './GrowthOpportunityCard';
import {
  Users,
  Calendar,
  Target,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Building2,
  Sparkles,
  Box,
  Brain,
  Lightbulb,
  Telescope,
  RotateCcw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface InitiativeModalProps {
  initiative: Initiative | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  'ongoing': { label: 'Ongoing', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  'handed-off': { label: 'Handed Off', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  'completed': { label: 'Completed', color: 'bg-muted text-muted-foreground border-border' },
};

const reframingIcons: { [key: string]: React.ReactNode } = {
  '🏗️': '🏗️',
  '🔄': '🔄',
  '📈': '📈',
  '💎': '💎',
};

export const InitiativeModal: React.FC<InitiativeModalProps> = ({ initiative, isOpen, onClose }) => {
  if (!initiative) return null;

  const statusStyle = statusConfig[initiative.durability.status];

  const getStatusIcon = (status: 'strong' | 'developing' | 'opportunity') => {
    if (status === 'strong') return { icon: CheckCircle, color: 'text-emerald-500' };
    if (status === 'developing') return { icon: Clock, color: 'text-amber-500' };
    return { icon: Sparkles, color: 'text-purple-500' };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
              {initiative.name}
            </DialogTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn("text-xs", statusStyle.color)}>{statusStyle.label}</Badge>
              <Separator orientation="vertical" className="h-4" />
              <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="line-clamp-1">{initiative.beneficiary.who}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {initiative.timeSpan.start}
                  <ArrowRight className="inline w-3 h-3 mx-1 text-muted-foreground" />
                  {initiative.timeSpan.end || 'Present'}
                </span>
                <span className="ml-1 text-muted-foreground">({initiative.timeSpan.duration})</span>
              </div>
              {typeof initiative.resources.volunteers === 'number' && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{initiative.resources.volunteers} volunteers</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Initiative Impact Score */}
          {initiative.impactScore && (
            <ImpactScoreHero 
              score={initiative.impactScore.overall}
              assessment={initiative.impactScore.assessment}
            />
          )}

          {/* What You Actually Built */}
          {initiative.reframing?.whatYouActuallyBuilt && initiative.reframing.whatYouActuallyBuilt.length > 0 && (
            <section aria-labelledby="reframing-heading" className="rounded-lg border p-6 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 id="reframing-heading" className="text-lg font-bold">What You Actually Built</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You didn't just run a program—here's what you really accomplished in sophisticated terms:
              </p>
              <div className="space-y-4">
                {initiative.reframing.whatYouActuallyBuilt.map((item, idx) => (
                  <div key={idx} className="rounded-md border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl" role="img" aria-label={item.title}>
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section aria-labelledby="beneficiaries-heading" className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <h3 id="beneficiaries-heading" className="text-sm font-semibold">Beneficiaries</h3>
              </div>
              <p className="text-sm text-foreground">{initiative.beneficiary.who}</p>
              {initiative.beneficiary.demographics && (
                <p className="text-sm text-muted-foreground mt-1">{initiative.beneficiary.demographics}</p>
              )}
            </section>
          </div>

          <section aria-labelledby="outcomes-heading" className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <h3 id="outcomes-heading" className="text-sm font-semibold">Outcomes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">{initiative.outcome.primary}</p>
                {initiative.outcome.secondary && initiative.outcome.secondary.length > 0 && (
                  <ul className="space-y-1">
                    {initiative.outcome.secondary.map((outcome, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Evidence</div>
                {initiative.outcome.evidence.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {initiative.outcome.evidence.map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                        target={link.startsWith('http') ? '_blank' : '_self'}
                        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <Sparkles className="w-3 h-3" /> Evidence {idx + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">No evidence linked</div>
                )}
              </div>
            </div>
          </section>

          <section aria-labelledby="resources-heading" className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-primary" />
              <h3 id="resources-heading" className="text-sm font-semibold">Resources</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Box className="w-4 h-4" />
                  <span className="font-medium text-foreground">Funding</span>
                </div>
                <div className="text-muted-foreground">
                  {initiative.resources.funding || '—'}
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium text-foreground">Partners</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {initiative.resources.partners.map((p, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{p}</Badge>
                  ))}
                  {initiative.resources.partners.length === 0 && (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              </div>
              {typeof initiative.resources.volunteers === 'number' && (
                <div className="space-y-1 md:col-span-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-medium text-foreground">Volunteers</span>
                  </div>
                  <div className="text-muted-foreground">{initiative.resources.volunteers}</div>
                </div>
              )}
            </div>
          </section>

          {initiative.durability.successor && (
            <section aria-labelledby="sustainability-heading" className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <h3 id="sustainability-heading" className="text-sm font-semibold">Sustainability</h3>
              </div>
              <p className="text-sm text-muted-foreground">{initiative.durability.successor}</p>
            </section>
          )}

          {/* Impact Analysis */}
          {initiative.impactScore?.dimensions && initiative.impactScore.dimensions.length > 0 && (
            <section aria-labelledby="analysis-heading" className="rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 id="analysis-heading" className="text-lg font-bold">Impact Analysis & Reflection</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A comprehensive breakdown analyzing what makes this initiative impactful across multiple dimensions.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                {initiative.impactScore.dimensions.map((dim) => {
                  const StatusIcon = getStatusIcon(dim.status);
                  return (
                    <AccordionItem key={dim.id} value={dim.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            <StatusIcon.icon className={`w-4 h-4 ${StatusIcon.color}`} />
                            <span className="font-semibold">{dim.name}</span>
                          </div>
                          <Badge variant="outline" className="ml-auto mr-4">
                            {dim.score.toFixed(1)}/10
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4 pb-2 px-1 space-y-4">
                          <Progress value={dim.score * 10} className="h-2" />
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Assessment</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {dim.assessment}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Evidence</p>
                            <p className="text-sm text-muted-foreground italic">
                              {dim.evidence}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>
          )}

          {/* Leadership & Strategic Thinking */}
          {initiative.leadershipSkills && initiative.leadershipSkills.length > 0 && (
            <section aria-labelledby="leadership-heading" className="rounded-lg border p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 id="leadership-heading" className="text-lg font-bold">Leadership & Strategic Thinking Demonstrated</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The sophisticated skills you actually used to make this initiative successful:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initiative.leadershipSkills.map((skill, idx) => (
                  <div key={idx} className="rounded-md border bg-card p-4">
                    <h4 className="font-semibold text-sm mb-2 text-primary">{skill.skill}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Impressive Angles */}
          {initiative.impressiveAngles && initiative.impressiveAngles.length > 0 && (
            <section aria-labelledby="angles-heading" className="rounded-lg border p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="flex items-center gap-2 mb-4">
                <Telescope className="w-5 h-5 text-primary" />
                <h3 id="angles-heading" className="text-lg font-bold">Impressive Angles You May Not Have Considered</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Here's your work viewed through different sophisticated lenses:
              </p>
              <div className="space-y-3">
                {initiative.impressiveAngles.map((angle, idx) => (
                  <div key={idx} className="rounded-md border bg-card p-4">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <span className="text-primary">{angle.lens}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{angle.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* What This Experience Taught You */}
          {initiative.lessonsLearned && initiative.lessonsLearned.length > 0 && (
            <section aria-labelledby="lessons-heading" className="rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h3 id="lessons-heading" className="text-lg font-bold">What This Experience Taught You</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Deep reflection on personal growth and lessons learned:
              </p>
              <div className="space-y-3">
                {initiative.lessonsLearned.map((lesson, idx) => (
                  <div key={idx} className="rounded-md border-l-4 border-primary bg-primary/5 p-4">
                    <h4 className="font-semibold text-sm mb-2">{lesson.lesson}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Retrospective Wisdom */}
          {initiative.retrospective && (
            <section aria-labelledby="retrospective-heading" className="rounded-lg border p-6 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20">
              <div className="flex items-center gap-2 mb-4">
                <RotateCcw className="w-5 h-5 text-primary" />
                <h3 id="retrospective-heading" className="text-lg font-bold">If You Could Do It Again...</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Retrospective analysis showing sophisticated thinking about what worked and what you'd improve:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">WHAT YOU'D KEEP</h4>
                  <ul className="space-y-1.5">
                    {initiative.retrospective.whatToKeep.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400">WHAT YOU'D ADD</h4>
                  <ul className="space-y-1.5">
                    {initiative.retrospective.whatToAdd.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Sparkles className="w-3 h-3 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-amber-600 dark:text-amber-400">WHAT YOU'D DO DIFFERENTLY</h4>
                  <ul className="space-y-1.5">
                    {initiative.retrospective.whatToDoDifferently.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 mt-0.5 text-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Growth Opportunities */}
          {initiative.growthOpportunities && initiative.growthOpportunities.length > 0 && (
            <section aria-labelledby="growth-heading" className="rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 id="growth-heading" className="text-lg font-bold">Take It Further: Growth Opportunities</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Concrete, specific recommendations for amplifying this initiative's impact even more:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initiative.growthOpportunities.map((opp) => (
                  <GrowthOpportunityCard
                    key={opp.id}
                    category={opp.category}
                    title={opp.title}
                    rationale={opp.rationale}
                    steps={opp.steps}
                    effort={opp.effort}
                    impact={opp.impact}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
