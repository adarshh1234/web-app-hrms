import React, { useState } from 'react';
import { SlidersHorizontal, Calendar, MapPin, User, Download, Share2, Plus, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface TravelCard {
  id: string;
  status: 'Approved' | 'Pending' | 'In Review';
  title: string;
  author: string;
  from: string;
  to: string;
  dates: string;
  description: string;
  modified: string;
}

export const TravelDocumentsPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'All' | 'Recent' | 'Pending' | 'Approved'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const cards: TravelCard[] = [
    { id: '1', status: 'Approved', title: 'Business Trip Visa Application', author: 'Sarah Johnson', from: 'London', to: 'Tokyo', dates: '15-22 Oct 2023', description: 'Quarterly client meetings with key stakeholders in Tokyo office', modified: 'Modified 2 days ago' },
    { id: '2', status: 'Pending', title: 'Business Trip Visa Application', author: 'Sarah Johnson', from: 'London', to: 'Tokyo', dates: '15-22 Oct 2023', description: 'Quarterly client meetings with key stakeholders in Tokyo office', modified: 'Modified 2 days ago' },
    { id: '3', status: 'In Review', title: 'Business Trip Visa Application', author: 'Sarah Johnson', from: 'London', to: 'Tokyo', dates: '15-22 Oct 2023', description: 'Quarterly client meetings with key stakeholders in Tokyo office', modified: 'Modified 2 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Travel Documents</h1>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0473b8] bg-white rounded-lg text-[#0473b8] hover:bg-blue-50/50 transition-all font-semibold">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0473b8] bg-white rounded-lg text-[#0473b8] hover:bg-blue-50/50 transition-all font-semibold">
            <Calendar className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Date Range</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0473b8] bg-white rounded-lg text-[#0473b8] hover:bg-blue-50/50 transition-all font-semibold">
            <MapPin className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Location</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0473b8] bg-white rounded-lg text-[#0473b8] hover:bg-blue-50/50 transition-all font-semibold">
            <User className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Employee</span>
          </button>
        </div>

        <button 
          onClick={() => toast.info('Add new travel document dialog')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Document</span>
        </button>
      </div>

      <div className="flex gap-2">
        {(['All', 'Recent', 'Pending Approval', 'Approved'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab === 'Pending Approval' ? 'Pending' : tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              (tab === 'All' && activeTab === 'All') ||
              (tab === 'Recent' && activeTab === 'Recent') ||
              (tab === 'Pending Approval' && activeTab === 'Pending') ||
              (tab === 'Approved' && activeTab === 'Approved')
                ? 'bg-[#0473b8] text-white font-extrabold'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div 
            key={c.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all relative"
          >
            <div className="flex justify-between items-start">
              <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                c.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                c.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                {c.status}
              </span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-850 m-0 leading-normal">{c.title}</h3>
              
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-650 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <span className="text-[10px] font-bold text-slate-500">{c.author}</span>
              </div>
            </div>

            <div className="text-[10px] font-bold text-slate-400 space-y-1 pl-1">
              <div className="flex items-center gap-1.5">
                <span>{c.from}</span>
                <span>→</span>
                <span>{c.to}</span>
              </div>
              <div>{c.dates}</div>
            </div>

            <p className="text-[11px] font-semibold text-slate-500 leading-relaxed pr-1">
              {c.description}
            </p>

            <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-slate-400">
              <span className="text-[10px] font-bold text-slate-400">{c.modified}</span>
              <div className="flex gap-2.5">
                <button onClick={() => toast.success('Downloading document')} className="hover:text-blue-600">
                  <Download className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => toast.info('Share travel document')} className="hover:text-blue-600">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 pt-4">
        <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
          <ChevronLeft className="h-3 w-3" />
        </button>
        {[1, 2, 3].map(page => (
          <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-2.5 py-0.5 text-xs font-bold border rounded bg-white transition-colors ${
              currentPage === page 
                ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold'
                : 'text-slate-650 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default TravelDocumentsPage;
