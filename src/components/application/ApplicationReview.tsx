import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { 
  PersonalBasicsData, 
  ExperiencesActivitiesData, 
  AcademicJourneyData,
  CommunityFamilyData,
  AwardsRecognitionData,
  PersonalGrowthData 
} from './types';

interface ApplicationReviewProps {
  personalBasics: PersonalBasicsData;
  experiencesActivities: ExperiencesActivitiesData;
  academicJourney: AcademicJourneyData;
  communityFamily: CommunityFamilyData;
  awardsRecognition: AwardsRecognitionData;
  personalGrowth: PersonalGrowthData;
}

export default function ApplicationReview({
  personalBasics,
  experiencesActivities,
  academicJourney,
  communityFamily,
  awardsRecognition,
  personalGrowth
}: ApplicationReviewProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Name:</span>
              <p className="text-sm">{personalBasics.firstName} {personalBasics.lastName}</p>
              {personalBasics.preferredName && (
                <p className="text-xs text-muted-foreground">Preferred: {personalBasics.preferredName}</p>
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Email:</span>
              <p className="text-sm">{personalBasics.email}</p>
            </div>
            {personalBasics.phone && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                <p className="text-sm">{personalBasics.phone}</p>
              </div>
            )}
            {personalBasics.dateOfBirth && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Date of Birth:</span>
                <p className="text-sm">{new Date(personalBasics.dateOfBirth).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          
          {(personalBasics.address.street || personalBasics.address.city) && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Address:</span>
              <p className="text-sm">
                {[
                  personalBasics.address.street,
                  personalBasics.address.city,
                  personalBasics.address.state,
                  personalBasics.address.zip,
                  personalBasics.address.country
                ].filter(Boolean).join(', ')}
              </p>
            </div>
          )}

          {personalBasics.demographics.ethnicity.length > 0 && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Ethnicity:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {personalBasics.demographics.ethnicity.map((ethnicity) => (
                  <Badge key={ethnicity} variant="secondary" className="text-xs">
                    {ethnicity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {personalBasics.demographics.languages.length > 0 && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Languages:</span>
              <p className="text-sm">{personalBasics.demographics.languages.join(', ')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Current School:</span>
            <p className="text-sm">{academicJourney.currentSchool.name}</p>
            {academicJourney.currentSchool.city && (
              <p className="text-xs text-muted-foreground">
                {academicJourney.currentSchool.city}, {academicJourney.currentSchool.state}
              </p>
            )}
          </div>

          {academicJourney.gpa.value && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">GPA:</span>
              <p className="text-sm">
                {academicJourney.gpa.value} / {academicJourney.gpa.scale}
                {academicJourney.gpa.weighted && ' (Weighted)'}
              </p>
            </div>
          )}

          {(academicJourney.testScores.sat?.score || academicJourney.testScores.act?.score) && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Test Scores:</span>
              <div className="space-y-1">
                {academicJourney.testScores.sat?.score && (
                  <p className="text-sm">SAT: {academicJourney.testScores.sat.score}</p>
                )}
                {academicJourney.testScores.act?.score && (
                  <p className="text-sm">ACT: {academicJourney.testScores.act.score}</p>
                )}
              </div>
            </div>
          )}

          {academicJourney.coursework.apCourses.length > 0 && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">AP Courses:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {academicJourney.coursework.apCourses.map((course, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activities & Experiences */}
      {experiencesActivities.activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activities & Experiences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experiencesActivities.activities.map((activity) => (
                <div key={activity.id} className="border-l-2 border-primary/20 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{activity.name}</h4>
                      {activity.organization && (
                        <p className="text-xs text-muted-foreground">{activity.organization}</p>
                      )}
                      {activity.position && (
                        <p className="text-xs text-muted-foreground">Position: {activity.position}</p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.hoursPerWeek}h/week, {activity.weeksPerYear} weeks/year
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {experiencesActivities.workExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experiencesActivities.workExperience.map((work) => (
                <div key={work.id} className="border-l-2 border-secondary/20 pl-4">
                  <h4 className="text-sm font-medium">{work.position}</h4>
                  <p className="text-xs text-muted-foreground">{work.employer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{work.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {work.startDate} - {work.endDate || 'Present'} | {work.hoursPerWeek}h/week
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Awards & Recognition */}
      {awardsRecognition.awards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Awards & Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {awardsRecognition.awards.map((award) => (
                <div key={award.id} className="border-l-2 border-accent/20 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{award.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {award.category}
                      </Badge>
                    </div>
                    <Badge variant={award.type === 'academic' ? 'default' : 'secondary'} className="text-xs">
                      {award.type}
                    </Badge>
                  </div>
                  {award.levelOfRecognition.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Recognition Level: {award.levelOfRecognition.join(', ')}
                    </p>
                  )}
                  {award.description && (
                    <p className="text-xs text-muted-foreground mt-1">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Essays */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Essays & Personal Statements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalGrowth.essays.personalStatement && (
            <div>
              <h4 className="text-sm font-medium mb-2">Personal Statement</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {personalGrowth.essays.personalStatement.length > 200 
                  ? personalGrowth.essays.personalStatement.substring(0, 200) + '...'
                  : personalGrowth.essays.personalStatement
                }
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {personalGrowth.essays.personalStatement.split(' ').length} words
              </p>
            </div>
          )}

          {Object.entries(personalGrowth.essays).map(([key, value]) => {
            if (key === 'personalStatement' || !value) return null;
            const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            return (
              <div key={key}>
                <Separator className="my-3" />
                <h4 className="text-sm font-medium mb-2">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {value.length > 200 ? value.substring(0, 200) + '...' : value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {value.split(' ').length} words
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}