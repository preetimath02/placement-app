import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { getHistory, deleteHistoryEntry } from '../services/historyStorage';
import { formatDate } from '../lib/utils';
import type { HistoryEntry } from '../types';
import { Building2, Briefcase, Trash2, ChevronRight } from 'lucide-react';

export function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this analysis?')) {
      deleteHistoryEntry(id);
      setHistory(getHistory());
    }
  };

  const handleView = (id: string) => {
    navigate(`/results?id=${id}`);
  };

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
          Analysis History
        </h2>
        <PremiumCard>
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">
              No analysis history yet.
            </p>
            <PremiumButton onClick={() => navigate('/analysis')}>
              Analyze Your First JD
            </PremiumButton>
          </div>
        </PremiumCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Analysis History
      </h2>
      
      <div className="space-y-4">
        {history.map((entry) => (
          <PremiumCard
            key={entry.id}
            className="cursor-pointer hover:border-accent/30 transition-all duration-150"
            onClick={() => handleView(entry.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="font-serif text-lg font-medium text-accent">
                    {entry.readinessScore}
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {entry.company && (
                      <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <Building2 size={14} />
                        {entry.company}
                      </span>
                    )}
                    {entry.role && (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Briefcase size={14} />
                        {entry.role}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(entry.createdAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDelete(entry.id, e)}
                  className="p-2 text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  <Trash2 size={18} />
                </button>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}
