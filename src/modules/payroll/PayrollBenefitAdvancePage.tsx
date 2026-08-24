import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Modal from '../../components/common/Modal';

interface BenefitCard {
  id: string;
  title: string;
  description: string;
}

export const PayrollBenefitAdvancePage: React.FC = () => {
  const toast = useToast();
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [empId, setEmpId] = useState('');

  const benefits: BenefitCard[] = [
    { id: '1', title: 'Annual health check-ups', description: 'Free or discounted full-body check-ups provided yearly for preventive health.' },
    { id: '2', title: 'Workshops & Conferences', description: 'Sponsorship for attending or speaking at industry events to gain exposure and knowledge.' },
    { id: '3', title: 'Cab / Transport Facilities', description: 'Free or subsidized transportation for commuting to and from the workplace.' },
    { id: '4', title: 'Gym & Wellness Subscriptions', description: 'Subsidized fitness club access and mental wellness apps.' },
  ];

  const handleApplyClick = (title: string) => {
    setSelectedBenefit(title);
    setEmpId('');
  };

  const handleConfirmApply = () => {
    if (!empId.trim()) {
      toast.error('Please enter a valid Employee ID!');
      return;
    }
    toast.success(`Application submitted for benefit: ${selectedBenefit} under Employee ID: ${empId}`);
    setSelectedBenefit(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Employee Benefit Advice</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <div 
            key={benefit.id}
            className="bg-[#e9eff4]/65 border border-slate-205 rounded-xl p-5 shadow-sm flex flex-col justify-between h-48 hover:shadow-md transition-all"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-slate-805">{benefit.title}</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>

            <div className="pt-3">
              <button 
                onClick={() => handleApplyClick(benefit.title)}
                className="w-full py-2 bg-white border border-slate-200 hover:border-slate-300 text-[#0473b8] text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedBenefit} onClose={() => setSelectedBenefit(null)} title="Employee ID Verification">
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 text-xs outline-none focus:bg-white focus:border-blue-500 font-semibold"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button 
              onClick={() => setSelectedBenefit(null)}
              className="px-5 py-2 border border-[#0473b8] text-[#0473b8] font-bold rounded-lg hover:bg-blue-50/50 text-xs transition-all bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmApply}
              className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white font-bold rounded-lg shadow-sm text-xs cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PayrollBenefitAdvancePage;
