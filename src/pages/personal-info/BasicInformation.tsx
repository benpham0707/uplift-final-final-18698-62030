import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { BasicInfo } from '@/schemas/personal';
import { useToast } from '@/hooks/use-toast';
import NamesAndBirth from './basic/NamesAndBirth';
import ContactInfo from './basic/ContactInfo';
import AddressInfo from './basic/AddressInfo';
import IdentityInfo from './basic/IdentityInfo';

export default function BasicInformation() {
  const navigate = useNavigate();
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

  // Update email when user changes
  useEffect(() => {
    if (user?.email) {
      setData(prev => ({ ...prev, primaryEmail: user.email! }));
    }
  }, [user?.email]);

  const updateData = (updates: Partial<BasicInfo>) => {
    setData(prev => ({ ...prev, ...updates }));
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

  // Render the current step
  switch (currentStep) {
    case 0:
      return <NamesAndBirth data={data} onUpdate={updateData} onNext={handleNext} />;
    case 1:
      return <ContactInfo data={data} onUpdate={updateData} onNext={handleNext} onBack={handleBack} />;
    case 2:
      return <AddressInfo data={data} onUpdate={updateData} onNext={handleNext} onBack={handleBack} />;
    case 3:
      return <IdentityInfo data={data} onUpdate={updateData} onSave={handleSave} onBack={handleBack} submitting={submitting} />;
    default:
      return <NamesAndBirth data={data} onUpdate={updateData} onNext={handleNext} />;
  }
}