import React, { useState } from 'react';
import { Search, Share2, Copy } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface LetterTemplate {
  id: string;
  name: string;
  subject: string;
  message: string;
}

export const HRLettersPage: React.FC = () => {
  const toast = useToast();
  const [selectedLetter, setSelectedLetter] = useState<string>('1');

  const templates: LetterTemplate[] = [
    {
      id: '1',
      name: 'Employment Confirmation Letter',
      subject: 'Employment Confirmation – [Employee Name]',
      message: 'Dear [Employee Name],\n\nWe are pleased to confirm your employment with [Company Name] as a [Job Title], effective from [Joining Date].\n\nYour performance during the probation period has been found satisfactory, and we look forward to your continued contribution to the organization. All terms and conditions of your employment remain unchanged.\n\nPlease feel free to reach out to HR for any further clarification.'
    },
    {
      id: '2',
      name: 'Offer Letter',
      subject: 'Job Offer – [Employee Name]',
      message: 'Dear [Employee Name],\n\nWe are excited to offer you the position of [Job Title] with [Company Name]. We were very impressed by your skills and experience and believe you will be a valuable addition to our team...'
    },
    {
      id: '3',
      name: 'Relieving Letter',
      subject: 'Relieving Letter – [Employee Name]',
      message: 'Dear [Employee Name],\n\nThis is in reference to your resignation letter dated [Resignation Date]. We would like to inform you that you are relieved from your services as [Job Title] at the close of business hours on [Relieving Date]...'
    },
    {
      id: '4',
      name: 'Experience Certificate',
      subject: 'Experience Certificate – [Employee Name]',
      message: 'To Whom It May Concern,\n\nThis is to certify that [Employee Name] was employed with [Company Name] as a [Job Title] from [Start Date] to [End Date]. During their tenure with us, we found them to be hard-working, honest, and dedicated to their duties...'
    }
  ];

  const currentTemplate = templates.find(t => t.id === selectedLetter) || templates[0];

  const [editedSubject, setEditedSubject] = useState(currentTemplate.subject);
  const [editedMessage, setEditedMessage] = useState(currentTemplate.message);
  const [bestRegards, setBestRegards] = useState('Best regards,\nHuman Resources Department\n[Company Name]');

  const handleSelectTemplate = (id: string) => {
    setSelectedLetter(id);
    const target = templates.find(t => t.id === id) || templates[0];
    setEditedSubject(target.subject);
    setEditedMessage(target.message);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">HR Letter</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <span className="block text-xs font-bold text-slate-700">Recipients</span>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search........"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:border-slate-350"
            />
          </div>

          <div className="space-y-2 pt-2">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => handleSelectTemplate(t.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  selectedLetter === t.id 
                    ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold shadow-sm'
                    : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-3">
            <span className="block text-xs font-bold text-slate-700">Subject</span>
            <input 
              type="text"
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-blue-400"
            />
          </div>

          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-3">
            <span className="block text-xs font-bold text-slate-700">Message</span>
            <textarea 
              rows={8}
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-800 outline-none resize-none leading-relaxed focus:border-blue-400"
            />
          </div>

          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-3">
            <span className="block text-xs font-bold text-slate-700">Best regards</span>
            <textarea 
              rows={3}
              value={bestRegards}
              onChange={(e) => setBestRegards(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-800 outline-none resize-none focus:border-blue-400"
            />
          </div>

          <div className="flex justify-end gap-3.5 pt-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`${editedSubject}\n\n${editedMessage}\n\n${bestRegards}`);
                toast.success('Letter copied to clipboard!');
              }}
              className="p-3 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-lg shadow-sm cursor-pointer transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button 
              onClick={() => toast.info('Sharing draft envelope...')}
              className="p-3 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-lg shadow-sm cursor-pointer transition-colors"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRLettersPage;
