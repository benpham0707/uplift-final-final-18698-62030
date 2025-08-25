import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { BasicInfo } from '@/schemas/personal';
import { useToast } from '@/hooks/use-toast';

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export default function BasicInformationWizard({ onComplete, onCancel }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<BasicInfo>({
    legalFirstName: '',
    legalLastName: '',
    dateOfBirth: '',
    primaryEmail: user?.email || '',
    primaryPhone: '',
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
    },
    genderIdentity: 'prefer-not-to-say' as any,
    pronouns: 'prefer-not-to-say' as any,
  });

  const [submitting, setSubmitting] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('personalInfoProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.basicInfo) {
          setData({ ...data, ...parsed.basicInfo });
        }
      } catch (e) {
        console.warn('Could not load saved data');
      }
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const saved = localStorage.getItem('personalInfoProgress') || '{}';
    try {
      const parsed = JSON.parse(saved);
      const updated = { ...parsed, basicInfo: data };
      localStorage.setItem('personalInfoProgress', JSON.stringify(updated));
    } catch (e) {
      localStorage.setItem('personalInfoProgress', JSON.stringify({ basicInfo: data }));
    }
  }, [data]);

  const updateData = (updates: Partial<BasicInfo>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const updateField = (field: keyof BasicInfo, value: string) => {
    updateData({ [field]: value });
  };

  const updateAddress = (field: keyof BasicInfo['permanentAddress'], value: string) => {
    updateData({ 
      permanentAddress: { ...data.permanentAddress, [field]: value } 
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setSubmitting(true);
    
    const saved = localStorage.getItem('personalInfoProgress') || '{}';
    try {
      const parsed = JSON.parse(saved);
      const updated = { 
        ...parsed, 
        basicInfo: data,
        basicCompleted: true
      };
      localStorage.setItem('personalInfoProgress', JSON.stringify(updated));
      
      toast({
        title: "Basic Information Saved",
        description: "Your basic information has been completed.",
      });
      
      onComplete();
    } catch (e) {
      toast({
        title: "Save Error", 
        description: "Could not save progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return "Names & Birth Date";
      case 1: return "Contact Information";
      case 2: return "Permanent Address";  
      case 3: return "Identity";
      default: return "Basic Information";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 0: return "Legal names and date of birth";
      case 1: return "Email and phone numbers";
      case 2: return "Your permanent address";
      case 3: return "Gender identity and pronouns";
      default: return "";
    }
  };

  const canContinue = () => {
    switch (currentStep) {
      case 0: return data.legalFirstName && data.legalLastName && data.dateOfBirth;
      case 1: return data.primaryEmail && data.primaryPhone;
      case 2: return data.permanentAddress.street && data.permanentAddress.city && 
                    data.permanentAddress.state && data.permanentAddress.zip && 
                    data.permanentAddress.country;
      case 3: return data.genderIdentity && data.pronouns;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
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
        );
      
      case 1:
        return (
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
        );
      
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Permanent Address
                <span className="text-destructive">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={data.permanentAddress.street}
                  onChange={(e) => updateAddress('street', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={data.permanentAddress.city}
                    onChange={(e) => updateAddress('city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={data.permanentAddress.state}
                    onChange={(e) => updateAddress('state', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code *</Label>
                  <Input
                    id="zip"
                    value={data.permanentAddress.zip}
                    onChange={(e) => updateAddress('zip', e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={data.permanentAddress.country}
                  onChange={(e) => updateAddress('country', e.target.value)}
                  placeholder="Country"
                />
              </div>
            </CardContent>
          </Card>
        );
      
      case 3:
        return (
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
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">{getStepTitle()}</h2>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Step {currentStep + 1} of 4: {getStepDescription()}
        </p>
        
        <Progress value={(currentStep + 1) * 25} className="h-2" />
      </div>

      {renderStepContent()}

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={currentStep === 0 ? onCancel : handleBack}
          disabled={submitting}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        
        {currentStep < 3 ? (
          <Button 
            onClick={handleNext}
            disabled={!canContinue()}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSave}
            disabled={!canContinue() || submitting}
          >
            <Save className="h-4 w-4 mr-2" />
            {submitting ? 'Saving...' : 'Complete Section'}
          </Button>
        )}
      </div>
    </div>
  );
}