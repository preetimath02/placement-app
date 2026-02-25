import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PremiumCard } from '../components/ui/PremiumCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { analyzeJD } from '../services/analysisGenerator';
import { saveAnalysis } from '../services/historyStorage';
import { AlertCircle } from 'lucide-react';

export function Analysis() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      return;
    }

    if (jdText.length < 200) {
      setShowWarning(true);
      return;
    }

    setIsAnalyzing(true);
    setShowWarning(false);

    // Perform analysis
    const result = analyzeJD(jdText, company, role);
    
    // Save to history
    const entry = saveAnalysis(company, role, jdText, result);
    
    // Navigate to results
    navigate(`/results?id=${entry.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Analyze Job Description
      </h2>
      
      <PremiumCard>
        <div className="space-y-6">
          {/* Company Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Name <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Amazon, StartupXYZ"
              className="w-full px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-150"
            />
          </div>

          {/* Role Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer, Full Stack Developer"
              className="w-full px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-150"
            />
          </div>

          {/* JD Textarea */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Description <span className="text-accent">*</span>
            </label>
            <textarea
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
                if (e.target.value.length >= 200) {
                  setShowWarning(false);
                }
              }}
              placeholder="Paste the full job description here..."
              rows={12}
              className="w-full px-4 py-3 border border-border rounded-md bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-150 resize-none"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {jdText.length} characters
              </span>
              {jdText.length > 800 && (
                <span className="text-xs text-success">
                  Detailed JD detected (+10 readiness points)
                </span>
              )}
            </div>
          </div>

          {/* Warning */}
          {showWarning && (
            <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-md">
              <AlertCircle size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                This JD is too short to analyze deeply. Paste full JD for better output.
              </p>
            </div>
          )}

          {/* Analyze Button */}
          <PremiumButton
            onClick={handleAnalyze}
            disabled={!jdText.trim() || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </PremiumButton>
        </div>
      </PremiumCard>
    </div>
  );
}
