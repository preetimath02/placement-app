import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface SkillData {
  subject: string;
  score: number;
  fullMark: number;
}

interface SkillRadarChartProps {
  data?: SkillData[];
}

const defaultData: SkillData[] = [
  { subject: 'DSA', score: 75, fullMark: 100 },
  { subject: 'System Design', score: 60, fullMark: 100 },
  { subject: 'Communication', score: 80, fullMark: 100 },
  { subject: 'Resume', score: 85, fullMark: 100 },
  { subject: 'Aptitude', score: 70, fullMark: 100 },
];

export function SkillRadarChart({ data = defaultData }: SkillRadarChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#D4D0C8" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#6B6B6B', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#6B6B6B', fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#8B0000"
            strokeWidth={2}
            fill="#8B0000"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
