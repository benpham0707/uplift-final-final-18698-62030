import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { BasicInfo } from '@/schemas/personal';
import { useToast } from '@/hooks/use-toast';

export default function BasicInformation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
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

  // Update email when user changes
  useEffect(() => {
    if (user?.email) {
      setData(prev => ({ ...prev, primaryEmail: user.email! }));
    }
  }, [user?.email]);

  const updateField = (field: keyof BasicInfo, value: any) => {
    setData({ ...data, [field]: value });
  };

  const updateAddress = (field: keyof BasicInfo['permanentAddress'], value: string) => {
    setData({ 
      ...data, 
      permanentAddress: { ...data.permanentAddress, [field]: value } 
    });
  };

  const validateForm = () => {
    const required = {
      legalFirstName: data.legalFirstName,
      legalLastName: data.legalLastName,
      dateOfBirth: data.dateOfBirth,
      primaryEmail: data.primaryEmail,
      primaryPhone: data.primaryPhone,
      permanentAddress: data.permanentAddress,
      genderIdentity: data.genderIdentity,
      pronouns: data.pronouns,
    };
    
    return Object.values(required).every(val => {
      if (typeof val === 'object') {
        return Object.values(val).every(v => v && v.trim().length > 0);
      }
      return val && val.toString().trim().length > 0;
    });
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    // Mark as completed
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
        title: "Progress Saved",
        description: "Your basic information has been saved.",
      });
      
      navigate('/personal-info');
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

  const canContinue = validateForm();
  const completionProgress = Object.values(data).filter(val => {
    if (typeof val === 'object' && val !== null) {
      return Object.values(val).some(v => v && v.toString().trim().length > 0);
    }
    return val && val.toString().trim().length > 0;
  }).length / Object.keys(data).length * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/personal-info')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Basic Information</h1>
          <p className="text-muted-foreground mb-4">
            Core required information for your college applications
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <Progress value={completionProgress} className="flex-1 h-2" />
            <span className="text-sm text-muted-foreground">
              {Math.round(completionProgress)}% Complete
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Legal Names */}
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

          {/* Contact Information */}
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

          {/* Permanent Address */}
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

          {/* Identity */}
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
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/personal-info')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          
          <Button 
            onClick={handleSave}
            disabled={!canContinue || submitting}
          >
            <Save className="h-4 w-4 mr-2" />
            {submitting ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}