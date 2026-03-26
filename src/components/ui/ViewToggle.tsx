import { LayoutGrid, List } from 'lucide-react';
import { ViewMode } from '@/types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange('grid')}
        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
      >
        <LayoutGrid size={14} />
        Grid
      </button>
      <button
        onClick={() => onChange('list')}
        className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
      >
        <List size={14} />
        List
      </button>
    </div>
  );
}
