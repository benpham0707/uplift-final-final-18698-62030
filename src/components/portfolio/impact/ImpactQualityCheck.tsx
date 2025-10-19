import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { QualityRadarChart } from './QualityRadarChart';
import { cn } from '@/lib/utils';

export interface QualityDimension {
  id: string;
  name: string;
  score: number; // 0-10
  explanation: string;
  suggestion?: string;
  status: 'strong' | 'good' | 'needs-work';
  // New: expandable insight content
  drivers?: string[]; // Why you got this score
  improvements?: string[]; // How to raise this score
}

interface ImpactQualityCheckProps {
  dimensions: QualityDimension[];
  overallAssessment: string;
}

const statusConfig = {
  'strong': { 
    icon: CheckCircle, 
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  'good': { 
    icon: Info, 
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  'needs-work': { 
    icon: AlertCircle, 
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
};

export const ImpactQualityCheck: React.FC<ImpactQualityCheckProps> = ({ 
  dimensions, 
  overallAssessment 
}) => {
  return (
    <Card className="border-primary/20">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {overallAssessment}
          </p>
        </div>

        {/* Radar Chart and Dimensions Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="flex items-center justify-center">
            <QualityRadarChart dimensions={dimensions} />
          </div>

          {/* Dimensions List */}
          <div className="space-y-3">
            <Accordion type="single" collapsible className="w-full">
              {dimensions.map((dimension) => {
                const StatusIcon = statusConfig[dimension.status].icon;
                const percentage = (dimension.score / 10) * 100;

                return (
                  <AccordionItem key={dimension.id} value={dimension.id} className="border rounded-lg">
                    <AccordionTrigger className={cn(
                      "px-3",
                      statusConfig[dimension.status].bgColor,
                      statusConfig[dimension.status].borderColor,
                      "rounded-lg"
                    )}>
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={cn("w-4 h-4", statusConfig[dimension.status].color)} />
                            <h4 className="text-sm font-semibold text-foreground">{dimension.name}</h4>
                          </div>
                          <div className="text-sm font-bold text-foreground">{dimension.score}/10</div>
                        </div>
                        <div className="mt-2">
                          <Progress value={percentage} className="h-1.5" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">{dimension.explanation}</p>
                        {dimension.suggestion && (
                          <div className="p-3 rounded-md bg-primary/5 border border-primary/10">
                            <div className="text-xs font-semibold text-foreground mb-1">Suggestion</div>
                            <p className="text-xs text-muted-foreground">{dimension.suggestion}</p>
                          </div>
                        )}
                        {dimension.drivers && dimension.drivers.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-foreground mb-1">Why you got this score</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              {dimension.drivers.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {dimension.improvements && dimension.improvements.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-foreground mb-1">How to improve</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              {dimension.improvements.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};