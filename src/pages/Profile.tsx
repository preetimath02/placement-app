import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { User, Mail, Building2, GraduationCap, Edit2 } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Profile
      </h2>

      {/* Profile Header */}
      <PremiumCard>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
            <User size={40} className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-medium text-foreground">
              John Doe
            </h3>
            <p className="text-muted-foreground">Software Engineer</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                john.doe@example.com
              </span>
              <span className="flex items-center gap-1">
                <Building2 size={14} />
                San Francisco, CA
              </span>
            </div>
          </div>
          <PremiumButton variant="secondary">
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </PremiumButton>
        </div>
      </PremiumCard>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumCard>
          <div className="text-center">
            <p className="text-3xl font-serif font-medium text-accent">156</p>
            <p className="text-sm text-muted-foreground mt-1">Problems Solved</p>
          </div>
        </PremiumCard>
        <PremiumCard>
          <div className="text-center">
            <p className="text-3xl font-serif font-medium text-accent">12</p>
            <p className="text-sm text-muted-foreground mt-1">Mock Interviews</p>
          </div>
        </PremiumCard>
        <PremiumCard>
          <div className="text-center">
            <p className="text-3xl font-serif font-medium text-accent">8</p>
            <p className="text-sm text-muted-foreground mt-1">JD Analyses</p>
          </div>
        </PremiumCard>
      </div>

      {/* Education & Experience */}
      <PremiumCard>
        <h3 className="font-serif text-lg font-medium text-foreground mb-4">
          Education
        </h3>
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
          <GraduationCap size={20} className="text-accent mt-0.5" />
          <div>
            <p className="font-medium text-foreground">B.Tech in Computer Science</p>
            <p className="text-sm text-muted-foreground">Stanford University</p>
            <p className="text-xs text-muted-foreground">2018 - 2022</p>
          </div>
        </div>
      </PremiumCard>

      {/* Skills */}
      <PremiumCard>
        <h3 className="font-serif text-lg font-medium text-foreground mb-4">
          Top Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
