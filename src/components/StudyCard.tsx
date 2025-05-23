
import React from 'react';
import { Download, Eye, Calendar, Users } from 'lucide-react';

interface StudyCardProps {
  title: string;
  department: string;
  semester: string;
  type: 'syllabus' | 'notes' | 'pyq';
  downloadCount: number;
  lastUpdated: string;
  onDownload: () => void;
  onPreview: () => void;
  index: number;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  title,
  department,
  semester,
  type,
  downloadCount,
  lastUpdated,
  onDownload,
  onPreview,
  index
}) => {
  const typeConfig = {
    syllabus: { label: 'Syllabus', colorClass: 'material-syllabus' },
    notes: { label: 'Notes', colorClass: 'material-notes' },
    pyq: { label: 'PYQ', colorClass: 'material-pyq' }
  };

  const config = typeConfig[type];

  return (
    <div 
      className="brutalist-card animate-stagger"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${config.colorClass} text-white px-3 py-1 text-sm font-bold uppercase tracking-wider`}>
          {config.label}
        </div>
        <div className="text-sm text-gray-600 font-medium">
          {department}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-3 leading-tight">
        {title}
      </h3>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Semester {semester}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{downloadCount} downloads</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        Last updated: {lastUpdated}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPreview}
          className="flex-1 bg-gray-200 text-black border-2 border-black font-bold py-2 px-4 uppercase tracking-wider text-sm hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={onDownload}
          className="flex-1 brutalist-btn text-sm flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};
