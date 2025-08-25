import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BasicInfo } from '@/schemas/personal';

interface Props {
  data: BasicInfo;
  onUpdate: (updates: Partial<BasicInfo>) => void;
  onNext: () => void;
}

export default function NamesAndBirth({ data, onUpdate, onNext }: Props) {
  const navigate = useNavigate();

  const updateField = (field: keyof BasicInfo, value: string) => {
    onUpdate({ [field]: value });
  };

  const canContinue = data.legalFirstName && data.legalLastName && data.dateOfBirth;

  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/personal-info')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">Names & Birth Date</h1>
          <p className="text-muted-foreground mb-4">
            Step 1 of 4: Legal names and date of birth
          </p>
          
          <Progress value={25} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Legal Names
              <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="legal-first">Legal First Name *</Label>
                <Input
                  id="legal-first"
                  value={data.legalFirstName}
                  onChange={(e) => updateField('legalFirstName', e.target.value)}
                  placeholder="Enter your legal first name"
                />
              </div>
              <div>
                <Label htmlFor="legal-last">Legal Last Name *</Label>
                <Input
                  id="legal-last"
                  value={data.legalLastName}
                  onChange={(e) => updateField('legalLastName', e.target.value)}
                  placeholder="Enter your legal last name"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferred-name">Preferred Name</Label>
                <Input
                  id="preferred-name"
                  value={data.preferredName || ''}
                  onChange={(e) => updateField('preferredName', e.target.value)}
                  placeholder="If different from legal name"
                />
              </div>
              <div>
                <Label htmlFor="former-names">Former Legal Names</Label>
                <Input
                  id="former-names"
                  value={data.formerLegalNames || ''}
                  onChange={(e) => updateField('formerLegalNames', e.target.value)}
                  placeholder="Any previous legal names"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => updateField('dateOfBirth', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/personal-info')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canContinue}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}