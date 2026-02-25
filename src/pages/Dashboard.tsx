import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { CircularProgress } from '../components/dashboard/CircularProgress';
import { SkillRadarChart } from '../components/dashboard/RadarChart';
import { ProgressBar } from '../components/dashboard/ProgressBar';
import { DayActivity } from '../components/dashboard/DayActivity';
import { Clock } from 'lucide-react';

const weeklyDays = [
  { day: 'Mon', active: true },
  { day: 'Tue', active: true },
  { day: 'Wed', active: true },
  { day: 'Thu', active: false },
  { day: 'Fri', active: true },
  { day: 'Sat', active: false },
  { day: 'Sun', active: false },
];

const upcomingAssessments = [
  { name: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
  { name: 'System Design Review', time: 'Wed, 2:00 PM' },
  { name: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Dashboard
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <PremiumCard>
          <h3 className="font-serif text-lg font-medium text-foreground mb-6">
            Overall Readiness
          </h3>
          <div className="flex justify-center">
            <CircularProgress value={72} max={100} />
          </div>
        </PremiumCard>

        {/* Skill Breakdown */}
        <PremiumCard>
          <h3 className="font-serif text-lg font-medium text-foreground mb-6">
            Skill Breakdown
          </h3>
          <SkillRadarChart />
        </PremiumCard>

        {/* Continue Practice */}
        <PremiumCard>
          <h3 className="font-serif text-lg font-medium text-foreground mb-4">
            Continue Practice
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-foreground font-medium mb-1">Dynamic Programming</p>
              <p className="text-sm text-muted-foreground mb-4">
                Master advanced DP patterns and optimization techniques
              </p>
            </div>
            <ProgressBar current={3} total={10} label="Problems completed" />
            <PremiumButton className="w-full mt-4">
              Continue
            </PremiumButton>
          </div>
        </PremiumCard>

        {/* Weekly Goals */}
        <PremiumCard>
          <h3 className="font-serif text-lg font-medium text-foreground mb-4">
            Weekly Goals
          </h3>
          <div className="space-y-6">
            <ProgressBar 
              current={12} 
              total={20} 
              label="Problems Solved: 12/20 this week" 
            />
            <DayActivity days={weeklyDays} />
          </div>
        </PremiumCard>

        {/* Upcoming Assessments */}
        <PremiumCard className="lg:col-span-2">
          <h3 className="font-serif text-lg font-medium text-foreground mb-4">
            Upcoming Assessments
          </h3>
          <div className="space-y-4">
            {upcomingAssessments.map((assessment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-md"
              >
                <span className="font-medium text-foreground">{assessment.name}</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  {assessment.time}
                </div>
              </div>
            ))}
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
