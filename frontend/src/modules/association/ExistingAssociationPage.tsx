import React, { useState } from 'react';

interface ExistingAssociation {
  id: string;
  name: string;
  date: string;
  text: string;
}

export const ExistingAssociationPage: React.FC = () => {
  const [items, setItems] = useState<ExistingAssociation[]>([
    { id: '1', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
    { id: '2', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
    { id: '3', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
    { id: '4', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
  ]);

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this existing association?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Existing</h1>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-650 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-none">{item.name}</h4>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">{item.date}</span>
              </div>
            </div>

            {/* Description Body */}
            <p className="text-xs font-bold text-slate-405 leading-relaxed">
              {item.text}
            </p>

            {/* Action button (Only Cancel button on the right side) */}
            <div className="flex justify-end">
              <button 
                onClick={() => handleCancel(item.id)}
                className="px-6 py-2 border border-[#0473b8] hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg cursor-pointer transition-all bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExistingAssociationPage;
