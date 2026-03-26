interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

export default function StatCard({ label, value, change, changeType = 'neutral', icon }: StatCardProps) {
  const changeColor = {
    positive: 'text-emerald-600',
    negative: 'text-red-500',
    neutral: 'text-amber-600',
  }[changeType];

  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-400 transition-colors">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
      {change && (
        <p className={`text-xs mt-1.5 ${changeColor}`}>{change}</p>
      )}
    </div>
  );
}
