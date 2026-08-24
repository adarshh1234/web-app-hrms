import React, { useState } from 'react';
import { Search, X, MoreVertical } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const CvParserTab: React.FC = () => {
  const toast = useToast();
  const [cvSearchText, setCvSearchText] = useState('');
  const [cvSuggestions] = useState(['Age', 'Skill', 'Qualification', 'Experience', 'Qualification']);
  const [cvActivePills, setCvActivePills] = useState(['Age', 'Skill', 'Qualification']);
  const [cvsList] = useState(
    Array(11).fill({ name: 'Sarah Johnson', title: 'Senior Product Designer', modified: 'Last modified: 2 days ago' })
  );

  const handleAddActivePill = () => {
    setCvActivePills((prev) => [...prev, 'Experience']);
  };

  const handleRemoveActivePill = (pill: string) => {
    setCvActivePills((prev) => prev.filter((p) => p !== pill));
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Search Form layout */}
      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 m-0">Search</h3>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search........"
            value={cvSearchText}
            onChange={(e) => setCvSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-900 outline-none focus:border-slate-350"
          />
        </div>

        {/* Tags row 1: Recommendations */}
        <div className="flex flex-wrap gap-2.5 items-center text-[10px] font-bold text-slate-600 pt-1">
          {cvSuggestions.map((s, idx) => (
            <span key={`${s}-${idx}`} className="bg-slate-50 border border-slate-150 px-3 py-1 rounded-md">
              {s}
            </span>
          ))}
          <button
            onClick={handleAddActivePill}
            className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-blue-500 flex items-center justify-center font-bold text-xs"
          >
            +
          </button>
        </div>

        {/* Tags row 2: Selected active filter pills with cross */}
        <div className="flex flex-wrap gap-2.5 items-center text-[10px] font-bold text-slate-800">
          {cvActivePills.map((p) => (
            <div key={p} className="flex items-center gap-1.5 bg-slate-105 border border-slate-200 px-3 py-1.5 rounded-md">
              <span>{p}</span>
              <button onClick={() => handleRemoveActivePill(p)} className="p-0.5 text-slate-400 hover:text-slate-700">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3.5 pt-2">
          <button
            onClick={() => {
              setCvSearchText('');
              setCvActivePills(['Age', 'Skill', 'Qualification']);
            }}
            className="px-6 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => toast.success('CV parsing criteria applied!')}
            className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Parse
          </button>
        </div>
      </div>

      {/* Card 2: CV List parsed items */}
      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 m-0">List all CV's</h3>

        <div className="space-y-2.5">
          {cvsList.map((cv, idx) => (
            <div
              key={`cv-${idx}`}
              className="flex items-center justify-between bg-white border border-slate-150 rounded-lg p-3 px-4 shadow-xs"
            >
              <div className="flex items-center gap-4 text-xs font-bold">
                <input
                  type="checkbox"
                  className="rounded border-slate-350 text-blue-600 focus:ring-blue-400 h-4 w-4 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="text-slate-905 font-bold">{cv.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{cv.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <span>{cv.modified}</span>
                <button className="text-slate-400 hover:text-slate-800">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => toast.info('Batch CV extraction started!')}
            className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Parse
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvParserTab;
