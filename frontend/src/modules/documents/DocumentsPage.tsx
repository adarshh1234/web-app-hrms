import React from 'react';
import { useToast } from '../../hooks/useToast';

export const DocumentsPage: React.FC = () => {
  const toast = useToast();
  const reportingCards = [
    { title: 'Leave report' },
    { title: 'Payroll report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
    { title: 'Leave report' },
  ];

  const analyticsCards = [
    { title: 'employee of month' },
    { title: 'employee of Year' },
    { title: 'employee of Week' },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Reporting Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 tracking-wide">Reporting</h2>
        
        {/* Grid layout matching 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reportingCards.map((card) => (
            <div 
              key={card.title}
              onClick={() => toast.info(`Opening ${card.title} details!`)}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-350 transition-all flex items-center justify-center h-24 cursor-pointer text-center select-none"
            >
              <span className="text-xs font-bold text-slate-800 tracking-wide">{card.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Analytics Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h2 className="text-sm font-bold text-slate-800 tracking-wide">Analytics</h2>
        
        {/* Grid layout matching 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsCards.map((card) => (
            <div 
              key={card.title}
              onClick={() => toast.info(`Opening analytics for: ${card.title}!`)}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-350 transition-all flex items-center justify-center h-24 cursor-pointer text-center select-none"
            >
              <span className="text-xs font-bold text-slate-800 tracking-wide">{card.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DocumentsPage;
