import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  action,
  icon = <FolderOpen className="w-10 h-10 text-slate-300" />,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-200 my-4">
      <div className="p-3 bg-slate-50 rounded-full mb-3">{icon}</div>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
