import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Save } from 'lucide-react';
import { BasicInfo } from '@/schemas/personal';

interface Props {
  data: BasicInfo;
  onUpdate: (updates: Partial<BasicInfo>) => void;
  onSave: () => void;
  onBack: () => void;
  submitting: boolean;
}

export default function IdentityInfo({ data, onUpdate, onSave, onBack, submitting }: Props) {
  const updateField = (field: keyof BasicInfo, value: string) => {
    onUpdate({ [field]: value });
  };

  const canContinue = data.genderIdentity && data.pronouns;

  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Identity</h1>
          <p className="text-muted-foreground mb-4">
            Step 4 of 4: Gender identity and pronouns
          </p>
          
          <Progress value={100} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Identity
              <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Gender Identity *</Label>
              <RadioGroup 
                value={data.genderIdentity} 
                onValueChange={(value) => updateField('genderIdentity', value)}
                className="mt-2"
              >
                {[
                  { value: 'female', label: 'Female' },
                  { value: 'male', label: 'Male' },
                  { value: 'non-binary', label: 'Non-binary' },
                  { value: 'self-describe', label: 'Self-describe' },
                  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                ].map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`gender-${option.value}`} />
                    <Label htmlFor={`gender-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {data.genderIdentity === 'self-describe' && (
                <Input
                  className="mt-2"
                  value={data.genderSelfDescribe || ''}
                  onChange={(e) => updateField('genderSelfDescribe', e.target.value)}
                  placeholder="Please specify"
                />
              )}
            </div>

            <div>
              <Label>Pronouns *</Label>
              <RadioGroup 
                value={data.pronouns} 
                onValueChange={(value) => updateField('pronouns', value)}
                className="mt-2"
              >
                {[
                  { value: 'she-her', label: 'She/Her' },
                  { value: 'he-him', label: 'He/Him' },
                  { value: 'they-them', label: 'They/Them' },
                  { value: 'other', label: 'Other/Self-describe' },
                  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                ].map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`pronouns-${option.value}`} />
                    <Label htmlFor={`pronouns-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {data.pronouns === 'other' && (
                <Input
                  className="mt-2"
                  value={data.pronounsSelfDescribe || ''}
                  onChange={(e) => updateField('pronounsSelfDescribe', e.target.value)}
                  placeholder="Please specify your pronouns"
                />
              )}
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
            onClick={onSave}
            disabled={!canContinue || submitting}
          >
            <Save className="h-4 w-4 mr-2" />
            {submitting ? 'Saving...' : 'Save & Complete'}
          </Button>
        </div>
      </div>
    </div>
  );
}