import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

type QualTab = 'education' | 'licenses' | 'skills' | 'languages' | 'memberships';

export const QualificationPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<QualTab>('education');

  // Education state
  const [educationList, setEducationList] = useState([
    { id: '1', level: "Bachelor's Degree", institute: "University of Toronto", major: "Computer Science", year: "2020" },
    { id: '2', level: "Master's Degree", institute: "McGill University", major: "Software Engineering", year: "2022" },
  ]);

  // Licenses state
  const [licensesList, setLicensesList] = useState([
    { id: '1', name: "AWS Certified Solutions Architect", issuedBy: "Amazon Web Services", code: "AWS-SA-901" },
    { id: '2', name: "Project Management Professional (PMP)", issuedBy: "PMI", code: "PMP-88301" },
  ]);

  // Skills state
  const [skillsList, setSkillsList] = useState([
    { id: '1', name: "JavaScript / TypeScript", description: "Frontend and Node.js full-stack development" },
    { id: '2', name: "React & Next.js", description: "Modern Web UI Architecture" },
    { id: '3', name: "Database Administration", description: "MongoDB Atlas, PostgreSQL, Redis" },
  ]);

  // Languages state
  const [languagesList, setLanguagesList] = useState([
    { id: '1', name: "English", fluency: "Native / Fluent" },
    { id: '2', name: "French", fluency: "Professional Working" },
    { id: '3', name: "Spanish", fluency: "Elementary" },
  ]);

  // Memberships state
  const [membershipsList, setMembershipsList] = useState([
    { id: '1', name: "IEEE Computer Society", type: "Professional Member" },
    { id: '2', name: "Society for Human Resource Management (SHRM)", type: "Corporate HR Associate" },
  ]);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');

  const handleDelete = (id: string, category: QualTab) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    if (category === 'education') setEducationList(prev => prev.filter(x => x.id !== id));
    if (category === 'licenses') setLicensesList(prev => prev.filter(x => x.id !== id));
    if (category === 'skills') setSkillsList(prev => prev.filter(x => x.id !== id));
    if (category === 'languages') setLanguagesList(prev => prev.filter(x => x.id !== id));
    if (category === 'memberships') setMembershipsList(prev => prev.filter(x => x.id !== id));
    toast.success("Record deleted successfully.");
  };

  const handleAddRecord = () => {
    if (!newTitle.trim()) {
      toast.error("Please fill in the record name.");
      return;
    }
    const id = Date.now().toString();
    if (activeTab === 'education') {
      setEducationList([...educationList, { id, level: newTitle, institute: newSubtitle || 'University', major: 'General', year: '2024' }]);
    } else if (activeTab === 'licenses') {
      setLicensesList([...licensesList, { id, name: newTitle, issuedBy: newSubtitle || 'Issuing Authority', code: 'LIC-' + id.slice(-4) }]);
    } else if (activeTab === 'skills') {
      setSkillsList([...skillsList, { id, name: newTitle, description: newSubtitle || 'Skill description' }]);
    } else if (activeTab === 'languages') {
      setLanguagesList([...languagesList, { id, name: newTitle, fluency: newSubtitle || 'Fluent' }]);
    } else if (activeTab === 'memberships') {
      setMembershipsList([...membershipsList, { id, name: newTitle, type: newSubtitle || 'Member' }]);
    }
    setShowAddModal(false);
    setNewTitle('');
    setNewSubtitle('');
    toast.success("New qualification record added!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Qualifications</h1>
        <p className="text-sm text-slate-500 mt-1">Configure system qualification standards: Education, Licenses, Skills, Languages, and Memberships.</p>
      </div>

      {/* 5 Qualification Tab Pills */}
      <div className="flex flex-wrap gap-2.5 border-b border-slate-200 pb-4">
        {([
          { id: 'education', label: 'Education' },
          { id: 'licenses', label: 'Licenses' },
          { id: 'skills', label: 'Skills' },
          { id: 'languages', label: 'Languages' },
          { id: 'memberships', label: 'Memberships' }
        ] as const).map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === pill.id 
                ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Tab Panel: Education */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 m-0">Education Levels</h2>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Education</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-500">({educationList.length}) Records Found</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Level / Degree</th>
                    <th className="px-6 py-3.5">Institute</th>
                    <th className="px-6 py-3.5">Major / Specialization</th>
                    <th className="px-6 py-3.5">Graduation Year</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {educationList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.level}</td>
                      <td className="px-6 py-4 text-slate-600">{item.institute}</td>
                      <td className="px-6 py-4 text-slate-600">{item.major}</td>
                      <td className="px-6 py-4 font-mono text-slate-500">{item.year}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => toast.info(`Editing ${item.level}`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id, 'education')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel: Licenses */}
      {activeTab === 'licenses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 m-0">Professional Licenses & Certifications</h2>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add License</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-500">({licensesList.length}) Records Found</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">License Name</th>
                    <th className="px-6 py-3.5">Issuing Authority</th>
                    <th className="px-6 py-3.5">Code / Number</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {licensesList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.issuedBy}</td>
                      <td className="px-6 py-4 font-mono text-slate-500">{item.code}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => toast.info(`Editing ${item.name}`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id, 'licenses')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel: Skills */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 m-0">Technical & Professional Skills</h2>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-500">({skillsList.length}) Records Found</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Skill Name</th>
                    <th className="px-6 py-3.5">Description</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {skillsList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.description}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => toast.info(`Editing ${item.name}`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id, 'skills')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel: Languages */}
      {activeTab === 'languages' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 m-0">Languages</h2>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Language</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-500">({languagesList.length}) Records Found</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Language</th>
                    <th className="px-6 py-3.5">Fluency Rating</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {languagesList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.fluency}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => toast.info(`Editing ${item.name}`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id, 'languages')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel: Memberships */}
      {activeTab === 'memberships' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 m-0">Corporate & Professional Memberships</h2>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Membership</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-500">({membershipsList.length}) Records Found</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Organization / Association</th>
                    <th className="px-6 py-3.5">Membership Type</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {membershipsList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.type}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => toast.info(`Editing ${item.name}`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id, 'memberships')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 capitalize">Add {activeTab} Record</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Name / Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Master of Business Administration"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Secondary Info / Detail</label>
                <input 
                  type="text" 
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Institution, Authority, or Description"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRecord}
                className="px-4 py-2 bg-[#004848] text-white rounded-lg text-xs font-bold hover:bg-[#003333] cursor-pointer"
              >
                Save Qualification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationPage;
