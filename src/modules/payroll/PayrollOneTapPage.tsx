import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PayrollRow {
  id: string;
  name: string;
  dept: string;
  date: string;
  status: 'Payed' | 'Pending';
}

export const PayrollOneTapPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState('$00.00');

  const [rows, setRows] = useState<PayrollRow[]>([
    { id: '1', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' },
    { id: '2', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
    { id: '3', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
    { id: '4', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' },
    { id: '5', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' },
    { id: '6', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
    { id: '7', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' },
    { id: '8', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
  ]);

  const handlePayClick = (id: string) => {
    setSelectedRow(id);
    setPayAmount('$00.00');
  };

  const handleConfirmPay = () => {
    if (!selectedRow) return;
    setRows(prev => prev.map(r => r.id === selectedRow ? { ...r, status: 'Payed' } : r));
    setSelectedRow(null);
    alert("Payment processed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Payroll in One Tap</h1>
      </div>

      {/* Grid List Table */}
      <div className="space-y-3">
        {/* Header row */}
        <div className="grid grid-cols-5 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          <span className="col-span-2">Employee Name</span>
          <span>Department</span>
          <span>Date</span>
          <span className="text-right">Status</span>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {rows.map((row) => (
            <div 
              key={row.id}
              className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805"
            >
              <span className="col-span-2">{row.name}</span>
              <span className="text-slate-500 font-semibold">{row.dept}</span>
              <span className="text-slate-500 font-semibold">{row.date}</span>
              
              <div className="flex justify-end items-center gap-4">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  row.status === 'Payed' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {row.status}
                </span>

                {row.status === 'Pending' && (
                  <button 
                    onClick={() => handlePayClick(row.id)}
                    className="px-4 py-1 bg-[#85bfe2]/70 hover:bg-[#85bfe2] text-slate-800 text-[10px] font-bold rounded transition-colors cursor-pointer"
                  >
                    Pay
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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

      {/* Pay Modal matching Image 4 exactly */}
      {selectedRow && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl w-full max-w-lg space-y-6">
            <h3 className="text-sm font-bold text-slate-900">Enter Amount</h3>
            
            <input 
              type="text" 
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 font-mono text-sm outline-none focus:border-blue-500"
            />

            <div className="flex justify-end gap-3 pt-3">
              <button 
                onClick={() => setSelectedRow(null)}
                className="px-5 py-2 border border-[#0473b8] text-[#0473b8] font-bold rounded-lg hover:bg-blue-50/50 text-xs transition-all bg-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmPay}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white font-bold rounded-lg shadow-sm text-xs"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PayrollOneTapPage;
