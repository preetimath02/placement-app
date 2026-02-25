import { useNavigate } from 'react-router-dom';
import { PremiumButton } from '../components/ui/PremiumButton';
import { PremiumCard } from '../components/ui/PremiumCard';
import { Code2, Video, BarChart3 } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-6 py-24 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-6 tracking-tight">
          Ace Your Placement
        </h1>
        <p className="text-xl text-muted-foreground max-w-text mx-auto mb-10 leading-relaxed">
          Practice, assess, and prepare for your dream job
        </p>
        <PremiumButton size="lg" onClick={() => navigate('/dashboard')}>
          Get Started
        </PremiumButton>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard padding="lg">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Code2 size={24} className="text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                Practice Problems
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Solve curated coding challenges to strengthen your problem-solving skills
              </p>
            </PremiumCard>

            <PremiumCard padding="lg">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Video size={24} className="text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                Mock Interviews
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Simulate real interview scenarios with AI-powered feedback
              </p>
            </PremiumCard>

            <PremiumCard padding="lg">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <BarChart3 size={24} className="text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                Track Progress
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor your readiness with detailed analytics and insights
              </p>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KodNest Premium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
