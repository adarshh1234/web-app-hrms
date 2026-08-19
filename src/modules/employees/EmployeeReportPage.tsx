import React from 'react';
import { FileBarChart2 } from 'lucide-react';

export const EmployeeReportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Employee Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Review statistical charts, department sizes, and visual layouts.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs font-semibold shadow-sm max-w-lg space-y-3">
        <FileBarChart2 className="h-10 w-10 mx-auto text-slate-350" />
        <p>No analytical reports configured yet. Review metrics in main dashboard listings.</p>
      </div>
    </div>
  );
};
export default EmployeeReportPage;
