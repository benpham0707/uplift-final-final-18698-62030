import { useNavigate } from 'react-router-dom';
import BasicInformationWizard from '@/components/portfolio/BasicInformationWizard';

export default function BasicInformation() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BasicInformationWizard 
          onComplete={() => navigate('/personal-info')}
          onCancel={() => navigate('/personal-info')}
        />
      </div>
    </div>
  );
}