import { PremiumCard } from '../components/ui/PremiumCard';
import { BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Study Materials',
    icon: BookOpen,
    items: [
      { title: 'DSA Cheat Sheet', type: 'PDF', description: 'Quick reference for common algorithms' },
      { title: 'System Design Primer', type: 'Guide', description: 'Fundamentals of scalable systems' },
      { title: 'Interview Patterns', type: 'PDF', description: 'Common coding interview patterns' },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    items: [
      { title: 'Dynamic Programming Masterclass', type: 'Video', description: '3-hour comprehensive guide' },
      { title: 'System Design Case Studies', type: 'Playlist', description: 'Real-world architecture examples' },
      { title: 'Behavioral Interview Prep', type: 'Video', description: 'STAR method explained' },
    ],
  },
  {
    category: 'Practice Platforms',
    icon: FileText,
    items: [
      { title: 'LeetCode Premium', type: 'Platform', description: 'Company-tagged problems' },
      { title: 'HackerRank', type: 'Platform', description: 'Skill certification tests' },
      { title: 'Pramp', type: 'Platform', description: 'Free mock interviews' },
    ],
  },
];

export function Resources() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Resources
      </h2>

      <div className="space-y-6">
        {resources.map((section) => (
          <PremiumCard key={section.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <section.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">
                {section.category}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="p-4 bg-muted/50 rounded-md cursor-pointer hover:bg-muted transition-colors duration-150 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                    <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                    {item.type}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}
