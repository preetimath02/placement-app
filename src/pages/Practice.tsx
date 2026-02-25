import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { Code2, BookOpen, Trophy } from 'lucide-react';

const practiceCategories = [
  {
    title: 'Data Structures',
    description: 'Arrays, Linked Lists, Trees, Graphs, and more',
    problems: 150,
    completed: 45,
    icon: Code2,
  },
  {
    title: 'Algorithms',
    description: 'Sorting, Searching, Dynamic Programming',
    problems: 120,
    completed: 32,
    icon: BookOpen,
  },
  {
    title: 'System Design',
    description: 'Scalable architecture and design patterns',
    problems: 50,
    completed: 12,
    icon: Trophy,
  },
];

export function Practice() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Practice Problems
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceCategories.map((category) => (
          <PremiumCard key={category.title}>
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <category.icon size={24} className="text-accent" />
            </div>
            <h3 className="font-serif text-lg font-medium text-foreground mb-2">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {category.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                {category.completed}/{category.problems} completed
              </span>
              <span className="text-sm font-medium text-accent">
                {Math.round((category.completed / category.problems) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${(category.completed / category.problems) * 100}%` }}
              />
            </div>
            <PremiumButton className="w-full">
              Start Practice
            </PremiumButton>
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}
