import React, { useState } from 'react';
import { ExtracurricularOverview, ExtracurricularOverviewData } from './ExtracurricularOverview';
import { ExtracurricularDashboard } from './ExtracurricularDashboard';
import { ExtracurricularItem } from './ExtracurricularCard';
import { ExtracurricularModal } from './ExtracurricularModal';

interface ExtracurricularTabProps {
  overview: ExtracurricularOverviewData;
  activities: ExtracurricularItem[];
}

export const ExtracurricularTab: React.FC<ExtracurricularTabProps> = ({ overview, activities }) => {
  const [selectedActivity, setSelectedActivity] = useState<ExtracurricularItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewActivity = (activity: ExtracurricularItem) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Overview Hero */}
        <ExtracurricularOverview data={overview} activities={activities} />

        {/* Main Dashboard */}
        <div className="space-y-4">
          <ExtracurricularDashboard activities={activities} onViewActivity={handleViewActivity} />
        </div>
      </div>

      {/* Full-Page Analysis Modal */}
      <ExtracurricularModal
        activity={selectedActivity}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};
