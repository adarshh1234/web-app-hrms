import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoreVertical, Award, Gift, ShieldCheck, DollarSign, CreditCard, Settings, Landmark } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Modal from '../../components/common/Modal';

interface BenefitCard {
  id: string;
  title: string;
  description: string;
}

export const PayrollBenefitAdvancePage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  // Determine section config based on current pathname
  const getSectionConfig = () => {
    if (path === '/payroll/employee-benefits') {
      return {
        title: 'Employee Benefits',
        subtitle: 'Comprehensive employee benefit schemes, bonuses, and stock options.',
        tabs: ['Bonus', 'Stock Options', 'Performance Benefits', 'Directors\' Benefits']
      };
    }
    if (path === '/payroll/performance-benefits') {
      return {
        title: 'Performance Benefits',
        subtitle: 'Performance incentives, annual increments, promotions, gifts, and bonuses.',
        tabs: ['Incentives', 'Increments', 'Bonus']
      };
    }
    if (path === '/payroll/other-benefits') {
      return {
        title: 'Other Benefits',
        subtitle: 'Statutory benefits including EPF, Gratuity, ELI, ESI, Insurance, and Travel allowances.',
        tabs: ['EPF', 'Gratuity', 'ELI', 'ESI', 'Insurance', 'Paid Leave', 'Travel']
      };
    }
    if (path === '/payroll/salary-disbursement') {
      return {
        title: 'Salary Disbursement',
        heading: 'Bank:',
        subtitle: 'Configure cash and cheque salary disbursement channels under Bank.',
        tabs: ['Cash', 'Cheque']
      };
    }
    if (path === '/payroll/payment-application') {
      return {
        title: 'Payment Application',
        subtitle: 'Payment gateway integrations and system application settings.',
        tabs: ['App Settings']
      };
    }
    // Default: /payroll/benefit-advance
    return {
      title: '',
      subtitle: '',
      showTabs: false,
      tabs: []
    };
  };

  const config = getSectionConfig();
  const [activeTab, setActiveTab] = useState<string>(config.tabs[0] || '');
  const [incrementsSubTab, setIncrementsSubTab] = useState<'Promotions' | 'Gifts'>('Promotions');
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [empId, setEmpId] = useState('');

  const benefitAdvanceCards: BenefitCard[] = [
    { id: '1', title: 'Annual health check-ups', description: 'Free or discounted full-body check-ups provided yearly for preventive health.' },
    { id: '2', title: 'Workshops & Conferences', description: 'Sponsorship for attending or speaking at industry events to gain exposure and knowledge.' },
    { id: '3', title: 'Cab / Transport Facilities', description: 'Free or subsidized transportation for commuting to and from the workplace.' },
    { id: '4', title: 'Annual health check-ups', description: 'Free or discounted full-body check-ups provided yearly for preventive health.' },
    { id: '5', title: 'Workshops & Conferences', description: 'Sponsorship for attending or speaking at industry events to gain exposure and knowledge.' },
    { id: '6', title: 'Cab / Transport Facilities', description: 'Free or subsidized transportation for commuting to and from the workplace.' },
    { id: '7', title: 'Annual health check-ups', description: 'Free or discounted full-body check-ups provided yearly for preventive health.' },
    { id: '8', title: 'Workshops & Conferences', description: 'Sponsorship for attending or speaking at industry events to gain exposure and knowledge.' },
    { id: '9', title: 'Cab / Transport Facilities', description: 'Free or subsidized transportation for commuting to and from the workplace.' }
  ];

  const benefitsMap: Record<string, BenefitCard[]> = {
    'Bonus': [
      { id: 'b1', title: 'Annual Performance Bonus', description: 'Year-end bonus based on individual performance ratings and company targets.' },
      { id: 'b2', title: 'Festive Bonus', description: 'Special seasonal bonus disbursed during annual holiday festivals.' }
    ],
    'Stock Options': [
      { id: 's1', title: 'ESOP Plan 2025', description: 'Employee Stock Ownership Plan options vested over a 4-year period.' },
      { id: 's2', title: 'RSU Grants', description: 'Restricted Stock Units granted for exceptional quarterly performance.' }
    ],
    'Performance Benefits': [
      { id: 'p1', title: 'Quarterly Incentive Scheme', description: 'Direct cash incentives tied to KPI achievements and project completion.' },
      { id: 'p2', title: 'Top Performer Award', description: 'Recognition reward including gift vouchers and extra paid days off.' }
    ],
    'Directors\' Benefits': [
      { id: 'd1', title: 'Executive Health Cover', description: 'Comprehensive global medical coverage for leadership team members.' },
      { id: 'd2', title: 'Car Allowance', description: 'Dedicated executive transport allowance and maintenance budget.' }
    ],
    'Incentives': [
      { id: 'i1', title: 'Sales Commission Incentive', description: 'Tiered commission payouts for achieving monthly revenue targets.' },
      { id: 'i2', title: 'Quarterly Target Bonus', description: 'Direct incentives tied to KPI achievements and project completion.' }
    ],
    'Increments': [
      { id: 'inc1', title: 'Annual Merit Salary Increment', description: 'Standard annual salary revision based on performance reviews.' }
    ],
    'Promotions': [
      { id: 'pr1', title: 'Seniority Promotion Reward', description: 'Grade level promotion bump and role elevation incentives.' },
      { id: 'pr2', title: 'Leadership Advancement Plan', description: 'Promotional compensation adjustment for taking on team management responsibilities.' }
    ],
    'Gifts': [
      { id: 'gf1', title: 'Achievement Gift Hamper', description: 'Special commemorative gift hampers for work anniversary milestones.' },
      { id: 'gf2', title: 'Festival & Recognition Vouchers', description: 'Gift vouchers redeemable across major retail and wellness partners.' }
    ],
    'EPF': [
      { id: 'epf1', title: 'Employees Provident Fund', description: 'Statutory 12% employer and employee contribution with tax benefits.' }
    ],
    'Gratuity': [
      { id: 'g1', title: 'Gratuity Fund', description: 'Retirement benefit for employees completing 5+ years of continuous service.' }
    ],
    'ELI': [
      { id: 'eli1', title: 'Employee Life Insurance', description: 'Group term life insurance coverage up to 5x annual salary.' }
    ],
    'ESI': [
      { id: 'esi1', title: 'Employee State Insurance', description: 'Full medical care and sickness benefits for eligible wage brackets.' }
    ],
    'Insurance': [
      { id: 'ins1', title: 'Group Mediclaim Insurance', description: 'Family floater health insurance covering hospitalization and OPD.' }
    ],
    'Paid Leave': [
      { id: 'pl1', title: 'Encashable Paid Leave', description: 'Unused earned leave encashment at the end of the financial year.' }
    ],
    'Travel': [
      { id: 'tr1', title: 'Travel Allowance (LTA)', description: 'Leave Travel Allowance for annual domestic vacations with tax exemption.' }
    ],
    'Cash': [
      { id: 'c1', title: 'Petty Cash Payment', description: 'Manual cash disbursement for field workers and temporary staff.' }
    ],
    'Cheque': [
      { id: 'ch1', title: 'Account Payee Cheque', description: 'Physical cheque issuance for final settlement payouts.' }
    ],
    'App Settings': [
      { id: 'app1', title: 'Payment Gateway Configuration', description: 'Stripe and Razorpay API key configuration for salary payouts.' },
      { id: 'app2', title: 'Auto-Disbursement Schedule', description: 'Configure automated salary release dates and batch triggers.' }
    ]
  };

  const defaultBenefits: BenefitCard[] = benefitAdvanceCards;

  const currentCardsKey = activeTab === 'Increments' ? incrementsSubTab : activeTab;
  const currentCards = path === '/payroll/benefit-advance' 
    ? benefitAdvanceCards 
    : (benefitsMap[currentCardsKey] || defaultBenefits);

  const handleApplyClick = (title: string) => {
    setSelectedBenefit(title);
    setEmpId('');
  };

  const handleConfirmApply = () => {
    if (!empId.trim()) {
      toast.error('Please enter a valid Employee ID!');
      return;
    }
    toast.success(`Request recorded for ${selectedBenefit} under Employee ID: ${empId}`);
    setSelectedBenefit(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      {config.title && (
        <div>
          <h1 className="text-xl font-bold text-slate-900 m-0">{config.title}</h1>
          {config.subtitle && <p className="text-xs text-slate-500 mt-1">{config.subtitle}</p>}
          {config.heading && (
            <div className="mt-4 pt-2 border-t border-slate-150">
              <h2 className="text-sm font-extrabold text-slate-900 m-0 flex items-center gap-1.5">
                <span>{config.heading}</span>
              </h2>
            </div>
          )}
        </div>
      )}

      {/* Page UI Tabs */}
      {config.tabs && config.tabs.length > 0 && (
        <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
          {config.tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold border-transparent shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Sub-tabs for Increments */}
      {activeTab === 'Increments' && (
        <div className="flex gap-2 items-center bg-slate-100/90 p-1.5 rounded-xl max-w-xs -mt-2 animate-fade-in">
          <button
            onClick={() => setIncrementsSubTab('Promotions')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              incrementsSubTab === 'Promotions'
                ? 'bg-[#004848] text-white shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Promotions
          </button>
          <button
            onClick={() => setIncrementsSubTab('Gifts')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              incrementsSubTab === 'Gifts'
                ? 'bg-[#004848] text-white shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Gifts
          </button>
        </div>
      )}

      {/* Cards Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {currentCards.map((benefit) => (
          <div 
            key={benefit.id}
            className="bg-[#e9eff4]/65 border border-slate-250 rounded-xl p-5 shadow-sm flex flex-col justify-between h-48 hover:shadow-md transition-all"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-slate-850">{benefit.title}</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>

            <div className="pt-3">
              <button 
                onClick={() => handleApplyClick(benefit.title)}
                className="w-full py-2 bg-white border border-slate-200 hover:border-slate-300 text-[#004848] text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Apply / Configure
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
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 text-xs outline-none focus:bg-white focus:border-[#004848] font-semibold"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button 
              onClick={() => setSelectedBenefit(null)}
              className="px-5 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 text-xs transition-all bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmApply}
              className="px-6 py-2 bg-[#004848] hover:bg-[#003333] text-white font-bold rounded-lg shadow-sm text-xs cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PayrollBenefitAdvancePage;
