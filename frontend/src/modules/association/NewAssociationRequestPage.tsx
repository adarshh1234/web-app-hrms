import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/common/Button';

interface AssociationRequest {
  id: string;
  name: string;
  date: string;
  text: string;
}

export const NewAssociationRequestPage: React.FC = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState<AssociationRequest[]>([
    { id: '1', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
    { id: '2', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
    { id: '3', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
    { id: '4', name: 'Sarah Joseph', date: 'July 20, 2025', text: 'Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.' },
  ]);

  const handleAccept = (id: string) => {
    toast.success(`Accepted association request from Sarah Joseph (Request #${id})`);
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleCancel = (id: string) => {
    toast.info(`Cancelled/Rejected association request from Sarah Joseph (Request #${id})`);
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">New Association Request</h1>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div 
            key={req.id} 
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-650 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt={req.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-none">{req.name}</h4>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">{req.date}</span>
              </div>
            </div>

            {/* Description Body */}
            <p className="text-xs font-bold text-slate-405 leading-relaxed">
              {req.text}
            </p>

            {/* Action buttons matching design exactly */}
            <div className="flex gap-3">
              <Button 
                variant="primary"
                size="md"
                className="px-6"
                onClick={() => handleAccept(req.id)}
              >
                Accept
              </Button>
              <button 
                onClick={() => handleCancel(req.id)}
                className="px-6 py-2 border border-[#0473b8] hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg cursor-pointer transition-all bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 pt-4">
        <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {[1, 2, 3].map(page => (
          <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-xs font-bold border rounded-md transition-colors ${
              currentPage === page 
                ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold shadow-sm'
                : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
export default NewAssociationRequestPage;
