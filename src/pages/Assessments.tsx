import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

const upcomingAssessments = [
  {
    title: 'DSA Mock Test',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '90 minutes',
    type: 'Technical',
  },
  {
    title: 'System Design Review',
    date: 'Wednesday',
    time: '2:00 PM',
    duration: '60 minutes',
    type: 'Technical',
  },
  {
    title: 'HR Interview Prep',
    date: 'Friday',
    time: '11:00 AM',
    duration: '45 minutes',
    type: 'Behavioral',
  },
];

const pastAssessments = [
  {
    title: 'Aptitude Test',
    date: 'Last week',
    score: '85%',
    status: 'Passed',
  },
  {
    title: 'Coding Challenge',
    date: '2 weeks ago',
    score: '72%',
    status: 'Passed',
  },
];

export function Assessments() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Assessments
      </h2>

      {/* Upcoming */}
      <PremiumCard>
        <h3 className="font-serif text-lg font-medium text-foreground mb-4">
          Upcoming
        </h3>
        <div className="space-y-4">
          {upcomingAssessments.map((assessment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-md"
            >
              <div>
                <h4 className="font-medium text-foreground">{assessment.title}</h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {assessment.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {assessment.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                  {assessment.type}
                </span>
                <PremiumButton size="sm">
                  <ArrowRight size={16} />
                </PremiumButton>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>

      {/* Past Assessments */}
      <PremiumCard>
        <h3 className="font-serif text-lg font-medium text-foreground mb-4">
          Past Assessments
        </h3>
        <div className="space-y-4">
          {pastAssessments.map((assessment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-md"
            >
              <div>
                <h4 className="font-medium text-foreground">{assessment.title}</h4>
                <p className="text-sm text-muted-foreground">{assessment.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">{assessment.score}</span>
                <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                  {assessment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
