import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BasicInfo } from '@/schemas/personal';

interface Props {
  data: BasicInfo;
  onUpdate: (updates: Partial<BasicInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ContactInfo({ data, onUpdate, onNext, onBack }: Props) {
  const updateField = (field: keyof BasicInfo, value: string) => {
    onUpdate({ [field]: value });
  };

  const canContinue = data.primaryEmail && data.primaryPhone;

  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Contact Information</h1>
          <p className="text-muted-foreground mb-4">
            Step 2 of 4: Email and phone numbers
          </p>
          
          <Progress value={50} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Contact Information
              <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary-email">Primary Email *</Label>
                <Input
                  id="primary-email"
                  type="email"
                  value={data.primaryEmail}
                  onChange={(e) => updateField('primaryEmail', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="primary-phone">Primary Phone *</Label>
                <Input
                  id="primary-phone"
                  type="tel"
                  value={data.primaryPhone}
                  onChange={(e) => updateField('primaryPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary-phone">Secondary Phone</Label>
              <Input
                id="secondary-phone"
                type="tel"
                value={data.secondaryPhone || ''}
                onChange={(e) => updateField('secondaryPhone', e.target.value)}
                placeholder="Optional second phone number"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
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